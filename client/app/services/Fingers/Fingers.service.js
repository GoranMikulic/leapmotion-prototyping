'use strict';

angular.module('cooperationprototypingApp')
  .service('Fingers', function () {

    var Fingerling = function(scene, fingerDataViewerId, parent) {

      var fingerling = this;

      var tip = addPhalange(parent);
      var dip = addPhalange(parent);
      var pip = addPhalange(parent);
      var mcp = addPhalange(parent);
      var carp = addPhalange(parent);

      fingerling.outputData = function(index, finger) {
        tip.position.set(200, finger.tipPosition[1], finger.tipPosition[2]);
        cancelVelocity(tip);
        dip.position.set(200, finger.dipPosition[1], finger.dipPosition[2]);
        cancelVelocity(dip);
        pip.position.set(200, finger.pipPosition[1], finger.pipPosition[2]);
        cancelVelocity(pip);
        mcp.position.set(200, finger.mcpPosition[1], finger.mcpPosition[2]);
        cancelVelocity(mcp);
        carp.position.set(200, finger.carpPosition[1], finger.carpPosition[2]);
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

    this.build = function(scene, fingerDataViewerId, parent) {
        var finger = new Fingerling(scene, fingerDataViewerId, parent);
        return finger;
    };


    function addPhalange(parentObject) {

      var geometry = new THREE.BoxGeometry(20, 20, 1);
      var material = new THREE.MeshNormalMaterial();
      var phalange = new THREE.Mesh(geometry, material, 100);

      parentObject.add(phalange);
      return phalange;

    }

    function updatePhalange(phalange, nextPhalange) {

      phalange.lookAt(nextPhalange.position);
      length = phalange.position.distanceTo(nextPhalange.position);
      phalange.translateZ(0.5 * length);
      phalange.scale.set(1, 1, length);

    }

  });
