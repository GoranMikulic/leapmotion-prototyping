/**
 * Socket.io configuration
 */
'use strict';

import config from './environment';

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });

  socket.on('movement', data => {
    //socket.log(JSON.stringify(data, null, 2));node
    // setTimeout(function () {
    //   data.index = 888;
    //   socket.emit('movement', data);
    // }, 8000);
    // setTimeout(function () {
    //   data.index = 333;
    //   socket.emit('movement', data);
    // }, 3000);

    //emit to sending client TODO: Process client movement locally
    socket.emit('movement', data);
    //emit to everyone else
    socket.broadcast.emit('movement', data);

  });

  socket.on('object', data => {
    //emit to sending client TODO: Process client movement locally
    socket.emit('object', data);
    //emit to everyone else
    socket.broadcast.emit('object', data);

  });

  // Insert sockets below
  require('../api/movement/movement.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);

}

export default function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function(socket) {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
}
