const http = require('http');
const PORT = 3000;
const router = new Router();

const server = http.createServer((req, res) => {
  router.route(req, res);
});

server.listen(PORT, () => {
    console.log(`server up on ${PORT}`);
});
