import{R as e,a as t}from"./base-8131728b.js";import"./custom-svg-icon-6e670944.js";import"./top-price-5d64c65c.js";define(class ClientProductItem extends ElementBase{set key(e){this.setAttribute("key",e)}get img(){return this.shadowRoot.querySelector("img")}get images(){return window.topstore.databases.get("images")}set value({name:e,price:t,thumb:i,placeholder:s}){this.render({name:e,price:t}),(async()=>{const e=await this.images.get(this.getAttribute("key"));e&&(this.clientWidth>320?this.img.src=`https://guldentopveldwinkel.be/ipfs/${e[0]}`:this.img.src=`https://guldentopveldwinkel.be/ipfs/${e.thumbm}`)})()}constructor(){super()}connectedCallback(){super.connectedCallback&&super.connectedCallback()}get template(){return html`
<style>
  :host {
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
    flex-direction: column;
    flex: 1 1;
    max-width: 25%;
    flex-basis: 25%;
    width: 25%;
    padding: 0 12px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;   
    /* max-height: calc(100% / 1.92);
    min-height: calc(100% / 2.4);
    height: 100%; */
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 0;
    box-sizing: border-box;
    pointer-events: none;
    border-radius: 30px;
  }
  .img {
    border-radius: 30px;
    max-height: 250px;
    max-width: 100%;
    background: var(--product-photo);
    min-height: 146px;
  }
  .img::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
  .text {
    padding-top: 12px;
    font-weight: bold;
    font-size: 13px;
    line-height: 19.5px;
  }
  .name {
    font-weight: 700;
  }
  @media (max-width: 960px) {
    :host {
      max-width: 50%;
      flex-basis: 50%;
      width: 50%;
    }
  }
  @media (min-width: 1400px) {
    :host {
      max-width: calc(100% / 5);
      flex-basis: calc(100% / 5);
      width: calc(100% / 5);
    }
  }
  @media (min-width: 1920px) {
    :host {
      max-width: calc(100% / 6);
      flex-basis: calc(100% / 6);
      width: calc(100% / 6);
    }
  }
</style>
<span class="container">
  <img class="img"></img>
  <span class="text name">${"name"}</span>
  <top-price class="text">${"price"}</top-price>
</span>
    `}});export default define(class ClientProducts extends(e(t(HTMLElement))){constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.attrForSelected="key",this._stamp(),this.addEventListener("selected",()=>{go("product",this.selected)})}get offerDisplay(){return window.topstore.databases.get("offerDisplay")}get offers(){return window.topstore.databases.get("offers")}async _stamp(){window.offerDisplay=await this.offerDisplay.get(),offerDisplay&&0===Object.keys(offerDisplay).length&&(window.offerDisplay=await this.offerDisplay.get());const e=[];for(const t of Object.keys(offerDisplay)){const i=offerDisplay[t].index;e[i]=offerDisplay[t],e[i].key=t}for(let{key:t}of e)if(offerDisplay[t].public){const e=document.createElement("client-product-item");e.setAttribute("key",t),this.appendChild(e),e.value=offerDisplay[t]}}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    flex-flow: wrap;
    overflow-y: auto;
  }
</style>
<slot></slot>
    `}});
