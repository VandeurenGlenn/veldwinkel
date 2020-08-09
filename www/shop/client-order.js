import"./base-8131728b.js";import"./custom-svg-icon-6e670944.js";import"./custom-container-df0870f4.js";import"./translated-string-8d4db03f.js";import"./top-price-5d64c65c.js";export default define(class ClientOrder extends ElementBase{get value(){return this._value}set value(t){console.log(t),this._value=t,this._stamp()}constructor(){super()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),(async()=>{firebase.auth().onAuthStateChanged(async t=>{t?this._stamp():signin()})})()}async _stamp(){let t=await firebase.database().ref(`orders/${user.uid}/${this.value}`).once("value");if(!(t=t.val()))return this.busy||(this.innerHTML="",await import("./busy-c1098c3d.js"),this.busy=!0,this.innerHTML='<busy-animation style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"></busy-animation>'),setTimeout(()=>{this._stamp()},2e3);this.innerHTML="",this.busy=!1;const{collectionTime:s,payment:e}=t[0],n=document.createElement("span");n.classList.add("column","heading"),this.innerHTML="",n.innerHTML=`\n    <span class="row"><strong>order</strong>: ${this.value}</span><br>\n    <span class="row"><strong><translated-string>collection time</translated-string></strong>: <custom-date lang="nl" value="${s[1]}"></custom-date></span><br>\n    <span class="row"><strong><translated-string>payment</translated-string></strong>: ${e}</span><br>\n    `,this.appendChild(n),t.shift();for(const s of t){const t=await firebase.database().ref(`offerDisplay/${s.product}`).once("value");s.product=t.val();const e=document.createElement("span");e.classList.add("row","list-item"),e.innerHTML=`\n      <strong>${s.aantal}</strong>\n      <strong>${s.product.name}</strong>\n      <span class="flex"></span>\n      <top-price>${s.product.price}</top-price>\n      `,this.appendChild(e)}}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
  ::slotted(.heading) {
    mixin(--css-column)
    height: 128px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
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

</style>
<custom-container>
<slot></slot>
</custom-container>
    `}});
