'use strict';

angular.module('cooperationprototypingApp')
  .service('Ball', function() {

    var gameBall;

    function createNewPhysicalBall() {
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

      ball.name = "ball";

      ball.position.y = 200;
      ball.castShadow = true;
      ball.receiveShadow = true;

      return ball;
    }

    function createNewBall() {

      var ball = new THREE.Mesh(
        new THREE.SphereGeometry(
          20,
          16,
          16
        ),
        new THREE.MeshNormalMaterial()

      );

      ball.name = "ball";

      ball.position.y = 200;
      ball.castShadow = true;
      ball.receiveShadow = true;

      return ball;
    }


    this.createNewBall = function(isPhysical) {
      if (isPhysical) {
        gameBall = createNewPhysicalBall();
      } else {
        gameBall = createNewBall();
      }

      return gameBall;
    };

    this.getBall = function() {
      return gameBall;
    };

    this.setPosition = function(x, y, z) {
      gameBall.position.x = x;
      gameBall.position.y = y;
      gameBall.position.z = z;
    };

  });
