'use strict';
(function() {
  /**
   * Controller for the game menu
   */
  class MenuComponent {
    constructor(socket, $scope, SessionInfo, $location) {

      var self = this;

      this.clientSocket = socket.socket; // Socket for server communciation
      this.scope = $scope;
      this.scope.sessionInfo = SessionInfo;
      this.location = $location;
    }

    $onInit() {
      var self = this;

      this.clientSocket.on('host', function(goalNo) {
        self.scope.sessionInfo.hostSelected = true;
      });

      this.clientSocket.on('playerTwo', function(goalNo) {
        self.scope.sessionInfo.playerTwoSelected = true;
      });
    }

    setHost() {
      this.scope.sessionInfo.setHost();
      this.clientSocket.emit('host', this.initTime);
    }

    setPlayer2() {
      this.scope.sessionInfo.setSecondPlayer();
      this.clientSocket.emit('playerTwo', this.initTime);
    }

    startGame() {
      this.location.path('/main');
    }
  }

  angular.module('cooperationprototypingApp')
    .component('menu', {
      templateUrl: 'app/menu/menu.html',
      controller: MenuComponent
    });

})();
