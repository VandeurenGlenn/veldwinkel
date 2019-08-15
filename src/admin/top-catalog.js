import { ElementBase, define } from './../base.js';
import './top-product-item.js';

export default define(class TopCatalog extends ElementBase {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onFabClick = this._onFabClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    (async () => {
      const snap = await firebase.database().ref('products').once('value');
      window.products = snap.val();
      this.stamp();
      this.addEventListener('click', this._onClick);
      this.shadowRoot.querySelector('.fab').addEventListener('click', this._onFabClick);
    })();
  }

  _onClick(e) {
    // this.selected =
    const target = e.path[0];
    if (target.localName === 'top-product-item') this.selected = target.getAttribute('data-route')
    if (this.selected !== this.previousSelected) {
      if (this.previousSelected) this.querySelector(`[data-route="${this.selected}"]`).classList.remove('custom-selected')
      target.classList.add('custom-selected');
      this.previousSelected = this.selected;
      window.adminGo('product', this.selected);
    }

  }

  _onFabClick() {
    console.log('e');
    window.adminGo('add');
  }

  stamp() {
    let index = 0;
    for (const product of products) {
      let item = this.querySelector('index[index]');
      if (!item) {
        item = document.createElement('top-product-item');
        this.appendChild(item);
      }
      item.value = product;
      item.key = index;
      item.dataset.route = index;
      ++index;
    }
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .flex {
    flex: 1;
  }
  header {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    width: 100%;
  }
  .name {
    min-width: 240px;
  }
  .fab {
    display: flex;
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 48px;
    min-width: 110px;
    border: 1px solid #888;
    border-radius: 28px;
    box-sizing: border-box;
    padding: 12px;
  }
  ::slotted(:nth-of-type(odd)) {
    background: #eee;
  }
</style>
<span class="fab">
  <custom-svg-icon icon="add"></custom-svg-icon>
  <span class="flex"></span>
  add
</span>

<header>
    <custom-svg-icon icon="filter-list"></custom-svg-icon>
    <span class="flex"></span>
    <custom-svg-icon icon="mode-edit"></custom-svg-icon>
    <custom-svg-icon icon="search"></custom-svg-icon>

</header>
<header>
  <h4 class="name">naam</h4>
  <span class="flex"></span>
  <h4>voorraad</h4>
  <span class="flex"></span>
  <h4>in pakket</h4>
</header>
<span class="container">
  <slot></slot>
</span>`;
  }
});
