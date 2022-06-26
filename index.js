const { createServer } = require('net');
const { onConnection, currencyConverter } = require('./src/server.js');

const server = createServer((socket) => {
  onConnection(socket, currencyConverter);
});

server.listen(9000);
