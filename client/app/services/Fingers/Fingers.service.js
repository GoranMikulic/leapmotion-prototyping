'use strict';

angular.module('cooperationprototypingApp')
  .service('Fingers', function () {

    var Fingerling = function(scene, fingerDataViewerId, parent) {

      var fingerling = this;
      var msg = fingerData.appendChild(document.createElement('div'));

      var tip = addPhalange(parent);
      var dip = addPhalange(parent);
      var pip = addPhalange(parent);
      var mcp = addPhalange(parent);
      var carp = addPhalange(parent);

      fingerling.outputData = function(index, finger) {

        msg.innerHTML = 'Finger Method: ' +
          'finger id:' + index + ' tip x:' + finger.tipPosition[0].toFixed(0) +
          ' y:' + finger.tipPosition[1].toFixed(0) + ' z:' + finger.tipPosition[2].toFixed(0);

        tip.position.set(finger.tipPosition[0], finger.tipPosition[1], finger.tipPosition[2]);
        cancelVelocity(tip);
        dip.position.set(finger.dipPosition[0], finger.dipPosition[1], finger.dipPosition[2]);
        cancelVelocity(dip);
        pip.position.set(finger.pipPosition[0], finger.pipPosition[1], finger.pipPosition[2]);
        cancelVelocity(pip);
        mcp.position.set(finger.mcpPosition[0], finger.mcpPosition[1], finger.mcpPosition[2]);
        cancelVelocity(mcp);
        carp.position.set(finger.carpPosition[0], finger.carpPosition[1], finger.carpPosition[2]);
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
      threeObject.__dirtyPosition = true;
      threeObject.setLinearVelocity(new THREE.Vector3(0, 0, 0));
      //threeObject.setAngularVelocity(new THREE.Vector3(0, 0, 0));
    }

    this.build = function(scene, fingerDataViewerId, parent) {
        var finger = new Fingerling(scene, fingerDataViewerId, parent);
        return finger;
    };


    function addPhalange(parentObject) {

      var geometry = new THREE.BoxGeometry(20, 20, 1);
      var material = new THREE.MeshNormalMaterial();
      var phalange = new Physijs.BoxMesh(geometry, material, 100);

      //cancelVelocity(phalange);
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
