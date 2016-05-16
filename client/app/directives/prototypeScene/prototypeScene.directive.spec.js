'use strict';

describe('Directive: prototypeScene', function () {

  // load the directive's module and view
  beforeEach(module('cooperationprototypingApp.prototypeScene'));
  beforeEach(module('app/directives/prototypeScene/prototypeScene.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<prototype-scene></prototype-scene>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the prototypeScene directive');
  }));
});
