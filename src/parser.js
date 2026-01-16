const fs = require('fs');
const xml2js = require('xml2js');

class Parser {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = {};
  }

  parse() {
    const parser = new xml2js.Parser();
    const data = fs.readFileSync(this.filePath, 'utf8');
    parser.parseString(data, (err, result) => {
      if (err) {
        throw err;
      }
      this.data = result;
    });
  }

  getAmount(key) {
    return this.data.payment[key].amount[0];
  }

  getCurrency(key) {
    return this.data.payment[key].currency[0];
  }

  getTransactionId(key) {
    return this.data.payment[key].transactionId[0];
  }

  getPaymentDate(key) {
    return this.data.payment[key].date[0];
  }
}

module.exports = Parser;