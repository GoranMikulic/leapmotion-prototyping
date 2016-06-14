'use strict';

describe('Service: Ball', function () {

  // load the service's module
  beforeEach(module('cooperationprototypingApp'));

  // instantiate service
  var Ball;
  beforeEach(inject(function (_Ball_) {
    Ball = _Ball_;
  }));

  it('should do something', function () {
    expect(!!Ball).toBe(true);
  });

});
