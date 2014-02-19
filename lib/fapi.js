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
    if (req.headers['content-type']) {
      return fapi.getData(req, res);
    } else {
      return processRequest(req, res, fapi);
    }
  };

  this.server = http.createServer(this.handleRequest);
};
util.inherits(Fapi, EventEmitter);

function processRequest(req, res, fapi) {
  var apiFilePath    = path.resolve(fapi.requestToAPIFilePath(req));
  var publicFilePath = path.resolve(fapi.requestToPublicFilePath(req));

  if (publicFilePath.search(/\?/) !== -1) {
    publicFilePath = publicFilePath.split('?')[0];
  }

  if (req.url.search(/\?/) !== -1) {
    req.url = req.url.split('?')[0];
  }

  if (req.method === 'PATCH') {
    return fapi.getData(req, res);
  } else {
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
          } else if (req.url === '/api/1/media/1/speakers') {
            return fapi.getData(req, res);
          } else if (req.url === '/api/1/media/1/attachments') {
            return fapi.getData(req, res);
          } else if (req.url === '/api/1/media/1') {
            return fapi.getData(req, res);
          } else if (req.url === '/api/1/media') {
            return fapi.getData(req, res);
          } else if (req.url === '/api/1/projects') {
            return fapi.getData(req, res);
          }

          console.log('error')
          res.statusCode = 404;
          res.end('Not Found');

        });

      });

    });
  }
}

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
      'Content-Length' : stat.size,
      'Cache-Control' : 'public',
    });

    fs.createReadStream(path).pipe(res);
  });

};

Fapi.prototype.compileFile = function(templateInfo, currDir, res) {
  var templatePath = currDir + '/..' + templateInfo.template;
  var isTemp = this.options.publicPath === './dist';

  fs.readFile(templatePath, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var templateData = require(currDir + '/../views/template-data');

      templateData.helpers = {
        asset: function(path) {
          var extension = path.match(/(.*)[\/\\]([^\/\\]+)\.(\w+)$/)[3];
          var file;

          if (extension === 'js') {
            if (isTemp) {
              file = '<script src="' + path + '"></script>';
            } else {
              file = '<script data-main="' + path + '" src="/bower_components/requirejs/require.js"></script>';
            }
          } else {
            file = '<link rel="stylesheet" href="' + path + '">';
          }

          return file;
        }
      };

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

var count = 0;
var count2 = 0;
var count3 = 0;
var count4 = 0;

Fapi.prototype.getData = function(req, res) {
  var data = [];
  req.on('data', function(chunk) {
    data.push(chunk);
  });

  req.on('end', function() {
    var method = Buffer.concat(data).toString().match(/PATCH|PUT|DELETE/);
    var response;

    if (method) {
      req.method = method[0];
    }

    try {
      parsedData = JSON.parse(Buffer.concat(data).toString());
      parsedData.id = parsedData.id ? parsedData.id : 1;
      response = JSON.stringify(parsedData);
    } catch(e) {
      if (req.url === '/api/1/media/1/speakers' || req.url === '/api/1/media/1/speakers/1') {

        response = JSON.stringify({
          "id": 1,
          file: {
            "url": !count
              ? "http://www.tottenhamhotspur.com/uploadedImages/Shared_Assets/Images/News_images/SEASON_13-14/July_2013/paulinho730v.jpg?n=5537&targetTypeID=HighResNewsImage"
              : 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/27/MichaelDawson2013.jpg/257px-MichaelDawson2013.jpg',
            "asset": "image",
            "spec": "original",
            "mime": "image/jpg",
            "original_filename": "paulinho.jpg",
            "state": "new"
          }
        });

        if (!count) {
          count = 1;
        } else {
          count = 0;
        }

      } else if (req.url === '/api/1/media/1/attachments' || req.url === '/api/1/media/1/attachments/1') {

        response = JSON.stringify({
          "id": 1,
          file: {
            "asset": "attachment",
            "spec": "original",
            "mime": !count2 ? "pdf" : "doc",
            "original_filename": "a-doc.pdf",
            "state": "new"
          }
        });

        if (!count2) {
          count2 = 1;
        } else {
          count2 = 0;
        }
      } else if(req.url === '/api/1/media/1') {
        if (!count4) {
          response = JSON.stringify({
            id: 1,
            mp4_video: {
              "asset": "video",
              "spec": "original",
              "mime": "video/mp4",
              "url": "http://techslides.com/demos/sample-videos/small.mp4",
              "original_filename": "big_buck_bunny.mp4",
              "state": "new"
            },
            m3u8_video: {
              "asset": "video",
              "spec": "original",
              "mime": "video/mp4",
              "url": "/test-video/playlist.m3u8",
              "original_filename": "big_buck_bunny.mp4",
              "state": "new"
            }
          });
          count4 += 1;
        } else if (count4 === 1) {
          response = JSON.stringify({
            id: 1,
            mp4_video: {
              "asset": "video",
              "spec": "original",
              "mime": "video/mp4",
              "url": "http://techslides.com/demos/sample-videos/small.mp4",
              "original_filename": "big_buck_bunny.mp4",
              "state": "processing"
            },
            m3u8_video: {
              "asset": "video",
              "spec": "original",
              "mime": "video/mp4",
              "url": "/test-video/playlist.m3u8",
              "original_filename": "big_buck_bunny.mp4",
              "state": "processing"
            }
          });

          count4 += 1;
        } else {
          response = JSON.stringify({
            id: 1,
            mp4_video: {
              "asset": "video",
              "spec": "original",
              "mime": "video/mp4",
              "url": "http://techslides.com/demos/sample-videos/small.mp4",
              "original_filename": "big_buck_bunny.mp4",
              "state": "complete"
            },
            m3u8_video: {
              "asset": "video",
              "spec": "original",
              "mime": "video/mp4",
              "url": "/test-video/playlist.m3u8",
              "original_filename": "big_buck_bunny.mp4",
              "state": "complete"
            }
          });

          if (!count3) {
            count3 = 1;
          } else {
            count3 = 0;
          }
          count4 = 0;
        }

      } else if (/\/api\/1\/projects/.test(req.url)) {
        response = Buffer.concat(data).toString();
      } else {
        response = JSON.stringify({
          id: 1,
          mp4_video: {
            "asset": "video",
            "spec": "original",
            "mime": "video/mp4",
            "url": "http://techslides.com/demos/sample-videos/small.mp4",
            "original_filename": "big_buck_bunny.mp4",
            "state": "new"
          },
          m3u8_video: {
            "asset": "video",
            "spec": "original",
            "mime": "video/mp4",
            "url": "/test-video/playlist.m3u8",
            "original_filename": "big_buck_bunny.mp4",
            "state": "new"
          }
        });

        if (!count3) {
          count3 = 1;
        } else {
          count3 = 0;
        }
      }
    }

    setTimeout(function() {
      res.write(response);
      res.end();
    }, 1000);
  });
};

var createInstance = function(options) {
  options = options || {};
  return new Fapi(options);
};

module.exports = createInstance;
module.exports.Fapi = Fapi;
