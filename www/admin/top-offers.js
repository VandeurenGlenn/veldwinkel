import{d as e,E as t}from"./base-49bd4703.js";import"./top-offer-item-00277eb9.js";export default e(class TopOffers extends t{get offerDisplay(){return window.topstore.databases.get("offerDisplay")}get offers(){return window.topstore.databases.get("offers")}get images(){return window.topstore.databases.get("images")}constructor(){super(),this._onClick=this._onClick.bind(this),this._onFabClick=this._onFabClick.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._onClick),this.shadowRoot.querySelector(".container").ondragover=(e=>{e.preventDefault()}),this.shadowRoot.querySelector(".container").ondrop=(e=>{e.preventDefault();var t=e.dataTransfer.getData("text");console.log(t);const s=this.querySelector(`[data-route="${t}"]`);console.log(s);const o=document.createElement("top-offer-item");if(console.log(e.target.index===s.index),e.target.index===s.index)return;this.removeChild(s),this.insertBefore(o,e.target),console.log(o),o.key=s.key,o.value=s.value,o.dataset.route=s.dataset.route,console.log(e);const a=Array.from(this.querySelectorAll("top-offer-item"));a.forEach(async(e,t)=>{e.index=t,await firebase.database().ref(`offerDisplay/${e.key}/index`).set(t)}),console.log(a)}),this.shadowRoot.querySelector(".fab").addEventListener("click",this._onFabClick),(async()=>{await import("./top-offer-item-00277eb9.js"),window.offerDisplay=await this.offerDisplay.get(),offerDisplay&&0===Object.keys(offerDisplay).length&&(window.offerDisplay=await this.offerDisplay.get()),await this.stamp()})(),globalThis.pubsub.subscribe("event.offers",async e=>{let t=this.querySelector(`[data-route=${e.key}]`);t||(t=document.createElement("top-offer-item"),this.appendChild(t)),"add"===e.type?(offers[e.key]||(offers[e.key]=await this.offers.get(e.key)),images[e.key]||(images[e.key]=await this.images.get(e.key)),offerDisplay[e.key]||(offerDisplay[e.key]=await this.offerDisplay.get(e.key)),t.key=e.key,t.value=e.value,t.dataset.route=e.key):"change"===e.type?t.value=e.value:"public"===e.type?t.public=e.value:"delete"===e.type&&(delete offers[e.key],delete offerDisplay[e.key],delete images[e.key],this.removeChild(t))})}_onClick(e){const t=e.path[0];"top-offer-item"===t.localName&&(this.selected=t.getAttribute("data-route")),this.selected!==this.previousSelected?(this.previousSelected&&this.querySelector(`[data-route="${this.selected}"]`).classList.remove("custom-selected"),t.classList.add("custom-selected"),this.previousSelected=this.selected,globalThis.adminGo("offer",this.selected)):"top-offer-item"===t.localName?globalThis.adminGo("offer",this.selected):t.classList.contains("fab")&&window.adminGo("add-offer")}_onFabClick(){}async stamp(){if(this.innerHTML="",window.offers||(window.offers={}),window.images||(window.images={}),offerDisplay){let e=[];for(const t of Object.keys(offerDisplay)){const s=offerDisplay[t].index;e[s]=offerDisplay[t],e[s].key=t}console.log(e);for(const{key:t}of e){offers[t]||(offers[t]=await this.offers.get(t)),images[t]||(images[t]=await this.images.get(t));let e=this.querySelector(`[data-route=${t}]`);e||((e=document.createElement("top-offer-item")).draggable=!0,e.ondragstart=(e=>{console.log(e),e.dataTransfer.setData("text",t)}),this.appendChild(e)),e.index=offerDisplay[t].index,e.key=t,e.value={...offerDisplay[t],...offers[t],image:{...images[t]}},e.dataset.route=t}}}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    user-select: none;
  }
  .flex {
    flex: 1;
  }
  header {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    width: 100%;
  }
  .name {
    min-width: 240px;
  }
  .fab {
    display: flex;
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 48px;
    min-width: 110px;
    border: 1px solid #888;
    border-radius: 28px;
    box-sizing: border-box;
    padding: 12px;
  }
  ::slotted(:nth-of-type(odd)) {
    background: #38464e;
  }
</style>
<span class="fab">
  <custom-svg-icon icon="add"></custom-svg-icon>
  <span class="flex"></span>
  add
</span>

<header>
  <custom-svg-icon icon="filter-list"></custom-svg-icon>
  <span class="flex"></span>
  <custom-svg-icon icon="mode-edit"></custom-svg-icon>
  <custom-svg-icon icon="search"></custom-svg-icon>
</header>
<header>
  <h4 class="name">naam</h4>
  <span class="flex"></span>
  <h4>voorraad</h4>
  <span class="flex"></span>
  <h4>in pakket</h4>
</header>
<span class="container">
  <slot></slot>
</span>`}});
