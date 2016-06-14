'use strict';

angular.module('cooperationprototypingApp')
  .service('ObjectManager', function(ObjectsUtils, Ball) {

    var sceneModel;
    var socket;

    this.init = function(threeSceneModel) {
      sceneModel = threeSceneModel;
    };

    this.addObject = function(type) {

      Ball.build(10,1,sceneModel.scene);
      //var object = ObjectsUtils.getObject(type);
      //sceneModel.scene.add(object);
    };

  });
