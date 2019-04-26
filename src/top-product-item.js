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
    this.stamp();
  }

  set stock(value) {
    this._stock = this.boolify(value) ? value : '0';
  }

  set inBox(value) {
    this._inBox = this.boolify(value) ? value : '0';
  }

  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
  }

  stamp() {
    if (this.name && this._inBox !== undefined && this._stock !== undefined) {
      this.render({ inBox: this._inBox, stock: this._stock, name: this.name});
    }
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
    return html`
<style>
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    height: 56px;
  }
  .flex {
    flex: 1;
  }
  .name {
    min-width: 240px;
  }
</style>
<h4 class="name">${'name'}</h4>
<span class="flex"></span>
<p>${'stock'}</p>
<span class="flex"></span>
<p>${'inBox'}</p>
    `;
  }
})
