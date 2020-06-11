'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const assert = require('assert');
const storage = require('../lib/storage.js')

require('../server.js');

describe('testing run routes', function() {
  storage.createResourceDirectory();

  describe('testing GET /api/run', function() {

  describe('with valid run date', function () {
    it('should return a run', function(done) {
      request.get('localhost:3000/api/run?date=today')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.distance).to.equal(2);
        done();
      })
    })
  })
  describe('with missing run date', function() {
    it('should return a 404 not found error', function(done) {
      request.get('localhost:3000/api/run')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      })
    })
  })

  describe('with invalid run date', function() {
    it('should return a 404 not found error', function(done) {
      request.get('localhost:3000/api/run?date=neverp')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      })
    })
  })
})

})
