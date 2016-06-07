'use strict';

/**
 * Lightweight version for hand coordinates
 *
 * The default leapmotion model can't be sent through the socket
 * because it has a recursive structure, it has to be converted.
 */
angular.module('cooperationprototypingApp')
  .service('lightHandModel', function() {

    /**
     * Converts leapmotion coordinates to a lightweight model
     * returns the converted model
     */
    this.build = function(hand, index) {
      angular.forEach(hand.fingers, function(finger, fingerKey) {
        angular.forEach(finger.bones, function(bone, boneKey) {
          delete hand.fingers[fingerKey].bones[boneKey].finger;
          delete hand.fingers[fingerKey].frame;
        });
      });

      var pitch = hand.pitch();
      var yaw = hand.yaw();
      var roll = hand.roll();

      var lightHandModel = {
        'stabilizedPalmPosition': hand.stabilizedPalmPosition,
        'fingers': hand.fingers,
        'pitch': pitch,
        'yaw': yaw,
        'roll': roll,
        'index': index
      };

      return lightHandModel;

    };
  });
