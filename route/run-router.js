'use strict';

const router = require('./router.js');
const storage = require('./storage.js');
const parseJSON = require('./parse-json.js');
const Run = require('../model/js');

module.exports = function(router) {
  router.get('/api/run', function(req, res) {
    storage.fetchItem(req.url.query.date)
    .then(run => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(run);
    })
    .catch(err => {
      //error from rejected promise
      console.error(err)
      //error sent to client
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end();
    })
  })
}
