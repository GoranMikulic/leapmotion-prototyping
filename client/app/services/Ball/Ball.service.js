'use strict';

angular.module('cooperationprototypingApp')
  .service('Ball', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var ballModel;
    var velocity;
    var direction;

    function createBallModel(scene) {
     var ball;

     ball = new Physijs.SphereMesh(
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

     ball.position.y = 120;
     scene.add(ball);

     return ball;
   };

    this.build = function(vel, dir, scene) {
      ballModel = createBallModel(scene);
      velocity = vel;
      direction = dir;
    };

    this.getBallModel = function(){
      return ballModel;
    }

    this.getVelocity = function(){
      return velocity;
    }

    this.setVelocity = function(vel){
      velocity = vel;
    }

    this.getDirection = function(){
      return direction;
    }

    this.setDirection = function(dir){
      direction = dir;
    }

    this.moveX = function() {
      ballModel.position.x += velocity * direction;
    }
  });
