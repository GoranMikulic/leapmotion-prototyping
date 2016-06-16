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

      //var xvelocity = 5;

      //ball.setLinearFactor(1, 0, 1);
      //ball.setLinearRotation(0, 0, 0);
      // ball.__dirtyPosition = true;
      // ball.setAngularVelocity(new THREE.Vector3(100, 0, 0));
      // ball.setLinearVelocity(new THREE.Vector3(5, 9, 0));


      var oldVector = ball.getLinearVelocity(); // Vector of velocity the player already has
      console.log(oldVector);


      ball.position.y = 200;
      ball.castShadow = true;
      ball.receiveShadow = true;

      ball.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
        var oldVector = ball.getLinearVelocity();
        ball.setLinearVelocity(new THREE.Vector3(oldVector.x - .5 * 100 * 10, oldVector.y - .5 * 10, oldVector.z + .5 * 100 * 10));
      });

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
