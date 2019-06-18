import './../top-price.js';
import { Renderer, SelectorMixin } from './../base.js';
define(class ClientProductItem extends ElementBase {
  set key(value) {
    this.setAttribute('key', value);
  }
  set value({ name, price, thumb, placeholder }) {
    this.render({ name, price });
    const promises = [];
    const job = (key, data) => new Promise((resolve, reject) => {
      // data = await firebase.database().ref(`/images/${this.getAttribute('key')}/${key}`).once('value');
      // data = data.val();
      // const url = `${window.functionsRoot}/api/${key}/${this.getAttribute('key')}-${key}.webp`;
      // const options = {
      //   method: 'GET',
      //   mode: 'cors'
      // };
      // const response = await fetch(url, options);
      // data = await response.blob();
      // 
      // 
      // 
      // data = await readAsDataURL(data);
      // // console.log(data);
      // // console.log(data.blob());
      const img = document.createElement('img')
      img.onload = () => {
        this.shadowRoot.querySelector('img').src = `${window.functionsRoot}/api/${key}/${this.getAttribute('key')}-${key}.webp`
        resolve(key)
      };
      img.src = `${window.functionsRoot}/api/${key}/${this.getAttribute('key')}-${key}.webp`
      // return key
      // return { data, key };
    });
    
    promises.push(job('placeholder'), job('thumbm'));
    Promise.race(promises).then(async (keys) => {
      
      if (keys[0] !== 'thumbm') job('thumbm');
    });
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
    max-width: 25%;
    flex-basis: 25%;
    width: 25%;
    padding: 0 12px;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #eee;
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
    const promises = []
    for (const [key, value] of Object.entries(offers)) {
      if (value.public) {
        promises.push((() => {
          const el = document.createElement('client-product-item');
          this.appendChild(el);
          el.key = key;
          el.value = value;
        })())
      }
    }
    Promise.all(promises)
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
