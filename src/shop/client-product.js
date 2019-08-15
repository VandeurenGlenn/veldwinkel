import './../custom-container.js';

export default define(class ClientProduct extends ElementBase {
  set value(value) {
    console.log(value);
    this._key = value;
    this.key = value;
  }
  set key(value) {
    console.log(value);
    ( async () => {
      firebase.database().ref(`images/${value}`).once('value').then(images => {
        images = images.val();
        if (images) {
          for (const img of Object.keys(images)) {
            if (img !== 'thumb' && img !== 'timestamp') {
              if (images[img]) this.shadowRoot.querySelector('img').src = `${functionsRoot}/api/thumb/${images[img]}`;
            }
          }
        }
      });
      let snap = await firebase.database().ref(`offers/${value}`).once('value');
      snap = snap.val();
      let snapd = await firebase.database().ref(`offerDisplay/${value}`).once('value');
      snapd = snapd.val();
      this.item = {...snapd, ...snap};
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
  }

  .row {
    padding-top: 48px;
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
  }
  h5 {
    font-size: 24px;
  }
  img {
    border-radius: 30px;
  }
  apply(--css-flex)

  @media (max-width: 720px) {
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
  <section class="column">
    <span class="row">
      <h4>${'name'}</h4>
      <span class="flex"></span>
      <top-price>${'price'}</top-price>
    </span>
    <summary>${'description'}</summary>
  </section>
  <span class="flex"></span>
  <top-button icon="shopping-cart">add to cart</top-button>
</custom-container>
    `;
  }
});
