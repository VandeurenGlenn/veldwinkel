import"./base-8131728b.js";import"./custom-svg-icon-6e670944.js";import"./custom-container-df0870f4.js";import"./top-price-5d64c65c.js";export default define(class ClientProduct extends ElementBase{get offerDisplay(){return window.topstore.databases.get("offerDisplay")}get offers(){return window.topstore.databases.get("offers")}get images(){return window.topstore.databases.get("images")}set value(t){console.log(t),this._key=t,this.key=t}set key(t){(async()=>{const e=await this.images.get(t),i=await this.offers.get(t),s=await this.offerDisplay.get(t);await Promise.all([]);e&&(this.clientWidth>320?this.shadowRoot.querySelector("img").src=`https://ipfs.io/ipfs/${e[0]}`:this.shadowRoot.querySelector("img").src=`https://ipfs.io/ipfs/${e.thumbm}`),this.item={...i,...s},this.item.uid=t;const{name:o,description:r,price:a,photo:n,type:c,portion:p,pieces:d}=this.item;this.render({name:o,description:r,price:a,type:c,portion:p,pieces:d})})()}constructor(){super(),this._cartButtonClick=this._cartButtonClick.bind(this)}get cartButton(){return this.shadowRoot.querySelector('[icon="shopping-cart"]')}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.cartButton.addEventListener("click",this._cartButtonClick),this.item&&this.render(this.item)}_cartButtonClick(){this.item.image=this.shadowRoot.querySelector("img").src,shoppingCart.add(this.item)}get template(){return html`
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
