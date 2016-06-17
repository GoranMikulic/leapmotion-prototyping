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
        if (!clientIndex[index]) {
          clientIndex[index] = handIdentifier;
        }

        socket.socket.emit('movement', lightHandModel.build(hand, clientIndex[index]));

      });


      // if(Ball.getBall()) {
      //   var oldVector = Ball.getBall().getLinearVelocity();
      //   Ball.getBall().setLinearVelocity(new THREE.Vector3(oldVector.x + .5 * 100, oldVector.y, oldVector.z));
      //   console.log(Ball.getBall().getLinearVelocity());
      // }

      sendBallPosition();
      sceneModel.update();
    };

    this.init = function(threeSceneModel) {
      sceneModel = threeSceneModel;
      SessionInfo.initTime = initTime;
      // Initializing leapmotion library
      loop = Leap.loop(loop.animate).use('handEntry').on('handLost', function(hand) {
        console.log(sceneModel.getScene());

        angular.forEach(clientIndex, function(handName) {
          var selectedObject = sceneModel.getScene().getObjectByName(handName);
          selectedObject.visible = false;
        });

        //var selectedObject = sceneModel.getScene().getObjectByName("hand");
        //sceneModel.getScene().remove(selectedObject);
      }).on('handFound', function(hand) {
        angular.forEach(clientIndex, function(handName) {
          var selectedObject = sceneModel.getScene().getObjectByName(handName);
          selectedObject.visible = true;
        });
      });

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
