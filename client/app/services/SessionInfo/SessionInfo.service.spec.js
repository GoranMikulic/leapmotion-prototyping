'use strict';

describe('Service: SessionInfo', function () {

  // load the service's module
  beforeEach(module('cooperationprototypingApp'));

  // instantiate service
  var SessionInfo;
  beforeEach(inject(function (_SessionInfo_) {
    SessionInfo = _SessionInfo_;
  }));

  it('should do something', function () {
    expect(!!SessionInfo).toBe(true);
  });

});
