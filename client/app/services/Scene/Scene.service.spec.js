'use strict';

describe('Service: Scene', function () {

  // load the service's module
  beforeEach(module('cooperationprototypingApp'));

  // instantiate service
  var Scene;
  beforeEach(inject(function (_Scene_) {
    Scene = _Scene_;
  }));

  it('should do something', function () {
    expect(!!Scene).toBe(true);
  });

});
