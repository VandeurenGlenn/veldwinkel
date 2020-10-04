import './../custom-prompt.js';

export default define(class PaypalCheckout extends ElementBase {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get prompt() {
    return this.shadowRoot.querySelector('custom-prompt');
  }

  get template() {
    return html`
    <style>
      :host {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #33333355;
        z-index: 100;
      }

      custom-prompt {
        max-height: 100%;
        max-width: 100%;
      }
      [disabled] {
        color: #ddd;
        pointer-events: none;
      }
      apply(--css-flex)
      apply(--css-row)
      @media (min-width: 720px) {
        custom-prompt {
          max-height: 600px;
          max-width: 600px;
        }
      }
    </style>
    <custom-prompt>
      <h2 slot="head"><translated-string>checkout</translated-string></h2>
        
          <div id="paypal-button"></div>
    

      <span class="flex"></span>

      <span class="row">
        <span class="flex"></span>
        <custom-svg-icon icon="done"></custom-svg-icon>
      </span>
    </custom-prompt>
    
    
    <script>
      // This function displays Smart Payment Buttons on your web page.
    </script>
    `;
  }

  show(items) {
    console.log(items);
    return new Promise((resolve, reject) => {
    this.prompt.show();
      
      paypal.Buttons({
        commit: true,
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
        createOrder: (data, actions) => {
          
            return actions.order.create({
              
              intent: 'CAPTURE',
              application_context: {
                shipping_preference: 'NO_SHIPPING',
              },
              purchase_units: [{
                amount: {
                  value: '0.01'
                }
              }]
              
          })   
        
      },
    onApprove: function(data, actions) {
      // This function captures the funds from the transaction.
      return actions.order.capture().then(function(details) {
        // This function shows a transaction success message to your buyer.
        // alert('Transaction completed by ' + details.payer.name.given_name);
        resolve(details)
      });
    }
    }).render(this.shadowRoot.querySelector('#paypal-button'));
  })
    
    
  }
});
