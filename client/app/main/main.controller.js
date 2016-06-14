  'use strict';
  (function() {
    /**
     * Main application controller
     */
    class MainComponent {

      constructor(socket, $scope, LeapmotionService, SceneModel, ObjectManager, Ball, SessionInfo) {

        var self = this;
        this.clientSocket = socket.socket; // Socket for server communciation
        this.LeapmotionService = LeapmotionService;
        this.ObjectManager = ObjectManager;
        this.SceneModel = SceneModel;
        this.Ball = Ball;
        this.initTime = new Date().getTime();
        this.scope = $scope;
        this.scope.sessionInfo = SessionInfo;
        this.gameball;
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
          self.gameball = self.Ball.createNewBall(self.scope.sessionInfo.isHost); //if is host creates Physical ball, otherwise non-physical
          sceneModel.getScene().add(self.gameball);
        });

        this.clientSocket.on('ballmovement', function(position) {
          if(!self.scope.sessionInfo.isHost) {
            self.Ball.setPosition(position.x, position.y, position.z);
          }
        });

        this.clientSocket.on('goal', function(goalNo) {
          //goalNo 1 = Point for Player 1, goalNo 2 = Point for Player 2
          if(goalNo === 1) {
              self.scope.sessionInfo.hostPoints += 1;
          } else {
              self.scope.sessionInfo.secondPlayerPoints += 1;
          }

          var selectedObject = sceneModel.getScene().getObjectByName("ball");
          sceneModel.getScene().remove(selectedObject);

        });
      }

      /*
       * This method is used in UI to create a object
       */
      addBall() {
        this.clientSocket.emit('object', 'ball');
      }

      setHost() {
        this.scope.sessionInfo.setHost();
        this.clientSocket.emit('host', this.initTime);
      }

      setPlayer2() {
        this.scope.sessionInfo.setSecondPlayer();
        this.clientSocket.emit('playerTwo', this.initTime);
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
