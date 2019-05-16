export default define(class ShopCheckout extends ElementBase {
  constructor() {
    super();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }

  checkout() {
    // address, name, card, at place
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/PaymentRequest
  paymentRequest(items, total) {
    // TODO: basic cards are not shown
    // TODO: custom-payment-request-api
    const basic = {
      merchantInfo: {
        // mID v(console.play)
        merchantId: '01234567890123456789',
        merchantName: 'Guldentopveldwinkel'
      },
      allowedPaymentMethods: [{
        'tokenizationSpecification': {
          'type': 'DIRECT',
          'parameters': {
            'protocolVersion': 'ECv2',
            'publicKey': 'BOdoXP1aiNp.....kh3JUhiSZKHYF2Y='
          }
        },
        'type': 'CARD',
        'parameters': {
          allowedAuthMethods: [
            'PAN_ONLY',
            'CRYPTOGRAM_3DS'
          ],
          allowedCardNetworks: [
            'MASTERCARD',
            'VISA'
          ]
        }
      }]
    };
    const googlePaymentDataRequest = {
      environment: 'TEST',
      apiVersion: 2,
      apiVersionMinor: 0,
      merchantInfo: {
        // mID v(console.play)
        merchantId: '01234567890123456789',
        merchantName: 'Guldentopveldwinkel'
      },
      allowedPaymentMethods: [{
        'tokenizationSpecification': {
          'type': 'DIRECT',
          'parameters': {
            'protocolVersion': 'ECv2',
            'publicKey': 'BOdoXP1aiNp.....kh3JUhiSZKHYF2Y='
          }
        },
        'type': 'CARD',
        'parameters': {
          allowedAuthMethods: [
            'PAN_ONLY',
            'CRYPTOGRAM_3DS'
          ],
          allowedCardNetworks: [
            'MASTERCARD',
            'VISA'
          ]
        }
      }]
    };
    const request = new PaymentRequest([{
      supportedMethods: 'https://google.com/pay',
      data: googlePaymentDataRequest
    }, {
      supportedMethods: 'basic-card',
      data: basic
    }], {
      total: {
        label: 'total',
        amount: {
          currency: 'eur',
          value: 3
        }
      }
    }, { requestPayerEmail: true,
      requestPayerName: true });
    request.show();
  }

  get template() {
    return html`
<style>
  :host {
    mixin(--css-column)
    height: 100%;
  }
  h2 {
    margin: none;
    padding: 12px 12px 0 12px;
    box-sizing: border-box;
  }
</style>
<h2>checkout</h2>
    `;
  }
});
