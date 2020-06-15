'use strict';

module.exports = exports = function(req, callback) {
  let body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('error', function(err) {
    console.error(err);
  });
  req.on('end', function() {
    try {
      let run = JSON.parse(body);
      callback(run);
    } catch(err) {
      callback(err);
    }
  });
}
