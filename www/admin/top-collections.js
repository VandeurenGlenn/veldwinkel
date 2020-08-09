export default define(class TopCollections extends ElementBase{get orders(){return globalThis.topstore.databases.get("orders")}get collectionKeys(){return globalThis.topstore.databases.get("collectionKeys")}constructor(){super(),this._onClick=this._onClick.bind(this),this._stamp=this._stamp.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),(async()=>{firebase.auth().onAuthStateChanged(async e=>{if(e){if(await import("./top-collection-item.js"),globalThis.collectionKeys=await this.collectionKeys.get(),globalThis.orders=await this.orders.get(),window.collections={},collectionKeys)for(const e of Object.keys(collectionKeys))console.log(e,collectionKeys[e]),Object.keys(orders[collectionKeys[e]]).map(o=>{orders[collectionKeys[e]][o][0].ready&&!orders[collectionKeys[e]][o][0].shipped&&(orders[collectionKeys[e]][o][0].user=collectionKeys[e],collections[o]=orders[collectionKeys[e]][o])});pubsub.subscribe("collectionKeys.added",async e=>{globalThis.collectionKeys=await this.collectionKeys.get(),globalThis.orders=await this.orders.get(),Object.keys(orders[collectionKeys[e]]).map(o=>{if(orders[collectionKeys[e]][o][0].ready&&!orders[collectionKeys[e]][o][0].shipped){orders[collectionKeys[e]][o][0].user=collectionKeys[e],collections[o]=orders[collectionKeys[e]][o];let t=this.querySelector(`[key=${collection}]`);t||(t=document.createElement("top-collection-item"),this.appendChild(t)),t.value={key:e,order:collections[e]}}})}),pubsub.subscribe("collectionKeys.remove",e=>{this.removeChild(this.querySelector(`[key=${e}]`))})}}),this.addEventListener("click",this._onClick)})()}_onClick(e){const o=e.path[0];"top-collection-item"===o.localName&&(this.selected=o.getAttribute("data-route")),this.selected!==this.previousSelected&&(this.previousSelected&&this.querySelector(`[data-route="${this.selected}"]`).classList.remove("custom-selected"),o.classList.add("custom-selected"),this.previousSelected=this.selected,console.log(this.selected),window.adminGo("collection",{uid:this.selected,user:o.user}))}async _stamp(e){if(this.innerHTML="",e&&(window.collections={},globalThis.orders=await this.orders.get(),orders))for(const e of Object.keys(orders))Object.keys(orders[e]).map(o=>{orders[e][o][0].ready&&!orders[e][o][0].shipped&&(orders[e][o][0].user=e,collections[o]=orders[e][o])});for(const e of Object.keys(collections)){console.log(e);let o=this.querySelector(`key[${e}]`);o||(o=document.createElement("top-collection-item"),this.appendChild(o)),console.log({collection:e}),o.value={key:e,order:collections[e]}}}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    align-items: center;
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

</style>
<custom-container>
  <slot></slot>
<custom-container>`}});
