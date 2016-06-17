'use strict';

angular.module('cooperationprototypingApp')
  .service('Hand', function (Fingers, SessionInfo) {

    var scene;

    var Hand = function(handscene, isHost, index) {
      var hand = this;
      var fingerlings = {};
      scene = handscene;
      // Objects with a common parent doesn't collide all finger objects are added to this object
      //var parent = new Three.Mesh(new THREE.CubeGeometry(0, 0, 0), new THREE.MeshBasicMaterial({ color: 0x888888 }));

      var isHostHand = isHost;
      var geometry = new THREE.BoxGeometry(10, 100, 150);
      var material = new THREE.MeshNormalMaterial();
      var handBox = new Physijs.BoxMesh(geometry, material, 1);
      handBox.name = index;
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

    this.hideHandModel = function(thisClientHands) {
      angular.forEach(thisClientHands, function(handName) {
        var selectedObject = scene.getObjectByName(handName);
        selectedObject.visible = false;
      });
    }

    this.viewHandModel = function(thisClientHands) {
      angular.forEach(thisClientHands, function(handName) {
        var selectedObject = scene.getObjectByName(handName);
        selectedObject.visible = true;
      });
    }

    this.build = function(scene, isHost, index) {
      var hand = new Hand(scene, isHost, index);

      return hand;
    };
  });
