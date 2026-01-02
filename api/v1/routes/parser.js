// parser.js
import { PaymentMethod, PaymentStatus } from './models';
import { PaymentGateway } from './gateways';

class PaymentParser {
  constructor(gateway) {
    this.gateway = gateway;
  }

  parsePaymentRequest(request) {
    if (!request || typeof request!== 'object') {
      throw new Error('Invalid payment request');
    }

    const { paymentMethod, amount, currency, paymentStatus } = request;

    if (!paymentMethod ||!PaymentMethod.isSupported(paymentMethod)) {
      throw new Error('Unsupported payment method');
    }

    if (typeof amount!== 'number' || amount <= 0) {
      throw new Error('Invalid amount');
    }

    if (typeof currency!== 'string' || currency.length!== 3) {
      throw new Error('Invalid currency');
    }

    if (!PaymentStatus.isSupported(paymentStatus)) {
      throw new Error('Unsupported payment status');
    }

    return {
      paymentMethod,
      amount,
      currency,
      paymentStatus,
    };
  }

  async processPaymentRequest(request) {
    const parsedRequest = this.parsePaymentRequest(request);

    try {
      const paymentResponse = await this.gateway.processPayment(parsedRequest);
      return paymentResponse;
    } catch (error) {
      throw new Error(`Error processing payment: ${error.message}`);
    }
  }
}

export { PaymentParser };