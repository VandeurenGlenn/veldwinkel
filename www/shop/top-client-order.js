import"./base-8131728b.js";import"./custom-svg-icon-6e670944.js";import"./custom-container-df0870f4.js";import"./custom-date-61d31a4f.js";import"./top-price-5d64c65c.js";define(class ClientOrderSelectorItem extends ElementBase{constructor(){super()}get pieces(){return this.shadowRoot.querySelector("input").value}connectedCallback(){super.connectedCallback();const e=this.getAttribute("data-key"),{type:t,description:o,price:s,name:r}={...offers[e],...offerDisplay[e]};this.render({name:r,price:s,description:o,is:e})}get template(){return html`<style>
  :host {
    mixin(--css-column)
    padding: 24px 12px;
    box-sizing: border-box;
    /* min-height: 82px; */
    width: 100%;
    height: fit-content;
    cursor: pointer;
    pointer-events: auto;
  }
  summary, span {
    user-select: none;
    pointer-events: none;
  }
  h4 {
    margin: 0;
    pointer-events: none;
    text-transform: uppercase;
  }
  input {
    margin-right: 8px;
    padding: 12px 0px 12px 6px;
    box-sizing: border-box;
    width: 42px;
    outline: none;
    border: none;
    background: transparent;
    pointer-events: auto;
    color: var(--client-order-selector-item-color, '#888')
  }

  summary {
    padding-left: 48px;
  }
  apply(--css-row)
  apply(--css-center)
  apply(--css-flex)
</style>
<span class="row center">
  <input type="number" value="1"></input>
  <h4>${"name"}</h4>
  <span class="flex"></span>
  <top-price>${"price"}</top-price>
</span>

<summary>${"description"}</summary>
`}}),define(class ClientOrderSelector extends(RenderMixin(SelectorMixin(HTMLElement))){constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){super.connectedCallback(),this.multi=!0,this.attrForSelected="data-key",this.shadowRoot.querySelector("h3").innerHTML=this.getAttribute("is")}clear(){this.selected=[]}_onSelected(e){this._onSelectedAction()}add(e){let t=this.querySelector(`[data-key="${e}"]`);t||((t=document.createElement("client-order-selector-item",e)).setAttribute("data-key",e),t.classList.add("selection"),this.appendChild(t))}get template(){return html`<style>
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  summary, span {
    user-select: none;
    pointer-events: none;
  }
  h2 {
    padding: 24px;
    margin: 0;
    border-top: 1px solid #0000004f;
    border-bottom: 1px solid #0000004f;
    text-transform: uppercase;
    pointer-events: none;
  }
  h3 {
    padding: 24px;
    margin: 0;
    text-transform: uppercase;
    pointer-events: none;
  }
  h4 {
    margin: 0;
    pointer-events: none;
    text-transform: uppercase;
  }
  ::slotted(.custom-selected) {
    background: #1b5e20a6;
    color: #fff;
    --svg-icon-color: #fff;
    --client-order-selector-item-color: #fff;
  }
  slot {
    pointer-events: none;
  }
</style>
<h3></h3>
<slot></slot>
`}});export default define(class TopClientOrder extends ElementBase{get selectors(){return Array.from(this.querySelectorAll("client-order-selector"))}get offerDisplay(){return window.topstore.databases.get("offerDisplay")}get offers(){return window.topstore.databases.get("offers")}constructor(){super(),this._onSelected=this._onSelected.bind(this),this._submit=this._submit.bind(this),this._clear=this._clear.bind(this)}connectedCallback(){super.connectedCallback(),this.shadowRoot.querySelector('custom-svg-icon[icon="done"]').addEventListener("click",this._submit),this.shadowRoot.querySelector('custom-svg-icon[icon="close"]').addEventListener("click",this._clear),(async()=>{window.offerDisplay=await this.offerDisplay.get(),0===Object.keys(offerDisplay).length&&(window.offerDisplay=await this.offerDisplay.get()),await this.stamp();for(const e of this.selectors)e.addEventListener("selected",this._onSelected)})()}async stamp(){window.offers||(window.offers=await this.offers.get());for(const e of Object.keys(offerDisplay)){if(offers[e]||(offers[e]=await this.offers.get(e)),offerDisplay[e].public||!1){const t=document.createElement("span");t.classList.add("selection"),t.setAttribute("data-key",e);const{type:o}=offers[e];let s=this.querySelector(`client-order-selector[is="${o}"]`);s||(s=document.createElement("client-order-selector",o),this.appendChild(s)),s.add(e)}}}async checkout(e){const t=await firebase.database().ref(`orders/${user.uid}`).push(e);firebase.database().ref(`orderKeys/${user.uid}`).set(!0),console.log(t.key),"granted"===await Notification.requestPermission()&&navigator.serviceWorker.ready.then(e=>{e.showNotification("Guldentop Veldwinkel",{body:`order geplaatst\nu kan deze afhalen met: ${t.key}`,link:"https://guldentopveldwinkel.be",data:t.key,actions:[{action:"location",title:"afhaallocatie"},{action:"checkOrder",title:"bekijk bestelling"}]}),this._clear()})}async _submit(){window.user||await window.signin(),await import("./checkout-prompt-606f194b.js");let e=document.createElement("checkout-prompt");document.body.appendChild(e);const t=await e.show(),o=[{collectionTime:t[0],payment:t[1],referentie:this.shadowRoot.querySelector('input[name="reference"]').value,displayName:user.displayName,email:user.email,phoneNumber:user.phoneNumber}];let s=[];for(const e of this.selectors)Array.isArray(e.selected)&&(s=[...s,...e.selected]);console.log(s);for(const e of s)if("string"==typeof e){const t=this.querySelector(`client-order-selector-item[is="${e}"]`).pieces;o.push({product:e,aantal:Number(t)})}o.length>1&&this.checkout(o)}_clear(){requestAnimationFrame(()=>{for(let e=0;e<this.selectors.length;++e)this.selectors[e].selected=[]})}_onSelected(e){const t=[];let o=[];for(const e of this.selectors)Array.isArray(e.selected)&&(o=[...o,...e.selected]);for(const e of o)if("string"==typeof e){const o=offerDisplay[e].price;t.push([Number(this.querySelector(`client-order-selector-item[is="${e}"]`).pieces),Number(o)])}const s=t.reduce((e,t)=>e+(t=t[0]*t[1]),0);this.shadowRoot.querySelector(".total").innerHTML=String(s)}get template(){return html`<style>
  :host {
    mixin(--css-column)
    overflow-y: auto;
    align-items: center;
  }
  summary, span {
    user-select: none;
    pointer-events: none;
  }
  custom-container {
    overflow-y: auto;
    overflow-x: hidden;
    pointer-events: auto;
    height: calc(100% - 54px);
  }
  .toolbar {
    box-sizing: border-box;
    padding: 24px;
    align-items: center;
    height: 52px;
    border-top: 1px solid #0000004f;
    max-width: 640px;
    width: 100%;
  }
  custom-svg-icon {
    cursor: pointer;
    pointer-events: auto;
  }
  input {
    margin-right: 8px;
    padding: 12px 0px 12px 6px;
    box-sizing: border-box;
    width: 42px;
    outline: none;
    border: none;
    background: transparent;
    pointer-events: auto;
  }
  input[name="reference"] {
    height: 48px;
    width: 100%;
    border-top: 1px solid #0000004f;
    padding: 12px 24px;
  }
  /* custom-selector {
    padding: 24px;
    box-sizing: border-box;
  } */
  apply(--css-row)
  apply(--css-center)
  apply(--css-flex)
</style>
<custom-container>
  <slot></slot>
  <input name="reference" type="text" placeholder="referentie of opmerking"></input>
  <span class="flex"></span>
</custom-container>

<span class="row toolbar">
  <custom-svg-icon icon="close"></custom-svg-icon>
  <span class="flex"></span>
  <top-price class="total">0</top-price>
  <span class="flex"></span>
  <custom-svg-icon icon="done"></custom-svg-icon>
</span>`}});
