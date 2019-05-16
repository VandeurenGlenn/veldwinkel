import './../top-price.js';
import { Renderer, SelectorMixin } from './../base.js';

define(class ClientProductItem extends ElementBase {
  set key(value) {
    this.setAttribute('key', value);
  }
  set value({ name, image, price }) {
    if (image) this.shadowRoot.querySelector('img').src = image[Object.keys(image)[0]];
    this.render({ name, image, price });
  }
  constructor() {
    super();
  }
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }

  get template() {
    return html`
<style>
  :host {
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
    flex-direction: column;
    flex: 1 1;
    max-width: 50%;
    flex-basis: 50%;
    width: 50%;
    padding: 0 12px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 0;
    box-sizing: border-box;
    pointer-events: none;
  }
  .img {
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
</style>
<span class="container">
  <img class="img"></img>
  <span class="text name">${'name'}</span>
  <top-price class="text">${'price'}</top-price>
</span>
    `;
  }
});

export default define(class ClientProducts extends Renderer(SelectorMixin(HTMLElement)) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.attrForSelected = 'key';
    // get photo, name & price
    this._stamp();
    this.addEventListener('selected', () => {
      go('product', this.selected);
    });
  }

  async _stamp() {
    const snap = await firebase.database().ref(`offerDisplay`).once('value');
    const offers = snap.val();
    for (const [key, value] of Object.entries(offers)) {
      if (value.public) {
        const el = document.createElement('client-product-item');
        this.appendChild(el);
        el.key = key;
        el.value = value;
      }
    }
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    flex-flow: wrap;
    overflow-y: auto;
  }
</style>
<slot></slot>
    `;
  }
});
