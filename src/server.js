const fs = require('fs');
const { parseRequest } = require('./parser.js');
const { Response } = require('./response.js');

const currecyEquivalents = {
  'USD': 0.013
};

const currencyConverter = ({ uri, params }, response) => {
  if (uri === '/') {
    const content = fs.readFileSync('./src/form.html');
    response.send(content);
  }

  if (uri === '/convert') {
    const { amount, type } = params;
    response.send(`${amount} INR = ${currecyEquivalents[type]} ${type}`);
  }
};

const onConnection = (socket, handler) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    handler(request, response);
  });
};

module.exports = { currencyConverter, onConnection };
