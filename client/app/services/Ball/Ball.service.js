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

      ball.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
        revertBallMovement();
      });

      return ball;
    }

    function revertBallMovement() {
      var oldVector = gameBall.getLinearVelocity();
      var speedup = 500;
      gameBall.setLinearVelocity(new THREE.Vector3(oldVector.x - speedup, oldVector.y - speedup, oldVector.z + speedup));
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

    //should be in Ball service but doesnt work there
    function doInitialBallMovement() {
      var oldVector = gameBall.getLinearVelocity();
      gameBall.setLinearVelocity(new THREE.Vector3(oldVector.x + .5 * 100 * 10, oldVector.y, oldVector.z));
    }

    this.initGameBall = function(isHost, scene) {
      var isBallInScene = scene.getObjectByName("ball");
      if (!isBallInScene) {
        gameBall = this.createNewBall(isHost); //if is host creates Physical ball, otherwise non-physical
        scene.add(gameBall);
        if (isHost) {
          doInitialBallMovement();
        }
      }
    }

    this.setPosition = function(x, y, z) {
      gameBall.position.x = x;
      gameBall.position.y = y;
      gameBall.position.z = z;
    };

  });
