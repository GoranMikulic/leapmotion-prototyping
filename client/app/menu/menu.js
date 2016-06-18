'use strict';

angular.module('cooperationprototypingApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('menu', {
        url: '/',
        template: '<menu></menu>'
      });
  });
