const assert = require('assert');
const { currencyConverter } = require('../src/server.js');

const mockRespose = (statusLine) => ({
  content: '',
  send: function (data) {
    this.content = statusLine + data;
  },
});

describe('currencyConverter', () => {
  it('Should convert the currency 1 INR to USD', () => {
    const response = mockRespose('HTTP/1.1 200 ok\r\n\r\n');

    currencyConverter({
      method: 'GET',
      uri: '/convert',
      params: { type: 'USD', amount: '1.00' },
      protocol: 'HTTP/1.1'
    }, response);

    const expected = 'HTTP/1.1 200 ok\r\n\r\n1.00 INR = 0.013 USD';
    assert.strictEqual(response.content, expected);
  });
});
