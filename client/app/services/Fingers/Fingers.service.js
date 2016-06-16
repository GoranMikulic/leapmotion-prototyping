'use strict';

angular.module('cooperationprototypingApp')
  .service('Fingers', function () {

    var Fingerling = function(scene, fingerDataViewerId, xposition) {

      var fingerling = this;

      var tip = addPhalange(scene);
      var dip = addPhalange(scene);
      var pip = addPhalange(scene);
      var mcp = addPhalange(scene);
      var carp = addPhalange(scene);

      fingerling.outputData = function(index, finger) {
        tip.position.set(xposition, finger.tipPosition[1], finger.tipPosition[2]);
        cancelVelocity(tip);
        dip.position.set(xposition, finger.dipPosition[1], finger.dipPosition[2]);
        cancelVelocity(dip);
        pip.position.set(xposition, finger.pipPosition[1], finger.pipPosition[2]);
        cancelVelocity(pip);
        mcp.position.set(xposition, finger.mcpPosition[1], finger.mcpPosition[2]);
        cancelVelocity(mcp);
        carp.position.set(xposition, finger.carpPosition[1], finger.carpPosition[2]);
        cancelVelocity(carp);

        updatePhalange(tip, dip);
        updatePhalange(dip, pip);
        updatePhalange(pip, mcp);

        if (finger.type > 0) {
          updatePhalange(mcp, carp);

        }

      };

    };

    function cancelVelocity(threeObject) {
      //threeObject.__dirtyPosition = true;
      //threeObject.setLinearVelocity(new THREE.Vector3(0, 0, 0));
      //threeObject.setAngularVelocity(new THREE.Vector3(0, 0, 0));
    }

    this.build = function(scene, fingerDataViewerId, xposition) {
        var finger = new Fingerling(scene, fingerDataViewerId, xposition);
        return finger;
    };


    function addPhalange(scene) {

      var geometry = new THREE.BoxGeometry(20, 20, 1);
      var material = new THREE.MeshNormalMaterial();
      var phalange = new THREE.Mesh(geometry, material, 100);

      scene.add(phalange);
      return phalange;

    }

    function updatePhalange(phalange, nextPhalange) {

      phalange.lookAt(nextPhalange.position);
      length = phalange.position.distanceTo(nextPhalange.position);
      phalange.translateZ(0.5 * length);
      phalange.scale.set(1, 1, length);

    }

  });
