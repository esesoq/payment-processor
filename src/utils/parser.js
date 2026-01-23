// parser.js
import { parse } from 'csv-parse';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { Payment } from './models/Payment';
import { Transaction } from './models/Transaction';

async function parseFile(filePath) {
  try {
    const fileBuffer = await fs.readFile(filePath);
    const lines = fileBuffer.toString().split('\n');
    const payments = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].split(',');
      const payment = new Payment(line[0], line[1], new Transaction(line[2], line[3], line[4]));
      payments.push(payment);
    }

    return payments;
  } catch (err) {
    throw new Error(`Error parsing file: ${err.message}`);
  }
}

export default parseFile;