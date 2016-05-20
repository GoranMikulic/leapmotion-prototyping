'use strict';

describe('Component: PrototypeComponent', function () {

  // load the controller's module
  beforeEach(module('cooperationprototypingApp'));

  var PrototypeComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PrototypeComponent = $componentController('PrototypeComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
