import"./selector-mixin-86543087.js";import"./base-76fe9a2c.js";import"./select-mixin-bf4ecf3c.js";import"./custom-svg-icon-6e670944.js";import"./custom-container-baf539bd.js";import"./top-price-6bc08ed1.js";export default define(class ClientProduct extends ElementBase{get offerDisplay(){return window.topstore.databases.get("offerDisplay")}get offers(){return window.topstore.databases.get("offers")}get images(){return window.topstore.databases.get("images")}set value(t){console.log(t),this._key=t,this.key=t}set key(t){(async()=>{const e=await this.images.get(t),s=await this.offers.get(t),o=await this.offerDisplay.get(t);await Promise.all([]);e&&(this.clientWidth>320?this.shadowRoot.querySelector("img").src=`https://guldentopveldwinkel.be/ipfs/${e[0]}`:this.shadowRoot.querySelector("img").src=`https://guldentopveldwinkel.be/ipfs/${e.thumbm}`),this.item={...s,...o},this.item.uid=t;const{name:i,description:n,price:a,photo:r,type:c,portion:p,pieces:l}=this.item;this.render({name:i,description:n,price:a,type:c,portion:p,pieces:l})})()}constructor(){super(),this._cartButtonClick=this._cartButtonClick.bind(this)}get cartButton(){return this.shadowRoot.querySelector('[icon="shopping-cart"]')}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.cartButton.addEventListener("click",this._cartButtonClick),this.item&&this.render(this.item)}_cartButtonClick(){this.item.image=this.shadowRoot.querySelector("img").src,shoppingCart.add(this.item);const t=document.createElement("custom-prompt");document.body.appendChild(t),t.innerHTML='\n    \n    <span class="row center" slot="head">\n      <h3 style="margin: 0;">Product added</h3>\n      <span class="flex"></span>\n      <custom-svg-icon icon="close"></custom-svg-icon>\n    </span>\n    \n    <span class="flex"></span>\n    \n    <shop-cart-item></shop-cart-item>\n    \n    <span style="flex: 2;"></span>\n    \n    <span class="row">\n      <span class="flex"></span>\n      <top-icon-button icon="payment">checkout</top-icon-button>\n      <span class="flex"></span>\n    </span>\n    ',t.querySelector("shop-cart-item").value=this.item,t.querySelector('[icon="payment"]').addEventListener("click",()=>{go("cart"),document.body.removeChild(t)}),t.querySelector('[icon="close"]').addEventListener("click",()=>{document.body.removeChild(t)}),t.style.right="56px",t.style.bottom="56px",t.style.left="auto",t.style.top="auto",t.style.transform="translate(0, 0)",t.style.maxWidth="320px",t.style.maxHeight="320px",t.show()}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    font-size: 18px;
    --svg-icon-size: 18px;
  }

  .row {
    mixin(--css-row)
    width: 100%;
  }
  summary {
    width: 100%;
  }
  top-button {
    cursor: pointer;
    pointer-events: auto;
    text-transform: uppercase;
    border: 1px solid #38464e;
    border-radius: 14px;
  }
  h4 {
    font-size: 18px;
    text-transform: uppercase;
  }
  img {
    border-radius: 30px;
  }
  apply(--css-flex)
  apply(--css-column)
  .column {
    width: 100%;
    max-width: 480px;
  }
  @media (max-width: 480px) {
    img {
      width: 100%;
    }
  }
  @media (max-height: 1080px) {    
    custom-container {
      padding-bottom: 0;
    }
  }
  @media (max-width: 720px) {
    section {
      padding: 0 12px;
    }
    summary {      
      max-width: 480px;
    }
    top-icon-button {
      position: fixed;
      bottom: 0;
      height: 54px;
      left: 0;
      right: 0;
      --top-icon-button-border-radius-right: 0;
      --top-icon-button-border-radius-left: 0;
    }
  }
  
  img {
    max-width: 480px !important;
  }
  
</style>
<custom-container>
  <img></img>
  <br>
  <section class="column">
    <h4>${"name"}</h4>
    <summary>${"description"}</summary>
    <br>
    <span class="row">
      <top-price>${"price"}</top-price>
    </span>
  </section>
  <span class="flex"></span>
  <top-button icon="shopping-cart">add to cart</top-button>
</custom-container>
    `}});
