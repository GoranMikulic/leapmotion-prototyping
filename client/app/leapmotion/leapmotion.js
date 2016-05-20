'use strict';

angular.module('cooperationprototypingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('leapmotion', {
        url: '/',
        template: '<leapmotion></leapmotion>'
      });
  });
