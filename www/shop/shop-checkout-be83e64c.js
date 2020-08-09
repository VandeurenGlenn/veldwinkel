export default define(class ShopCheckout extends ElementBase{constructor(){super()}connectedCallback(){super.connectedCallback&&super.connectedCallback()}checkout(){}paymentRequest(e,t){new PaymentRequest([{supportedMethods:"https://google.com/pay",data:{environment:"TEST",apiVersion:2,apiVersionMinor:0,merchantInfo:{merchantId:"01234567890123456789",merchantName:"Guldentopveldwinkel"},allowedPaymentMethods:[{tokenizationSpecification:{type:"DIRECT",parameters:{protocolVersion:"ECv2",publicKey:"BOdoXP1aiNp.....kh3JUhiSZKHYF2Y="}},type:"BASIC-CARD",parameters:{allowedAuthMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],allowedCardNetworks:["MASTERCARD","VISA","amex","discover"],allowedTypes:["debit","credit","prepaid"]}},{tokenizationSpecification:{type:"DIRECT",parameters:{protocolVersion:"ECv2",publicKey:"BOdoXP1aiNp.....kh3JUhiSZKHYF2Y="}},type:"CARD",parameters:{allowedAuthMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],allowedCardNetworks:["MASTERCARD","VISA"]}}]}},{supportedMethods:"basic-card",data:{merchantInfo:{merchantId:"01234567890123456789",merchantName:"Guldentopveldwinkel"},allowedPaymentMethods:[{tokenizationSpecification:{type:"DIRECT",parameters:{protocolVersion:"ECv2",publicKey:"BOdoXP1aiNp.....kh3JUhiSZKHYF2Y="}},type:"CARD",parameters:{allowedAuthMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],allowedCardNetworks:["MASTERCARD","VISA"]}}]}}],{total:{label:"total",amount:{currency:"eur",value:3}}},{requestPayerEmail:!0,requestPayerName:!0}).show()}get template(){return html`
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
    `}});
