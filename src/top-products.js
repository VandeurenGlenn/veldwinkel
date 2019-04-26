import { ElementBase, define } from './base.js';
import './top-product-item.js';

export default define(class TopProducts extends ElementBase {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    console.log('connectedCallback');
    (async () => {
      const snap = await firebase.database().ref('products').once('value');
      window.products = snap.val();
      this.stamp();
    })();
  }

  stamp() {
    let index = 0;
    for (const product of products) {
      console.log(product);
      let item = this.querySelector('index[index]');
      if (!item) {
        item = document.createElement('top-product-item');
        this.appendChild(item);
      }
      item.value = product;
      // console.log(item);
      // index++;
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
</style>
<header>
  <custom-svg-icon icon="filter-list"></custom-svg-icon>
  <span class="flex"></span>
  <custom-svg-icon icon="search"></custom-svg-icon>
</header>
<header>
  <h4>name</h4>
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
