'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var movementCtrlStub = {
  index: 'movementCtrl.index',
  show: 'movementCtrl.show',
  create: 'movementCtrl.create',
  update: 'movementCtrl.update',
  destroy: 'movementCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var movementIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './movement.controller': movementCtrlStub
});

describe('Movement API Router:', function() {

  it('should return an express router instance', function() {
    movementIndex.should.equal(routerStub);
  });

  describe('GET /api/movements', function() {

    it('should route to movement.controller.index', function() {
      routerStub.get
        .withArgs('/', 'movementCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/movements/:id', function() {

    it('should route to movement.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'movementCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/movements', function() {

    it('should route to movement.controller.create', function() {
      routerStub.post
        .withArgs('/', 'movementCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/movements/:id', function() {

    it('should route to movement.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'movementCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/movements/:id', function() {

    it('should route to movement.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'movementCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/movements/:id', function() {

    it('should route to movement.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'movementCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
