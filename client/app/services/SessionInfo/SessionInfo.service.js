'use strict';

angular.module('cooperationprototypingApp')
  .service('SessionInfo', function() {

    this.isHost = false;
    this.isSecondPlayer = false;

    this.setHost = function() {
      this.isHost = true;
      this.isSecondPlayer = false;
    };

    this.setSecondPlayer = function() {
      this.isHost = false;
      this.isSecondPlayer = true;
    };

  });
