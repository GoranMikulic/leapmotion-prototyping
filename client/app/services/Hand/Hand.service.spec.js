'use strict';

describe('Service: Hand', function () {

  // load the service's module
  beforeEach(module('cooperationprototypingApp'));

  // instantiate service
  var Hand;
  beforeEach(inject(function (_Hand_) {
    Hand = _Hand_;
  }));

  it('should do something', function () {
    expect(!!Hand).toBe(true);
  });

});
