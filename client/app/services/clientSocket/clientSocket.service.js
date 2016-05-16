'use strict';

angular.module('cooperationprototypingApp')
  .factory('clientSocket', function (socketFactory) {

    var myIoSocket = io.connect('/socket.io-client');

    var mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;

  });
