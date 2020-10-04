import"./selector-mixin-86543087.js";import"./base-76fe9a2c.js";import"./select-mixin-bf4ecf3c.js";import"./custom-svg-icon-6e670944.js";import"./custom-container-baf539bd.js";import"./translated-string-a9e05c4f.js";import"./top-price-6bc08ed1.js";export default define(class ClientOrder extends ElementBase{get value(){return this._value}set value(s){console.log(s),this._value=s,this._stamp()}constructor(){super()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),(async()=>{firebase.auth().onAuthStateChanged(async s=>{s?this._stamp():signin()})})()}async _stamp(){let s=await firebase.database().ref(`orders/${user.uid}/${this.value}`).once("value");if(!(s=s.val()))return this.busy||(this.innerHTML="",await import("./busy-c1098c3d.js"),this.busy=!0,this.innerHTML='<busy-animation style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"></busy-animation>'),setTimeout(()=>{this._stamp()},2e3);this.innerHTML="",this.busy=!1,console.log({snap:s});const{collectionTime:t,id:n,products:e,status:a}=s,i=document.createElement("span");i.classList.add("column","heading"),this.innerHTML="",i.innerHTML=`\n    <span class="column"><strong><translated-string>order</translated-string></strong><span class="flex"></span>${this.value}</span><br>\n    <span class="column"><strong><translated-string>collection time</translated-string></strong><span class="flex"></span><custom-date lang="nl" value="${t[1]}"></custom-date></span><br>\n    <span class="column"><strong><translated-string>payment</translated-string></strong><span class="flex"></span><translated-string>${a}</translated-string></span><br>\n    <span class="column"><strong>PayPal <translated-string>transaction</translated-string></strong><span class="flex"></span><translated-string>${n}</translated-string></span><br>\n    `,this.appendChild(i);for(const t of s.products){const s=await firebase.database().ref(`offerDisplay/${t.key}`).once("value");t.product=s.val();const n=document.createElement("span");n.classList.add("row","list-item"),n.innerHTML=`\n      <strong>${t.count}</strong>\n      <strong>${t.product.name}</strong>\n      <span class="flex"></span>\n      <top-price>${t.product.price}</top-price>\n      `,this.appendChild(n)}}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    box-sizing: border-box;
    background: #48480d linear-gradient(167deg, #62622c, #a5ae99 40rem);
  }
  ::slotted(.heading) {
    mixin(--css-column)
    height: 254px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    padding: 8px;
    background: #48480d linear-gradient(167deg, #5a5a2d, #9da48b 40rem);
    color: #fff;
  }
  ::slotted(.list-item) {
    mixin(--css-row)
    mixin(--css-center)
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    height: 48px;
  }
  ::slotted(* .flex) {
    mixin(--css-flex)
  }
  ::slotted(.row) {
    mixin(--css-row)
  }
</style>
<custom-container>
<slot></slot>
</custom-container>
    `}});
