'use strict';

angular.module('cooperationprototypingApp')
  .service('SceneModel', function() {

    function initMeshBox() {
      // ground box
      var geometry = new THREE.BoxGeometry(500, 2, 500);
      var material = new THREE.MeshNormalMaterial();
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, -1, 0);

      return mesh;
    }

    var Scene = function(renderer, camera, controls, scene) {
      var sceneModel = this;

      sceneModel.renderer = renderer;
      sceneModel.camera = camera;
      sceneModel.controls = controls;
      sceneModel.scene = scene;

      sceneModel.update = function() {
        sceneModel.renderer.render(sceneModel.scene, sceneModel.camera);
        sceneModel.controls.update();
      };

    };

    this.build = function() {
      var renderer = new THREE.WebGLRenderer({
        alpha: 1,
        antialias: true,
        clearColor: 0xffffff
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
      camera.position.set(500, 500, 500);
      var controls = new THREE.TrackballControls(camera, renderer.domElement);
      var scene = new THREE.Scene();
      var mesh = initMeshBox();
      scene.add(mesh);
      mesh = new THREE.GridHelper(250, 10);
      scene.add(mesh);
      // axes
      var axis = new THREE.AxisHelper(250);
      scene.add(axis);
      renderer.render(scene, camera);

      var sceneModel = new Scene(renderer, camera, controls, scene);
      return sceneModel;
    };

  });
