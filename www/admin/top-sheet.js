import{d as e,E as t}from"./base-49bd4703.js";import"./top-product-item-0442c8d4.js";export default e(class TopSheet extends t{constructor(){super(),this._onClick=this._onClick.bind(this),this._onFabClick=this._onFabClick.bind(this)}connectedCallback(){super.connectedCallback(),(async()=>{const e=await firebase.database().ref("catalog").once("value");window.products=e.val(),this.stamp(),this.addEventListener("click",this._onClick),this.shadowRoot.querySelector(".fab").addEventListener("click",this._onFabClick)})()}_onClick(e){const t=e.path[0];"top-product-item"===t.localName&&(this.selected=t.getAttribute("data-route")),this.selected!==this.previousSelected&&(this.previousSelected&&this.querySelector(`[data-route="${this.selected}"]`).classList.remove("custom-selected"),t.classList.add("custom-selected"),this.previousSelected=this.selected,window.adminGo("product",this.selected))}_onFabClick(){console.log("e"),window.adminGo("add")}stamp(){let e=0;for(const t of products){let s=this.querySelector("index[index]");s||(s=document.createElement("top-product-item"),this.appendChild(s)),s.value=t,s.key=e,s.dataset.route=e,++e}}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
    background: #eee;
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
