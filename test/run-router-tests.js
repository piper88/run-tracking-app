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
    before(done => {
      let run = {
        date: 'today',
        distance: 2,
        pace: 700,
      };
      storage.createItem(run)
      .then(() => done())
      .catch((err) => done(err));
    })
    after(done => {
      storage.deleteItem('today')
      .then(() => done())
      .catch((err) => done(err));
    })
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

  describe('testing POST /api/run', function() {
    describe('with valid body', function() {
      it('should create a run', function(done) {
        after(done => {
          storage.deleteItem('June 5, 2020')
          .then(() => done())
          .catch((err) => done(err));
        });
        request.post('localhost:3000/api/run')
        .send({date: 'June 5, 2020', distance: 10, pace: 930})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        })
      })
    })

    describe('with missing date', function() {
      it('should return a 400 bad request error', function(done) {
        request.post('localhost:3000/api/run')
        .send({distance: 4, pace: 800})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        })
      })
    })

    describe('with missing distance', function() {
      it('should return a 400 bad request error', function(done) {
        request.post('localhost:3000/api/run')
        .send({date: 'June 6, 2020', pace: 915})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        })
      })
    })

    describe('with missing pace', function() {
      it('should return a 400 bad request error', function(done) {
        request.post('localhost:3000/api/run')
        .send({date: 'June 6, 2020', distance: 12})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        })
      })
    })
  })

  describe('testing DELETE /api/run', function() {
  describe('with valid date', function() {
    before(done => {
      let run = {
        date: 'tomorrow',
        distance: 6,
        pace: 730,
      };
      storage.createItem(run)
      .then(() => done())
      .catch((err) => done(err));
    })
    it('should return a 204 status, successfully deleted', function(done) {
      request.delete('localhost:3000/api/run?date=tomorrow')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      })
    })
  })
  describe('with invalid date', function() {
    it('should return a 404 not found error', function(done) {
      request.delete('localhost:3000/api/run?date=tomorrow')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      })
    })
  })
  describe('with missing date', function() {
    it('should return a 400 bad request error', function(done) {
      request.delete('localhost:3000/api/run?date=')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      })
    })
  })
})

describe('testing PUT /api/run', function() {
  describe('with valid date and body', function() {
    before(done => {
      let run = {
        date: 'tomorrow',
        distance: 6,
        pace: 730,
      };
      storage.createItem(run)
      .then(() => done())
      .catch(err => done(err));
    })
    after(done => {
      storage.deleteItem('tomorrow')
      .then(() => done())
      .catch(err => done(err));
    })
    it('should return a new item', function(done) {
      request.put('localhost:3000/api/run?date=tomorrow')
      .send({date: 'tomorrow', distance: 12, pace: 930})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.distance).to.equal(12);
        done();
      })
    })
  })
  describe('with invalid date', function() {
    before(done => {
      let run = {
        date: '6-8-20',
        distance: 1,
        pace: 600,
      };
      storage.createItem(run)
      .then(() => done())
      .catch(err => done(err));
    })
    after(done => {
      storage.deleteItem('6-8-20')
      .then(() => done())
      .catch(err => done(err));
    })
    it('should return a 404 error', function(done) {
      request.put('localhost:3000/api/run?date=whenever')
      .send({date:'whenever', distance: 2, pace: 630})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      })
    })
  })
  describe('with missing query date', function() {
    before(done => {
      let run = {
        date: '6-8-20',
        distance: 1,
        pace: 600,
      };
      storage.createItem(run)
      .then(() => done())
      .catch(err => done(err));
    })
    after(done => {
      storage.deleteItem('6-8-20')
      .then(() => done())
      .catch(err => done(err));
    })
    it('should return a 400 error', function(done) {
      request.put('localhost:3000/api/run')
      .send({date: 'whenever', distance: 0, pace: 0})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      })
    })
  })
  describe('with missing date in body', function() {
    before(done => {
      let run = {
        date: '6-8-20',
        distance: 1,
        pace: 600,
      };
      storage.createItem(run)
      .then(() => done())
      .catch(err => done(err));
    })
    after(done => {
      storage.deleteItem('6-8-20')
      .then(() => done())
      .catch(err => done(err));
    })
    it('should return a 400 error', function(done) {
      request.put('localhost:3000/api/run?date=6-8-20')
      .send({distance: 5, pace: 500})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      })
    })
  })
  describe('with missing distance', function() {
    before(done => {
      let run = {
        date: '6-8-20',
        distance: 1,
        pace: 600,
      };
      storage.createItem(run)
      .then(() => done())
      .catch(err => done(err));
    })
    after(done => {
      storage.deleteItem('6-8-20')
      .then(() => done())
      .catch(err => done(err));
    })
    it('should return a 400 error', function(done) {
      request.put('localhost:3000/api/run?date=6-8-20')
      .send({date: '6-8-20', pace: 500})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      })
    })
  })
  describe('with missing pace', function() {
    before(done => {
      let run = {
        date: '6-8-20',
        distance: 1,
        pace: 600,
      };
      storage.createItem(run)
      .then(() => done())
      .catch(err => done(err));
    })
    after(done => {
      storage.deleteItem('6-8-20')
      .then(() => done())
      .catch(err => done(err));
    })
    it('should return a 400 error', function(done) {
      request.put('localhost:3000/api/run?date=6-8-20')
      .send({date: '6-8-20' ,distance: 5})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      })
    })
  })
  describe('with missing request body', function() {
    before(done => {
      let run = {
        date: '6-8-20',
        distance: 1,
        pace: 600,
      };
      storage.createItem(run)
      .then(() => done())
      .catch(err => done(err));
    })
    after(done => {
      storage.deleteItem('6-8-20')
      .then(() => done())
      .catch(err => done(err));
    })
    it('should return a 400 error', function(done) {
      request.put('localhost:3000/api/run')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      })
    })
  })
})

})
