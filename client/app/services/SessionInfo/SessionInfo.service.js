'use strict';

angular.module('cooperationprototypingApp')
  .service('SessionInfo', function() {

    this.isHost = false;
    this.isSecondPlayer = false;

    this.hostSelected = false;
    this.playerTwoSelected = false;

    this.initTime;

    this.hostPoints = 0;
    this.secondPlayerPoints = 0;

    this.setHost = function() {
      this.isHost = true;
      this.isSecondPlayer = false;
    };

    this.setSecondPlayer = function() {
      this.isHost = false;
      this.isSecondPlayer = true;
    };

  });
