import { ElementBase, define } from './base.js';
export default define(class TopProductItem extends ElementBase {
  set value(value) {
    this.name = value['groentenEnVarieteit'] || 'missing name';
    this.stock = value['aantal porties groenten in voorraad'];
    this.inBox = value['aantal keren in pakket'];
    const title = this.name;
    this.name = this.name.slice(0, 31);
    if (this.name.length < title.length) {
      this.name += '...';
      this.shadowRoot.querySelector('.name').setAttribute('title', title);
    }
    // this.stamp();
    this.render({name: this.name})
  }

  set key(value) {
    this._key = value;
  }

  get stockEl() {
    return this.shadowRoot.querySelector('input[name="stock"]');
  }

  get inBoxEl() {
    return this.shadowRoot.querySelector('p[name="in-box"]');
  }

  set stock(value) {
    this._stock = this.boolify(value) ? value : '0';
    this.stockEl.value = this._stock;
  }

  set inBox(value) {
    this._inBox = this.boolify(value) ? value : '0';
    this.inBoxEl.innerHTML = this._inBox;
  }

  constructor() {
    super();
    this._onValue = this._onValue.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    // this.inBoxEl.addEventListener('change', this._onValue);
    this.stockEl.addEventListener('change', this._onValue);
  }

  _onValue() {
    const stockRef = firebase.database().ref(`products/${this._key}/aantal porties groenten in voorraad`);
    // const boxRef = firebase.database().ref(`products/${this._key}/aantal keren in pakket`);
    stockRef.set(this.stockEl.value);
    // boxRef.set(this.inBoxEl.value);
    // firebase.database().ref(`products/${this._name}`)
    // this.inBoxEl.value
    // this.stockEl.value
  }

  boolify(value) {
    switch (value) {
      case '':
      case 0:
      case null:
      case undefined:
      case false:
        return false;
        break;
      default:
        return true;
    }
  }

  get template() {
    return html`<style>
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    height: 112px;
    pointer-events: auto;
    cursor: pointer;
  }
  
  .flex {
    flex: 1;
  }
  .filler {
    display: block;
    min-width: 240px;
  }
  input {
    width: 100px;
  }
  h4, p, span {
    pointer-events: none;
  }
  apply(--css-row)
  apply(--css-center)
</style>

<span class="row">
  <h4 class="name center">${'name'}</h4>
  <span class="flex"></span>
</span>
<span class="row center">
  <span class="filler"></span>
  <span class="flex"></span>
  <input type="number" name="stock"></input>
  <span class="flex"></span>
  <p name="in-box"></p>
</span>`;
  }
})
