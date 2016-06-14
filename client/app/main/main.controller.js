  'use strict';
  (function() {
    /**
     * Main application controller
     */
    class MainComponent {

      constructor(socket, $scope, LeapmotionService, SceneModel, ObjectManager, Ball) {

        var self = this;
        this.clientSocket = socket.socket; // Socket for server communciation
        this.LeapmotionService = LeapmotionService;
        this.ObjectManager = ObjectManager;
        this.SceneModel = SceneModel;
        this.Ball = Ball;
      }

      $onInit() {
        var self = this;

        // Defines 3D-Environment, things like the ground, gravity, camera position..
        var sceneModel = self.SceneModel.build();
        self.LeapmotionService.init(sceneModel);
        self.ObjectManager.init(sceneModel);

        // Listens on movements sent by the server
        this.clientSocket.on('movement', function(hand) {
          self.LeapmotionService.doHandMovement(hand);
        });

        // Listens if objects are created by other clients
        // TODO: currently no sync of object movements
        this.clientSocket.on('object', function(type) {
          self.ObjectManager.addObject(type);
        });

        this.clientSocket.on('ballmovement', function(positionInfo) {
          //self.Ball.moveX(positionInfo.x);
        });
      }

      /*
       * This method is used in UI to create a object
       */
      addObject(type) {
        this.clientSocket.emit('object', type);
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
