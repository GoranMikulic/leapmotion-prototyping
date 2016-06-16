'use strict';

angular.module('cooperationprototypingApp')
  .service('Hand', function (Fingers, SessionInfo) {

    var Hand = function(scene, handDataViewerId) {
      var hand = this;
      var fingerlings = {};
      // Objects with a common parent doesn't collide all finger objects are added to this object
      //var parent = new Physijs.BoxMesh(new THREE.CubeGeometry(0, 0, 0), new THREE.MeshBasicMaterial({ color: 0x888888 }));

      var isHostHand = SessionInfo.isHost;
      var geometry = new THREE.BoxGeometry(10, 100, 150);
      var material = new THREE.MeshNormalMaterial();
      var handBox = new Physijs.BoxMesh(geometry, material, 1);
      hand.name = "hand";

      var xposition;
      if(isHostHand) {
        xposition = 200;
      } else {
        xposition = -200;
      }

      scene.add(handBox);

      hand.outputData = function(index, hand) {

        handBox.position.set(xposition, hand.stabilizedPalmPosition[1], hand.stabilizedPalmPosition[2]);
        //handBox.rotation.set(hand.pitch, -hand.yaw, hand.roll);
        cancelVelocity(handBox);

        hand.fingers.forEach(function(finger, index) {
          var fingerling = (fingerlings[index] || (fingerlings[index] = Fingers.build(scene, fingerData, xposition)));
          fingerling.outputData(index, finger);
        });
        //scene.add(parent);
      };

      //hand.visualModel = handBox;
    };

    function cancelVelocity(threeObject) {
      threeObject.__dirtyPosition = true;
      threeObject.setLinearVelocity(new THREE.Vector3(0, 0, 0));
      threeObject.setAngularVelocity(new THREE.Vector3(0, 0, 0));
    }

    this.build = function(scene, handDataViewerId) {
      var hand = new Hand(scene, handDataViewerId);
      return hand;
    };
  });
