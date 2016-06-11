'use strict';

describe('Service: LeapmotionService', function () {

  // load the service's module
  beforeEach(module('cooperationprototypingApp'));

  // instantiate service
  var LeapmotionService;
  beforeEach(inject(function (_LeapmotionService_) {
    LeapmotionService = _LeapmotionService_;
  }));

  it('should do something', function () {
    expect(!!LeapmotionService).toBe(true);
  });

});
