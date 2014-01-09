'use strict';

var http = require('http');
var fs   = require('fs');
var util = require('util');
var path = require('path');
var mime = require('mime');
var jade = require('jade');
var EventEmitter = require('events').EventEmitter;
var routes = require('./routes');

var Fapi = function(options) {
  var fapi = this;

  this.options = options;

  this.handleRequest = function(req, res) {

    var apiFilePath    = path.resolve(fapi.requestToAPIFilePath(req));
    var publicFilePath = path.resolve(fapi.requestToPublicFilePath(req));

    if(fapi.options.debug) {
      console.log('apiFilePath: ' + apiFilePath);
      console.log('publicFilePath: ' + publicFilePath);
    }

    fs.exists(publicFilePath, function(exists) {
      if(exists) {
        return fapi.sendFile(publicFilePath, res);
      }
      fs.exists(path.resolve(publicFilePath + '.html'), function(exists) {
        if(exists) {
          return fapi.sendFile(publicFilePath + '.html', res);
        }

        fs.exists(apiFilePath, function(exists) {
          if(exists) {
            return fapi.sendFile(apiFilePath, res);
          }

          var dir = path.resolve(fapi.options.publicPath);
          var matchingRoute = fapi.findMatchingRoute(req.url, req.method, res);

          if (typeof matchingRoute === 'string') {
            return fapi.sendFile(dir + matchingRoute, res);
          } else if (typeof matchingRoute === 'object') {
            return fapi.compileFile(matchingRoute, dir, res);
          }

          res.statusCode = 404;
          res.end('Not Found');

        });

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
  res.send(err.message);
  console.error(err);
};

Fapi.prototype.sendFile = function(path, res) {
  var self = this;
  fs.stat(path, function(err, stat) {
    if (err) {
      return self.sendError(err, res);
    }

    res.writeHead(200, {
      'Content-Type' : mime.lookup(path),
      'Content-Length' : stat.size
    });

    fs.createReadStream(path).pipe(res);
  });

};

Fapi.prototype.compileFile = function(templateInfo, currDir, res) {
  var templatePath = currDir + '/..' + templateInfo.template;

  fs.readFile(templatePath, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var templateData = require(currDir + '/../views/template-data');

      for (var key in templateInfo.data) {
        templateData[key] = templateInfo.data[key];
      }

      var compiledTemplate = jade.compile(data, {
        filename: templatePath,
        pretty: true
      });

      res.write(compiledTemplate(templateData));
      res.end();
    }
  });
};

Fapi.prototype.findMatchingRoute = function(url, method, res) {
  var matchingRoute = routes[url];

  if (typeof matchingRoute === 'undefined') {
    return false;
  } else if (typeof matchingRoute === 'string') {
    return matchingRoute;
  } else {
    var methodRoute = matchingRoute[method];

    if (typeof methodRoute === 'string') {
      return methodRoute;
    } else if (methodRoute) {
      res.writeHead(301, {
        'Location': methodRoute.location
      });
    } else {
      return matchingRoute;
    }
  }

};

var createInstance = function(options) {
  options = options || {};
  return new Fapi(options);
};

module.exports = createInstance;
module.exports.Fapi = Fapi;
