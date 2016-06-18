'use strict';

angular.module('cooperationprototypingApp')
  .service('Fingers', function() {

    var Fingerling = function(scene, fingerDataViewerId, xposition, name) {

      var fingerling = this;

      var handName = name;
      var fingersScene = scene;
      var tip = addPhalange(scene, 'tip' + name);
      var dip = addPhalange(scene, 'dip' + name);
      var pip = addPhalange(scene, 'pip' + name);
      var mcp = addPhalange(scene, 'mcp' + name);
      var carp = addPhalange(scene, 'carp' + name);

      fingerling.outputData = function(index, finger) {
        tip.position.set(xposition + finger.tipPosition[0], finger.tipPosition[1], finger.tipPosition[2]);
        //tip.position.set(xposition, finger.tipPosition[1], finger.tipPosition[2]);
        //cancelVelocity(tip);
        dip.position.set(xposition + finger.dipPosition[0], finger.dipPosition[1], finger.dipPosition[2]);
        //dip.position.set(xposition, finger.dipPosition[1], finger.dipPosition[2]);
        //cancelVelocity(dip);
        pip.position.set(xposition + finger.pipPosition[0], finger.pipPosition[1], finger.pipPosition[2]);
        //pip.position.set(xposition, finger.pipPosition[1], finger.pipPosition[2]);
        //cancelVelocity(pip);
        mcp.position.set(xposition + finger.mcpPosition[0], finger.mcpPosition[1], finger.mcpPosition[2]);
        //mcp.position.set(xposition, finger.mcpPosition[1], finger.mcpPosition[2]);
        //cancelVelocity(mcp);
        carp.position.set(xposition + finger.carpPosition[0], finger.carpPosition[1], finger.carpPosition[2]);
        //carp.position.set(xposition, finger.carpPosition[1], finger.carpPosition[2]);
        //cancelVelocity(carp);

        updatePhalange(tip, dip);
        updatePhalange(dip, pip);
        updatePhalange(pip, mcp);

        if (finger.type > 0) {
          updatePhalange(mcp, carp);

        }

      };

    };

    this.build = function(scene, fingerDataViewerId, xposition, name) {
      var finger = new Fingerling(scene, fingerDataViewerId, xposition, name);
      return finger;
    };

    this.hideFingerModel = function(handNameId, fingersScene) {
      changeVisibility(false, handNameId, fingersScene);
    };

    this.viewFingerModel = function(handNameId, fingersScene) {
      changeVisibility(true, handNameId, fingersScene);
    };

    function changeVisibility(visibility, handNameId, fingersScene) {
      var tipObj = fingersScene.getObjectByName('tip' + handNameId);
      tipObj.visible = visibility;

      var dipObj = fingersScene.getObjectByName('dip' + handNameId);
      dipObj.visible = visibility;

      var pipObj = fingersScene.getObjectByName('pip' + handNameId);
      pipObj.visible = visibility;

      var mcpObj = fingersScene.getObjectByName('mcp' + handNameId);
      mcpObj.visible = visibility;

      var carpObj = fingersScene.getObjectByName('carp' + handNameId);
      carpObj.visible = visibility;
    }

    function addPhalange(scene, name) {

      var geometry = new THREE.BoxGeometry(20, 20, 1);
      var material = new THREE.MeshNormalMaterial();
      var phalange = new THREE.Mesh(geometry, material, 100);
      phalange.name = name;

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
