'use strict';

var http = require('http');
var fs   = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Fapi = function(options) {
  var fapi = this;

  this.options = options;

  this.handleRequest = function(req, res) {

    var apiFilePath    = fapi.requestToAPIFilePath(req);
    var publicFilePath = fapi.requestToPublicFilePath(req);

    if(fapi.options.debug) {
      console.log('apiFilePath: ' + apiFilePath);
      console.log('publicFilePath: ' + publicFilePath);
    }
    fs.exists(publicFilePath, function(err, exists) {
      if(err) {
        return fapi.sendError(err, res);
      }
      if(exists) {
        return fapi.sendFile(publicFilePath);
      }

      fs.exists(apiFilePath, function(err, exists) {
        if(err) {
          return fapi.sendError(err, res);
        }
        if(exists) {
          return fapi.sendFile(apiFilePath);
        }

        res.statusCode = 404;
        res.end('Not Found');

      });

    });

  };

  this.server = http.createServer(this.handleRequest);
};
util.inherits(Fapi, EventEmitter);

Fapi.prototype.requestToAPIFilePath = function(req) {
  return this.options.apiPath + '/' + req.method.toUpperCase() + (req.url.match(/\/$/) ? req.url + 'index' : req.url) + '.json';
};

Fapi.prototype.requestToPublicFilePath = function(req) {
  return this.options.publicPath + (req.url.match(/\/$/) ? req.url + 'index.html' : req.url);
};

Fapi.prototype.sendError = function(err, res) {
  res.statusCode = 500;
  res.end(err.message);
  console.error(err);
};

Fapi.prototype.sendFile = function(path, res) {
  fs.createReadStream(path).pipe(res);
};

var createInstance = function(options) {
  return new Fapi(options);
};

module.exports = createInstance;
module.exports.Fapi = Fapi;