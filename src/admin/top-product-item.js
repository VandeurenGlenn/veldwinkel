import { ElementBase, define } from './../base.js';
export default define(class TopProductItem extends ElementBase {
  set value({ name, stockCount, packageCount }) {
    this.name = name;
    this.stock = stockCount;
    this.inBox = packageCount;
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
    this.runJobQue = this.runJobQue.bind(this);
    this.jobs = [];
    
    
    window.addEventListener('online', this.runJobQue, false);
  }
  connectedCallback() {
    super.connectedCallback();
    // this.inBoxEl.addEventListener('change', this._onValue);
    this.stockEl.addEventListener('change', this._onValue);
  }
  
  async runJobQue() {
    if (this.jobs.length > 0 && navigator.onLine) {
      const [key, value] = this.jobs.shift();
      await firebase.database().ref(`products/${key}/stockCount`).set(value);
    }
    if (this.jobs.length > 0 && navigator.onLine) {
      this.runJobQue();
    }
  }

  _onValue() {
    this.jobs.push([this._key, this.stockEl.value])
    this.runJobQue();
    // const boxRef = firebase.database().ref(`products/${this._key}/aantal keren in pakket`);
    
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
  
  .name {
    width: 100%;
    max-width: 244px;
  }

  .flex {
    flex: 1;
  }
  .filler {
    min-width: 258px;
  }
  input {
    width: 100px;
    pointer-events: auto;
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
  <span class="row center filler">
    <input type="number" name="stock"></input>
    <span class="flex"></span>
    <p name="in-box"></p>
  </span>
</span>`;
  }
})
