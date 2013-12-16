'use strict';

var Fapi   = require('../lib/fapi');
var assert = require('assert');

describe('Fapi Lib', function() {
  var fapi;

  describe('createInstance()', function() {
    it('should return a Fapi instance', function() {
      fapi = Fapi();
      assert.ok(fapi instanceof Fapi.Fapi);
    });
  });

  describe('Fapi.handleRequest()', function() {
    describe('on a request that should resolve to an api response', function() {
      it('should return the api file');
      // request.get(fapi, '/users') === ['bencevans']
      it('should return an api file when at /');
    });

    describe('on a request that should resolve to a static file response', function() {
      it('should return the static file');
      it('should allow both .html and without');
      it('should return an static file when at /');
    });

    describe('on a request that should resolve to a 404 response', function() {
      it('should return with a statusCode of 404');
      it('should present a user error');
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