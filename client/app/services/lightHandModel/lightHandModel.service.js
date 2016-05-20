'use strict';

angular.module('cooperationprototypingApp')
  .service('lightHandModel', function () {


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
