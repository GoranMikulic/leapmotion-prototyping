'use strict';

describe('Service: lightHandModel', function () {

  // load the service's module
  beforeEach(module('cooperationprototypingApp'));

  // instantiate service
  var lightHandModel;
  beforeEach(inject(function (_lightHandModel_) {
    lightHandModel = _lightHandModel_;
  }));

  it('should do something', function () {
    expect(!!lightHandModel).toBe(true);
  });

});
