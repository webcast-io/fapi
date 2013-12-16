'use strict';

var libFapi = require('../lib/fapi');
var assert  = require('assert');
var request = require('request');
var config  = {};

config.port = process.env.PORT || 8000;

describe('Fapi Lib', function() {
  var fapi;

  describe('createInstance()', function() {
    it('should return a Fapi instance', function() {
      fapi = libFapi({
        publicPath: __dirname + '/public',
        apiPath: __dirname + '/api',
        apiRoute: ''
      });
      assert.ok(fapi instanceof libFapi.Fapi);
    });
    it('should provide .server and listen on specified port', function(done) {
      fapi.server.listen(config.port, done);
    });
  });

  describe('Fapi.handleRequest()', function() {
    describe('on a request that should resolve to an api response', function() {
      it('should return the api file', function(done) {
        request({
          url: 'http://localhost:' + config.port + '/users',
          json: true
        }, function(err, res, body) {
          console.log(body);
          assert.equal(err, null);
          assert.deepEqual(body, ['bencevans']);
          done();
        });
      });
      it('should return an api file when at /', function(done) {
        request({
          url: 'http://localhost:' + config.port + '/',
          json: true
        }, function(err, res, body) {
          assert.equal(err, null);
          assert.deepEqual(body, 'Hello World');
          done();
        });
      });
    });

    describe('on a request that should resolve to a static file response', function() {
      it('should return the static file', function(done) {
        request({
          url: 'http://localhost:' + config.port + '/breakfast.html',
        }, function(err, res, body) {
          assert.equal(err, null);
          assert.deepEqual(body, 'Full English');
          done();
        });
      });
      it('should allow both .html and without', function(done) {
        request({
          url: 'http://localhost:' + config.port + '/breakfast',
        }, function(err, res, body) {
          assert.equal(err, null);
          assert.deepEqual(body, 'Full English');
          done();
        });
      });
      it('should return an static file when at /', function(done) {
        request({
          url: 'http://localhost:' + config.port + '/dinner',
        }, function(err, res, body) {
          assert.equal(err, null);
          assert.deepEqual(body, 'Nom');
          done();
        });
      });
    });

    describe('on a request that should resolve to a 404 response', function() {
      it('should return with a statusCode of 404', function(done) {
        request({
          url: 'http://localhost:' + config.port + '/wheres-the-error-yo',
        }, function(err, res) {
          assert.equal(err, null);
          assert.equal(res.statusCode, 404);
          done();
        });
      });
      it('should present a user error', function(done) {
        request({
          url: 'http://localhost:' + config.port + '/wheres-the-error-yo',
        }, function(err, res, body) {
          assert.equal(err, null);
          assert.ok(body.match(/Not Found/));
          done();
        });
      });
    });
  });

  describe('Fapi.prototype.requestToAPIFilePath', function() {
    it('should return a file path including the public direcotry prepended');
  });

  describe('Fapi.prototype.requestToPublicFilePath', function() {
    it('should return a file path including the public direcotry prepended');
  });

  describe('Fapi.prototype.sendError', function() {
    it('should return with a status code of 500');
    it('should show a message to the user');
  });

  describe('Fapi.prototype.sendFile', function() {
    it('should pipe a file in response to a users request');
  });


});