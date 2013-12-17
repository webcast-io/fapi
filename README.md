fapi
====

A webserver for front-end development providing a file structured API

[![Build Status](https://travis-ci.org/webcast-io/fapi.png?branch=master)](https://travis-ci.org/webcast-io/fapi)
[![Coverage Status](https://coveralls.io/repos/webcast-io/fapi/badge.png?branch=master)](https://coveralls.io/r/webcast-io/fapi?branch=master)

```
  Usage: fapi [options]

  Options:

    -h, --help                      output usage information
    -V, --version                   output the version number
    -p, --port [port]               Port the webserver should listen on
    -b, --public-path [publicPath]  Path to static/public files
    -a, --api-path [apiPath]        Path to the base directory of API files
    -c, --api-route [apiRoute]      Route api requests should follow
    -d, --debug [debug]             Logs more to console

```

Example Directory Structure:

    - api
      - GET
        - users.json
      - POST
        -user.json
    - public
      - css
        - style.css
      - index.html

Would provide the following given requests:

* GET /users = /api/GET/users.json
* GET /users.json = /api/GET/users.json
* POST /user = /api/POST/user.json
* {METHOD} /{apiRoute}/{PATH}[.json] = /{apiPath}/{METHOD}/{PATH}.json

* GET / = /public/index.html
* GET /index.html = /public/index.html
* GET /{PATH} = /{publicPath}/{PATH}
