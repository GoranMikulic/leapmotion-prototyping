'use strict';
(function(){

class LeapmotionComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('cooperationprototypingApp')
  .component('leapmotion', {
    templateUrl: 'app/leapmotion/leapmotion.html',
    controller: LeapmotionComponent
  });

})();
