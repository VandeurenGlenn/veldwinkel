import{d as e,E as t}from"./base-49bd4703.js";e(class TopOrderItem extends t{set value({key:e,order:t}){console.log(t),this.setAttribute("data-route",e),this.user=t[0].user,this.reference=t[0],this.reference.ready&&this.setAttribute("ready",""),this.name=this.reference.displayName;const s=t.length-1;this.render({name:this.name,total:s,key:e.slice(e.length-6,e.length)}),this.setAttribute("key",e)}constructor(){super()}boolify(e){switch(e){case"":case 0:case null:case void 0:case!1:return!1;default:return!0}}get template(){return html`<style>
  :host {
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    height: 96px;
    pointer-events: auto;
    cursor: pointer;
    padding: 24px 24px;
    box-sizing: border-box;
    mixin(--css-column)
  }

  .flex {
    flex: 1;
  }
  .flex2 {
    flex: 2;
  }
  .filler {
    display: block;
    min-width: 240px;
  }
  input {
    width: 100px;
  }
  h4, p, span {
    margin: 0;
    pointer-events: none;
  }
  
  .row {
    padding-top: 6px;
    display: flex;
    mixin(--css-center)
    width: 100%;
  }

  :host([ready]) {
    background: #8BC34A;
  }
</style>
<h4>${"name"}</h4>
<span class="row">
  <h4>${"key"}</h4>
  <span class="flex"></span>
  <h4>${"total"}</h4>
</span>

`}});export default e(class TopOrders extends t{constructor(){super(),this._stampOrders=this._stampOrders.bind(this),this._onClick=this._onClick.bind(this)}get orderKeys(){return window.topstore.databases.get("orderKeys")}get orders(){return window.topstore.databases.get("orders")}connectedCallback(){super.connectedCallback(),firebase.auth().onAuthStateChanged(async e=>{e&&(globalThis.orders=globalThis.orders||{},globalThis.orderKeys=await this.orderKeys.get(),orderKeys&&0===Object.keys(orderKeys).length&&(globalThis.orderKeys=await this.orderKeys.get()),pubsub.subscribe("orderKeys.added",async e=>{console.log({key:e},"added");const t=await this.orderKeys.get(e);console.log({user:t}),setTimeout(async()=>{let e=await this.orders.get(t);e=await this.orders.get(t),e=await this.orders.get(t),globalThis.orders[t]||(globalThis.orders[t]={});for(const s of Object.keys(e))if(!e[s][0].ready){let r=this.querySelector(`[data-route="${s}"]`);r||(r=document.createElement("top-order-item"),this.appendChild(r)),e[s][0].user=t,globalThis.orders[t][s]=e[s],r.value={key:s,order:e[s]}}},1e3)}),pubsub.subscribe("orderKeys.remove",async e=>{console.log({key:e}),this.removeChild(this.querySelector(`[key=${e}]`))}))}),this.addEventListener("click",this._onClick)}_onClick(e){const t=e.path[0];"top-order-item"===t.localName&&(this.selected=t.getAttribute("data-route")),this.selected!==this.previousSelected&&(this.previousSelected&&this.querySelector(`[data-route="${this.previousSelected}"]`).classList.remove("custom-selected"),t.classList.add("custom-selected"),this.previousSelected=this.selected,window.adminGo("order",{uid:this.selected,user:t.user}))}async _stampOrders(){if(orderKeys)for(const e of Object.keys(orderKeys)){let t=await this.orders.get(e);globalThis.orders[e]||(globalThis.orders[e]={});for(const s of Object.keys(t))if(!t[s][0].ready){const r=document.createElement("top-order-item");this.appendChild(r),t[s][0].user=e,globalThis.orders[e][s]=t[s],r.value={key:s,order:t[s]}}}}get template(){return html`<style>
  :host {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .container {
    width: 100%;
  }
  ::slotted(span) {
    mixin(--css-column)

    min-height: 56px;
    height: 56px;
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  
  ::slotted(:nth-of-type(odd)) {
    background: #38464e;
  }
  @media (min-width: 640px) {
    :host {
      align-items: center;
    }
    .container {
      max-width: 640px;
    }
  }
</style>
<span class="container"><slot></slot></span>`}});
