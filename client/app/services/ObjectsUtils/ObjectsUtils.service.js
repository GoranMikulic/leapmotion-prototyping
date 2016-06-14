'use strict';

angular.module('cooperationprototypingApp')
  .service('ObjectsUtils', function() {

    this.getObject = function(type) {
      if (type === 'cube') {
        return getCube();
      } else if (type === 'ball') {
        return getBall();
      }
    };

    function getCube() {
      //setInterval(function() {
      var cube = new THREE.Mesh(
        new THREE.BoxGeometry(
          50,
          50,
          50
        ),
        new THREE.MeshNormalMaterial()
      );

      cube.name = "cube";
      cube.position.y = 200;
      cube.castShadow = true;
      cube.receiveShadow = true;

      return cube;
    };

    function getBall() {
      
      var ball = new Physijs.SphereMesh(
        new THREE.SphereGeometry(
          20,
          16,
          16
        ),
        Physijs.createMaterial(
          new THREE.MeshNormalMaterial(),
          .4,
          .6
        ),
        1
      );

      ball.name = "ball";

      ball.position.y = 200;
      ball.castShadow = true;
      ball.receiveShadow = true;

      return ball;
    }



  });
