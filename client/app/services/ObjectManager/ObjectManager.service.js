'use strict';

angular.module('cooperationprototypingApp')
  .service('ObjectManager', function(ObjectsUtils) {

    var sceneModel;
    var socket;

    this.init = function(threeSceneModel) {
      sceneModel = threeSceneModel;
    };

    this.addObject = function(type) {
      var object = ObjectsUtils.getObject(type);
      sceneModel.scene.add(object);
    };

  });
