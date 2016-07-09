'use strict';

angular.module('cooperationprototypingApp')
  .service('Ball', function() {

    var gameBall;

    function createNewPhysicalBall() {

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
        console.log(other_object.typeName);
        if(other_object.typeName === 'hand') {

          revertBallMovement();
        }
      });

      return ball;
    }

    function revertBallMovement() {
      var oldVector = gameBall.getLinearVelocity();
      var speedup = 50;

      var xSpeed;
      if(oldVector.x < 0) {
        xSpeed = (oldVector.x - speedup) * -1;
      } else {
        xSpeed = (oldVector.x + speedup) * -1;
      }
      console.log('X', xSpeed);
      console.log('Y', oldVector.y);
      console.log('Z', oldVector.z);
      gameBall.setLinearVelocity(new THREE.Vector3(xSpeed, oldVector.y, oldVector.z));
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
      gameBall.setLinearVelocity(new THREE.Vector3(oldVector.x + .5 * 100 * 10, oldVector.y + 50, oldVector.z + 50));
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
