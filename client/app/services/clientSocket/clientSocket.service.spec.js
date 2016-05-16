'use strict';

describe('Service: clientSocket', function () {

  // load the service's module
  beforeEach(module('cooperationprototypingApp'));

  // instantiate service
  var clientSocket;
  beforeEach(inject(function (_clientSocket_) {
    clientSocket = _clientSocket_;
  }));

  it('should do something', function () {
    expect(!!clientSocket).toBe(true);
  });

});
