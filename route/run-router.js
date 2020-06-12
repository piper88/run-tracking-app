'use strict';

const router = require('../lib/router.js');
const storage = require('../lib/storage.js');
const parseJSON = require('../lib/parse-json.js');
const Run = require('../model/run.js');

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

  router.post('/api/run', function(req, res) {

    parseJSON(req, function(body) {
      try {
        let run = new Run(body.date, body.distance, body.pace);
        storage.createItem(run)
        .then((newlyCreatedRun) => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(newlyCreatedRun));
          res.end();
        })
        .catch((err) => {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end();
        })
      } catch(err) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end();
      }
    })
  })

  router.delete('/api/run', function(req, res) {
  if (req.url.query.date) {
    storage.deleteItem(req.url.query.date)
    .then((dateOfDeletedRun) => {
      res.writeHead(204, {'Content-Type': 'text/plain'});
      res.write(`Run on ${dateOfDeletedRun} deleted`)
      res.end();
    })
    .catch((err) => {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('Run not found')
      res.end();
    })
  } else {
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.end();
  }
})

}
