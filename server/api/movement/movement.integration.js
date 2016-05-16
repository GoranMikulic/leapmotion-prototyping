'use strict';

var app = require('../..');
import request from 'supertest';

var newMovement;

describe('Movement API:', function() {

  describe('GET /api/movements', function() {
    var movements;

    beforeEach(function(done) {
      request(app)
        .get('/api/movements')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          movements = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      movements.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/movements', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/movements')
        .send({
          name: 'New Movement',
          info: 'This is the brand new movement!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMovement = res.body;
          done();
        });
    });

    it('should respond with the newly created movement', function() {
      newMovement.name.should.equal('New Movement');
      newMovement.info.should.equal('This is the brand new movement!!!');
    });

  });

  describe('GET /api/movements/:id', function() {
    var movement;

    beforeEach(function(done) {
      request(app)
        .get('/api/movements/' + newMovement._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          movement = res.body;
          done();
        });
    });

    afterEach(function() {
      movement = {};
    });

    it('should respond with the requested movement', function() {
      movement.name.should.equal('New Movement');
      movement.info.should.equal('This is the brand new movement!!!');
    });

  });

  describe('PUT /api/movements/:id', function() {
    var updatedMovement;

    beforeEach(function(done) {
      request(app)
        .put('/api/movements/' + newMovement._id)
        .send({
          name: 'Updated Movement',
          info: 'This is the updated movement!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMovement = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMovement = {};
    });

    it('should respond with the updated movement', function() {
      updatedMovement.name.should.equal('Updated Movement');
      updatedMovement.info.should.equal('This is the updated movement!!!');
    });

  });

  describe('DELETE /api/movements/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/movements/' + newMovement._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when movement does not exist', function(done) {
      request(app)
        .delete('/api/movements/' + newMovement._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
