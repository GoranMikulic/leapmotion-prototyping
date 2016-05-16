'use strict';

describe('Component: LeapmotionComponent', function () {

  // load the controller's module
  beforeEach(module('cooperationprototypingApp'));

  var LeapmotionComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LeapmotionComponent = $componentController('LeapmotionComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
