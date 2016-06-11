'use strict';

angular.module('cooperationprototypingApp')
  .service('LeapmotionService', function(SceneModel, ObjectsUtils, socket, lightHandModel, Hand) {

    /*
     * Variable for leapmotion loop, instantiated in $onInit() method in this
     * controller, loop runs for each frame which is sent by the leapmotion socket service
     */
    var loop = {};
    var clientIndex = {};
    var initTime = new Date().getTime();
    var sceneModel;

    /**
     * Key-value-store which holds all loaded hand ids
     */
    var loadedHands = {};

    /*
     * Defines what happens on each frame that is processed by leapmotion.
     * Sets index for the client and emits coordinates to backend.
     *
     * Important: Loop runs only if controller is connected.
     */
    loop.animate = function(frame) {

      frame.hands.forEach(function(hand, index) {
        var handIdentifier = initTime + index;
        if (!clientIndex[handIdentifier]) {
          clientIndex[handIdentifier] = handIdentifier;
        }

        socket.socket.emit('movement', lightHandModel.build(hand, clientIndex[handIdentifier]));
      });
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

    /*
     * If no controller is connected, scene should still update to make object
     * movements visible.
     */
    setInterval(function() {
      sceneModel.update();
    }, 50);

  });
