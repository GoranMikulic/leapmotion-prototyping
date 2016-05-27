'use strict';

angular.module('cooperationprototypingApp')
  .service('ObjectsUtils', function () {


    this.getCube =  function() {
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

      var r = {
        x: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12,
        y: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12,
        z: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12
      };

      cube.rotation.set(r.x, r.y, r.z);
      cube.position.y = 40;
      cube.castShadow = true;
      cube.receiveShadow = true;

      return cube;
    };

    this.getBall =  function() {
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

      var r = {
        x: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12,
        y: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12,
        z: Math.random() * (Math.PI - Math.PI / 12) + Math.PI / 12
      };

      ball.rotation.set(r.x, r.y, r.z);
      ball.position.y = 40;
      ball.castShadow = true;
      ball.receiveShadow = true;

      return ball;
    }



  });
