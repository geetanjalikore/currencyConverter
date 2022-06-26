const fs = require('fs');
const { parseRequest } = require('./parser.js');
const { Response } = require('./response.js');

const currecyEquivalents = {
  'USD': 0.013,
  'CAD': 0.016,
  'EUR': 0.012,
  'JPY': 1.73,
  'AUD': 0.018
};

const html = (content) => {
  const styles = 'color:red;text-align:center';
  const contentPara = `<h2 style="${styles}">${content}</h2>`;
  return `<html><body>${contentPara}<body></html>`;
};

const currencyConverter = ({ uri, params }, response) => {
  if (uri === '/') {
    const content = fs.readFileSync('./src/form.html');
    response.send(content);
  }

  if (uri === '/convert') {
    const { amount, type } = params;
    const equivalent = +amount * currecyEquivalents[type];
    response.send(html(`${amount} INR = ${equivalent} ${type} `));
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
