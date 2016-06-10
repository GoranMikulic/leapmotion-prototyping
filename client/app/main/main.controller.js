  'use strict';
  (function() {
    /**
     * Main application controller
     */
    class MainComponent {

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
        this.objects = {};
        this.scope = $scope;
        this.scope.clientCounter = 0;
        self.createdObjects = {};
      }

      $onInit() {
        var self = this;
        self.clientIndex = {};
        var initTime = new Date().getTime();
        self.scope.clientCounter = 0;

        /*
         * Defines what happens on each frame that is processed by leapmotion.
         * Sets index for the client and emits coordinates to backend.
         *
         * Important: Loop runs only if controller is connected.
         */
        this.loop.animate = function(frame) {

          frame.hands.forEach(function(hand, index) {
            var handIdentifier = initTime + index;
            if (!self.clientIndex[handIdentifier]) {
              self.clientIndex[handIdentifier] = handIdentifier;
            }

            self.clientSocket.emit('movement', self.lightHandModel.build(hand, self.clientIndex[handIdentifier]));
          });
          self.sceneModel.update();
        };

        /*
         * If no controller is connected, scene should still update to make object
         * movements visible.
         */
        setInterval(function() {
          self.sceneModel.update();

          angular.forEach(self.objects, function(object, key) {
            var position = {};
            position.id = key;
            position.x = object.position.x;
            position.y = object.position.y;
            position.z = object.position.z;

            if(self.createdObjects[position.id]) {
              self.clientSocket.emit('objectmovement', position);
            }
          });

        }, 50);

        // Initializing leapmotion library
        this.loop = Leap.loop(this.loop.animate);
        this.loop.use('screenPosition', {
          scale: 0.25
        }); // use = plugin
        Leap.loopController.setBackground(true);

        this.clientSocket.on('objectmovement', function(position) {
          console.log("test1");

          if(!self.createdObjects[position.id]) {
              console.log("test");
              self.objects[position.id].position.x = position.x;
              self.objects[position.id].position.y = position.y;
              self.objects[position.id].position.z = position.z;
            }

        });

        // Listens on movements sent by the server
        this.clientSocket.on('movement', function(hand) {
          var index = hand.index;
          var handy = (self.loadedHands[index] || (self.loadedHands[index] = self.Hand.build(self.sceneModel.scene, handData)));
          handy.outputData(index, hand);
        });

        // Listens if objects are created by other clients
        // TODO: currently no sync of object movements
        this.clientSocket.on('object', function(objInfo) {
          var object = self.utils.getObject(objInfo.type);
          self.objects[objInfo.id] = object;
          self.sceneModel.scene.add(object);
        });

      }

      /*
       * This method is used in UI to create a object
       */
      addObject(type) {
        var self = this;
        var objInfo.type = type;
        objInfo.id = new Date().getTime();
        self.createdObjects[objInfo.id] = objInfo.id;
        self.clientSocket.emit('object', objInfo);
      }
    }

    /**
     * Controller component definition
     */
    angular.module('cooperationprototypingApp')
      .component('main', {
        templateUrl: 'app/main/main.html',
        controller: MainComponent
      });

  })();
