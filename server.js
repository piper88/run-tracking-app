const http = require('http');
const PORT = 3000;
const Router = require('./lib/router.js');
const router = new Router();
const runRouter = require('./route/run-router.js');

runRouter(router);


const server = http.createServer((req, res) => {
  router.route(req, res);
});

server.listen(PORT, () => {
    console.log(`server up on ${PORT}`);
});
