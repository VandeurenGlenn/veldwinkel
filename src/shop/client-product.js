import './../custom-container.js';
import './../top-price.js';

export default define(class ClientProduct extends ElementBase {
  get offers() {
    return window.topstore.databases.get('offers');
  }
  
  set value(value) {
    console.log(value);
    this._key = value;
    this.key = value;
  }
  set key(value) {
    ( async () => {
      
      const offer = await this.offers.get(value)    
      if (offer.image) {
        if (this.clientWidth > 320) {
          this.shadowRoot.querySelector('img').src = `https://guldentopveldwinkel.be/ipfs/${offer.image}`;
        }
      }
      
      this.item = {...offer};
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
    const prompt = document.createElement('custom-prompt')
    document.body.appendChild(prompt)
    
    prompt.innerHTML = `
    
    <span class="row center" slot="head">
      <h3 style="margin: 0;">Product added</h3>
      <span class="flex"></span>
      <custom-svg-icon icon="close"></custom-svg-icon>
    </span>
    
    <span class="flex"></span>
    
    <shop-cart-item></shop-cart-item>
    
    <span style="flex: 2;"></span>
    
    <span class="row">
      <span class="flex"></span>
      <top-icon-button icon="payment">checkout</top-icon-button>
      <span class="flex"></span>
    </span>
    `
    
    prompt.querySelector('shop-cart-item').value = this.item
    prompt.querySelector('[icon="payment"]').addEventListener('click', () => {
      go('cart')
      document.body.removeChild(prompt)
    })
    
    prompt.querySelector('[icon="close"]').addEventListener('click', () => {
      document.body.removeChild(prompt)
    })

    prompt.style.right = '56px'
    prompt.style.bottom = '56px'
    prompt.style.left = 'auto'
    prompt.style.top = 'auto'
    prompt.style.transform = 'translate(0, 0)'
    prompt.style.maxWidth = '320px'
    prompt.style.maxHeight = '320px'
    prompt.show()
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
  
  img {
    max-width: 480px !important;
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
