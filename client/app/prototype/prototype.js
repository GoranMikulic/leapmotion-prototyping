'use strict';

angular.module('cooperationprototypingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('prototype', {
        url: '/',
        template: '<prototype></prototype>'
      });
  });
