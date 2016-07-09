'use strict';

angular.module('cooperationprototypingApp')
  .service('LeapmotionService', function(SceneModel, ObjectsUtils, socket, lightHandModel, Hand, Ball, SessionInfo, $timeout) {

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
        if (!clientIndex[index]) {
          clientIndex[index] = handIdentifier;
        }

        socket.socket.emit('movement', lightHandModel.build(hand, clientIndex[index]));

      });

      sendBallPosition();
      sceneModel.update();
    };

    var gestureListener = function(gesture) {
      if (gesture.type === 'circle') {
        if (gesture.state === 'start') {
          socket.socket.emit('object', 'ball');
        }
      }
    };

    this.init = function(threeSceneModel) {
      sceneModel = threeSceneModel;
      SessionInfo.initTime = initTime;
      // Initializing leapmotion library
      loop = Leap.loop(loop.animate)
        .use('handEntry')
        .on('handLost', function(hand) {
          Hand.hideHandModel(clientIndex);
        }).on('handFound', function(hand) {
          Hand.viewHandModel(clientIndex);
        }).on('gesture', gestureListener);

      loop.use('screenPosition', {
        scale: 0.25
      }); // use = plugin

      Leap.loopController.setBackground(true);
    };

    this.doHandMovement = function(hand) {
      var index = hand.index;
      var handModel = (loadedHands[index] || (loadedHands[index] = Hand.build(sceneModel.scene, hand.isHost, index)));
      handModel.outputData(index, hand);
    };

    function sendBallPosition() {
      if (SessionInfo.isHost) {
        var ball = Ball.getBall();
        if (ball) {
          var position = {
            x: ball.position.x,
            y: ball.position.y,
            z: ball.position.z
          };

          var oldVector = ball.getLinearVelocity();
          if(oldVector.x < 0 && oldVector.x > -500) {

              ball.setLinearVelocity(new THREE.Vector3(-500, oldVector.y, oldVector.z));
          } else if(oldVector.x > 0 && oldVector.x < 500) {
              ball.setLinearVelocity(new THREE.Vector3(500, oldVector.y, oldVector.z));
          }

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
