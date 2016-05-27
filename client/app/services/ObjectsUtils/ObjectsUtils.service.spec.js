'use strict';

describe('Service: ObjectsUtils', function () {

  // load the service's module
  beforeEach(module('cooperationprototypingApp'));

  // instantiate service
  var ObjectsUtils;
  beforeEach(inject(function (_ObjectsUtils_) {
    ObjectsUtils = _ObjectsUtils_;
  }));

  it('should do something', function () {
    expect(!!ObjectsUtils).toBe(true);
  });

});
