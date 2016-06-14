'use strict';

angular.module('cooperationprototypingApp')
  .service('SceneModel', function() {

    function initMeshBox(x, y, z, rotationX) {
      // ground box
      var geometry = new THREE.BoxGeometry(500, 2, 500);
      //var geometry = new THREE.CubeGeometry(100, 100, 2, 10, 10);
      //var material = new THREE.MeshNormalMaterial();
      var material = Physijs.createMaterial(
        new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.4 }),
        .4,
        .8
      );

      //var mesh = new THREE.Mesh(geometry, material);
      var mesh = new Physijs.BoxMesh(geometry, material, 0);

      mesh.position.set(x, y, z);
      if(rotationX) {
        mesh.rotation.x = rotationX;
      }

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
      var container = document.getElementById('scenebox');
      container.appendChild(renderer.domElement);

      var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
      camera.position.set(500, 500, 500);
      var controls = new THREE.TrackballControls(camera, renderer.domElement);
      var scene = new Physijs.Scene();
      scene.setGravity(new THREE.Vector3(0, 0, 0));
      scene.addEventListener('update', function() {
        scene.simulate(undefined, 2);
      });

      var ground = initMeshBox(0, 50, 0);
      scene.add(ground);
      //ground = new THREE.GridHelper(250, 10);
      //scene.add(ground);

      // build walls
      var top = initMeshBox(0, 400, 0);
      scene.add(top);
      var nintyDegreeRotation = Math.PI / 2;
      var wall1 = initMeshBox(0, 150, 250, nintyDegreeRotation);
      scene.add(wall1);
      var wall2 = initMeshBox(0, 150, -250, nintyDegreeRotation);
      scene.add(wall2);

      // axes
      var axis = new THREE.AxisHelper(250);
      scene.add(axis);
      //render(scene, camera, renderer);
      scene.simulate();
      renderer.render(scene, camera);

      var sceneModel = new Scene(renderer, camera, controls, scene);
      return sceneModel;
    };

    function render(scene, camera, renderer) {
      for (var i = 5; i < scene.children.length - 5; i++) {
        var obj = scene.children[i];

        if (obj.position.y <= -50) {
          scene.remove(obj);
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

  });
