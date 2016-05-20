'use strict';

describe('Service: Fingers', function () {

  // load the service's module
  beforeEach(module('cooperationprototypingApp'));

  // instantiate service
  var Fingers;
  beforeEach(inject(function (_Fingers_) {
    Fingers = _Fingers_;
  }));

  it('should do something', function () {
    expect(!!Fingers).toBe(true);
  });

});
