'use strict';

angular.module('cooperationprototypingApp')
  .service('Hand', function (Fingers) {

    var Hand = function(scene, handDataViewerId) {
      var hand = this;
      var fingerlings = {};
      // Objects with a common parent doesn't collide all finger objects are added to this object
      var parent = new Physijs.BoxMesh(new THREE.CubeGeometry(0, 0, 0), new THREE.MeshBasicMaterial({ color: 0x888888 }));

      // var geometry = new THREE.BoxGeometry(50, 20, 50);
      // var material = new THREE.MeshNormalMaterial();
      // var box = new THREE.Mesh(geometry, material);
      // scene.add(box);

      hand.outputData = function(index, hand) {

        // box.position.set(hand.stabilizedPalmPosition[0], hand.stabilizedPalmPosition[1], hand.stabilizedPalmPosition[2]);
        // box.rotation.set(hand.pitch, -hand.yaw, hand.roll);

        hand.fingers.forEach(function(finger, index) {
          var fingerling = (fingerlings[index] || (fingerlings[index] = Fingers.build(scene, fingerData, parent)));
          fingerling.outputData(index, finger);
        });
        scene.add(parent);
      };

      //hand.visualModel = box;
    };

    this.build = function(scene, handDataViewerId) {
      var hand = new Hand(scene, handDataViewerId);
      return hand;
    };
  });
