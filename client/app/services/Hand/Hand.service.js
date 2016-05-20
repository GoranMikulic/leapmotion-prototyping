'use strict';

angular.module('cooperationprototypingApp')
  .service('Hand', function (Fingers) {

    var Handy = function(scene, handDataViewerId) {
      var handy = this;
      var msg = handDataViewerId.appendChild(document.createElement('div'));
      var fingerlings = {};

      var geometry = new THREE.BoxGeometry(50, 20, 50);
      var material = new THREE.MeshNormalMaterial();
      var box = new THREE.Mesh(geometry, material);
      scene.add(box);

      handy.outputData = function(index, hand) {

        msg.innerHTML = 'Hand id:' + index + ' x:' + hand.stabilizedPalmPosition[0].toFixed(0) +
          ' y:' + hand.stabilizedPalmPosition[1].toFixed(0) + ' z:' + hand.stabilizedPalmPosition[2].toFixed(0);
        box.position.set(hand.stabilizedPalmPosition[0], hand.stabilizedPalmPosition[1], hand.stabilizedPalmPosition[2]);
        box.rotation.set(hand.pitch, -hand.yaw, hand.roll);

        hand.fingers.forEach(function(finger, index) {
          var fingerling = (fingerlings[index] || (fingerlings[index] = Fingers.build(scene, fingerData)));
          fingerling.outputData(index, finger);
        });
      };

      handy.visualModel = box;
    };

    this.build = function(scene, handDataViewerId) {
      var hand = new Handy(scene, handDataViewerId);
      return hand;
    };
  });
