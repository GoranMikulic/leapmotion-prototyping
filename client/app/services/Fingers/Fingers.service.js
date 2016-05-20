'use strict';

angular.module('cooperationprototypingApp')
  .service('Fingers', function () {

    var Fingerling = function(scene, fingerDataViewerId) {

      var fingerling = this;
      var msg = fingerData.appendChild(document.createElement('div'));

      var tip = addPhalange(scene);
      var dip = addPhalange(scene);
      var pip = addPhalange(scene);
      var mcp = addPhalange(scene);
      var carp = addPhalange(scene);

      fingerling.outputData = function(index, finger) {

        msg.innerHTML = 'Finger Method: ' +
          'finger id:' + index + ' tip x:' + finger.tipPosition[0].toFixed(0) +
          ' y:' + finger.tipPosition[1].toFixed(0) + ' z:' + finger.tipPosition[2].toFixed(0);

        tip.position.set(finger.tipPosition[0], finger.tipPosition[1], finger.tipPosition[2]);
        dip.position.set(finger.dipPosition[0], finger.dipPosition[1], finger.dipPosition[2]);
        pip.position.set(finger.pipPosition[0], finger.pipPosition[1], finger.pipPosition[2]);
        mcp.position.set(finger.mcpPosition[0], finger.mcpPosition[1], finger.mcpPosition[2]);
        carp.position.set(finger.carpPosition[0], finger.carpPosition[1], finger.carpPosition[2]);

        updatePhalange(tip, dip);
        updatePhalange(dip, pip);
        updatePhalange(pip, mcp);

        if (finger.type > 0) {
          updatePhalange(mcp, carp);

        }

      };

    };

    this.build = function(scene, fingerDataViewerId) {
        var finger = new Fingerling(scene, fingerDataViewerId);
        return finger;
    };

    function addPhalange(scene) {

      var geometry = new THREE.BoxGeometry(20, 20, 1);
      var material = new THREE.MeshNormalMaterial();
      var phalange = new THREE.Mesh(geometry, material);
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
