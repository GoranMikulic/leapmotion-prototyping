'use strict';

angular.module('cooperationprototypingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('leapmotion', {
        url: '/leapmotion',
        template: '<leapmotion></leapmotion>'
      });
  });
