import"./custom-prompt-d99439b2.js";export default define(class PaypalCheckout extends ElementBase{constructor(){super()}connectedCallback(){super.connectedCallback()}get prompt(){return this.shadowRoot.querySelector("custom-prompt")}get template(){return html`
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
    `}show(){return this.prompt.show(),paypal.Buttons({commit:!0,application_context:{shipping_preference:"NO_SHIPPING"},createOrder:(e,t)=>t.order.create({intent:"CAPTURE",application_context:{shipping_preference:"NO_SHIPPING"},purchase_units:[{amount:{value:"0.01"}}]}),onApprove:function(e,t){return t.order.capture().then(function(e){alert("Transaction completed by "+e.payer.name.given_name)})}}).render(this.shadowRoot.querySelector("#paypal-button")),new Promise((e,t)=>{this.shadowRoot.querySelector("custom-svg-icon").addEventListener("click",()=>{const t=[];for(const e of this.selectors)"null"!==e.selected&&("cash"!==e.selected&&"googlepay"!==e.selected?t.push([e.selected,this.shadowRoot.querySelector(`[name="${e.selected}"]`).value]):t.push(e.selected));console.log(t),e(t),document.body.removeChild(this)})})}});
