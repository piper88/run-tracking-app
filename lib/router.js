'use strict';

const url = require('url');
const querystring = require('querystring');

//
const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    DELETE: {},
    PUT: {}
  };
}

Router.prototype.get = function(endpoint,callback) {
  this.routes.GET[endpoint] = callback;
}

Router.prototype.post = function(endpoint,callback) {
  this.routes.POST[endpoint] = callback;
}

Router.prototype.delete = function(endpoint,callback) {
  this.routes.DELETE[endpoint] = callback;
}

Router.put = function(endpoint,callback) {
  this.routes.PUT[endpoint] = callback;
}

Router.prototype.route = function(req, res) {
  //parse url of request
  req.url = url.parse(req.url);
  //parse query
  req.url.query = querystring.parse(req.url.query);

  if (this.routes[req.method][req.url.pathname]) {
    this.routes[req.method][req.url.pathname](req, res);
    return;
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end();
  }
}
