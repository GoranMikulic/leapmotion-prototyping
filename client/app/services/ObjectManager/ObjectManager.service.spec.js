'use strict';

describe('Service: ObjectManager', function () {

  // load the service's module
  beforeEach(module('cooperationprototypingApp'));

  // instantiate service
  var ObjectManager;
  beforeEach(inject(function (_ObjectManager_) {
    ObjectManager = _ObjectManager_;
  }));

  it('should do something', function () {
    expect(!!ObjectManager).toBe(true);
  });

});
