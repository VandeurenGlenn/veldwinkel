import './../top-price.js';
import { Renderer, SelectorMixin } from './../base.js';
define(class ClientProductItem extends ElementBase {
  set key(value) {
    this.setAttribute('key', value);
  }
  get img() {
    return this.shadowRoot.querySelector('img');
  }
  get images() {
    return window.topstore.databases.get('images');
  }
  set value({ name, price, thumb, placeholder }) {
    this.render({ name, price });
    (async () => {
      const images = await this.images.get(this.getAttribute('key'))
      if (images) {
        if (this.clientWidth > 640) {
          this.img.src = `https://guldentopveldwinkel.be/ipfs/${images[0]}`;
        } else {
          this.img.src = `https://guldentopveldwinkel.be/ipfs/${images['thumbm']}`;
        }
      }
    })();    
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
    padding:0 0 24px 0;
    box-sizing: border-box;
    pointer-events: none;
    border-radius: 30px;border: 1px solid #eee;
  }
  .img {
    border-radius: 30px;
    max-height: 224px;
    max-width: 224px;
    /* max-height: 214px;
max-width: 214px; */
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
  @media (min-width: 960px) {
    :host {
      max-width: 50%;
      flex-basis: 50%;
      width: 50%;
    }
    .img {
       max-width: 420px;
       max-height: 420px;  
    }
  }
  @media (min-width: 1200px) {
    :host {
      max-width: calc(100% / 3);
      flex-basis: calc(100% / 3);
      width: calc(100% / 3);
    }
  }
  @media (min-width: 1400px) {
    :host {
      max-width: calc(100% / 4);
      flex-basis: calc(100% / 4);
      width: calc(100% / 4);
    }
  }
  @media (min-width: 1920px) {
    :host {
      max-width: calc(100% / 5);
      flex-basis: calc(100% / 5);
      width: calc(100% / 5);
    }
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
  
  get offerDisplay() {
    return window.topstore.databases.get('offerDisplay');
  }

  get offers() {
    return window.topstore.databases.get('offers');
  }


  async _stamp() {
    window.offerDisplay = await this.offerDisplay.get();
    if(offerDisplay && Object.keys(offerDisplay).length === 0) window.offerDisplay = await this.offerDisplay.get()
    const _offerDisplay = []
    for (const offer of Object.keys(offerDisplay)) {
      const index = offerDisplay[offer].index
      _offerDisplay[index] = offerDisplay[offer]
      _offerDisplay[index].key = offer
    }
    _offerDisplay
    for (let {key} of _offerDisplay) {
      if (offerDisplay[key].public) {
        const el = document.createElement('client-product-item');
        el.setAttribute('key', key);
        this.appendChild(el);
        el.value = offerDisplay[key];
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
