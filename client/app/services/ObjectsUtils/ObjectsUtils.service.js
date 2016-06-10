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
      var cube = new Physijs.BoxMesh(
        new THREE.BoxGeometry(
          50,
          50,
          50
        ),
        Physijs.createMaterial(
          new THREE.MeshNormalMaterial(),
          .4,
          .6
        ),
        1
      );

      cube.position.y = 100;
      cube.castShadow = true;
      cube.receiveShadow = true;

      return cube;
    };

    function getBall() {
      //setInterval(function() {
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


      ball.position.y = 40;
      ball.castShadow = true;
      ball.receiveShadow = true;

      return ball;
    }



  });
