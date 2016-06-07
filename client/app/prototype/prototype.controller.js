  'use strict';
  (function() {
    /**
     * Main application controller
     */
    class PrototypeComponent {

      constructor(socket, Hand, Fingers, SceneModel, lightHandModel, $scope, ObjectsUtils) {

        var self = this;

        /**
         * Id for a hand - used to identify different clients,
         * for each id only one hand should be created by the client,
         * if the id is already loaded, only movement of the hand will be processed
         * The id is initialized with a current timestamp when the page is loaded
         */
        this.handIndex = new Date().getTime();

        /* This model represents a lightweight version of hand coordinates,
         * the default leapmotion model can't be sent through the socket
         * because it has a recursive structure, it has to be converted.
         */
        this.lightHandModel = lightHandModel;
        /**
         * Key-value-store which holds all loaded hand ids
         */
        this.loadedHands = {};

        /*
         * Variable for leapmotion loop, instantiated in $onInit() method in this
         * controller, loop runs for each frame which is sent by the leapmotion socket service
         */
        this.loop = {};
        // Defines 3D-Environment, things like the ground, gravity, camera position..
        this.sceneModel = SceneModel.build();
        // Socket for server communciation
        this.clientSocket = socket.socket;
        // util class where some default 3D-Objects are defined
        this.utils = ObjectsUtils;
        // Class which handles 3D-Objects for the hand
        this.Hand = Hand;
      }

      $onInit() {
        var self = this;
        self.clientIndex = {};

        /*
         * Defines what happens on each frame that is processed by leapmotion.
         * Sets index for the client and emits coordinates to backend.
         *
         * Important: Loop runs only if controller is connected.
         */
        this.loop.animate = function(frame) {
          frame.hands.forEach(function(hand, index) {
            if (!self.clientIndex[index]) {
              self.clientIndex[index] = new Date().getTime();
            }
            self.clientSocket.emit('movement', self.lightHandModel.build(hand, self.clientIndex[index]));
          });
          self.sceneModel.update();
        };

        /*
         * If no controller is connected, scene should still update to make object
         * movements visible.
         */
        setInterval(function() {
          self.sceneModel.update();
        }, 50);

        // Initializing leapmotion library
        this.loop = Leap.loop(this.loop.animate);
        this.loop.use('screenPosition', {
          scale: 0.25
        }); // use = plugin
        Leap.loopController.setBackground(true);

        // Listens on movements sent by the server
        this.clientSocket.on('movement', function(hand) {
          var index = hand.index;
          var handy = (self.loadedHands[index] || (self.loadedHands[index] = self.Hand.build(self.sceneModel.scene, handData)));
          handy.outputData(index, hand);
        });

        // Listens if objects are created by other clients
        // TODO: currently no sync of object movements
        this.clientSocket.on('object', function(type) {
          if (type === 'cube') {
            self.sceneModel.scene.add(self.utils.getCube());
          } else if (type === 'ball') {
            self.sceneModel.scene.add(self.utils.getBall());
          }
        });

      }

      /*
       * This method is used in UI to create a object
       */
      addObject(type) {
        var self = this;
        self.clientSocket.emit('object', type);
      }
    }

    /**
     * Controller component definition
     */
    angular.module('cooperationprototypingApp')
      .component('prototype', {
        templateUrl: 'app/prototype/prototype.html',
        controller: PrototypeComponent
      });

  })();
