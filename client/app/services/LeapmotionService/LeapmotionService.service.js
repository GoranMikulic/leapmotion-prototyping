'use strict';

angular.module('cooperationprototypingApp')
  .service('LeapmotionService', function(SceneModel, ObjectsUtils, socket, lightHandModel, Hand, Ball, SessionInfo) {

    /*
     * Variable for leapmotion loop, instantiated in $onInit() method in this
     * controller, loop runs for each frame which is sent by the leapmotion socket service
     */
    var loop = {};
    var clientIndex = {};
    var initTime = new Date().getTime();
    var sceneModel;
    var controllerIsConnected = false;

    /**
     * Key-value-store which holds all loaded hand ids
     */
    var loadedHands = {};

    var ball;

    /*
     * Defines what happens on each frame that is processed by leapmotion.
     * Sets index for the client and emits coordinates to backend.
     *
     * Important: Loop runs only if controller is connected.
     */
    loop.animate = function(frame) {
      controllerIsConnected = true;

      frame.hands.forEach(function(hand, index) {
        var handIdentifier = initTime + index;
        if (!clientIndex[handIdentifier]) {
          clientIndex[handIdentifier] = handIdentifier;
        }

        socket.socket.emit('movement', lightHandModel.build(hand, clientIndex[handIdentifier]));

      });

      sendBallPosition();
      sceneModel.update();
    };

    this.init = function(threeSceneModel) {
      sceneModel = threeSceneModel;

      // Initializing leapmotion library
      loop = Leap.loop(loop.animate);
      loop.use('screenPosition', {
        scale: 0.25
      }); // use = plugin
      Leap.loopController.setBackground(true);
    };

    this.doHandMovement = function(hand) {
      var index = hand.index;
      var handModel = (loadedHands[index] || (loadedHands[index] = Hand.build(sceneModel.scene, handData)));
      handModel.outputData(index, hand);
    };

    function sendBallPosition() {
      if (SessionInfo.isHost) {
        var ball = Ball.getBall();
        if(ball) {
          var position = {
            x: ball.position.x,
            y: ball.position.y,
            z: ball.position.z
          };
          socket.socket.emit('ballmovement', position);
        }
      }
    }

    /*
     * If no controller is connected, scene should still update to make object
     * movements visible.
     */
    setInterval(function() {
      if (!controllerIsConnected) {
        sceneModel.update();
        sendBallPosition();
      }
    }, 50);

  });
