import './../custom-container.js';
import './../top-price.js';

export default define(class ClientProduct extends ElementBase {
  get offerDisplay() {
    return window.topstore.databases.get('offerDisplay');
  }

  get offers() {
    return window.topstore.databases.get('offers');
  }
  
  get images() {
    return window.topstore.databases.get('images');
  }
  
  set value(value) {
    console.log(value);
    this._key = value;
    this.key = value;
  }
  set key(value) {
    ( async () => {
      const promises = [];
      
      const images = await this.images.get(value)
      const offer = await this.offers.get(value)
      const offerDisplay = await this.offerDisplay.get(value)
      const result = await Promise.all(promises);      
      if (images) {
        if (this.clientWidth > 320) {
          this.shadowRoot.querySelector('img').src = `https://ipfs.io/ipfs/${images[0]}`;
        } else {
          this.shadowRoot.querySelector('img').src = `https://ipfs.io/ipfs/${images['thumbm']}`;
        }
      }
      
      this.item = {...offer, ...offerDisplay};
      this.item.uid = value;
      const { name, description, price, photo, type, portion, pieces } = this.item;



      this.render({ name, description, price, type, portion, pieces });
    })();
  }
  constructor() {
    super();
    
    this._cartButtonClick = this._cartButtonClick.bind(this)
  }
  
  get cartButton() {
    return this.shadowRoot.querySelector('[icon="shopping-cart"]')
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.cartButton.addEventListener('click', this._cartButtonClick)
    if (this.item) this.render(this.item);
  }
  
  _cartButtonClick() {
    this.item.image = this.shadowRoot.querySelector('img').src;
    shoppingCart.add(this.item)
  }

  get template() {
    return html`
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
    <h4>${'name'}</h4>
    <summary>${'description'}</summary>
    <br>
    <span class="row">
      <top-price>${'price'}</top-price>
    </span>
  </section>
  <span class="flex"></span>
  <top-button icon="shopping-cart">add to cart</top-button>
</custom-container>
    `;
  }
});
