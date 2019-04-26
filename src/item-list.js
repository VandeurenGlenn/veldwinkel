import { define, ElementBase } from './base.js';

export default define(class ItemList extends ElementBase {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    (async () => {
      const snap = await firebase.database().ref('products').once('value');
      window.products = snap.val();
      for (const product of products) {

      }
    })();
  }
  get template() {
    return html`
<style></style>
<slot></slot>
    `;
  }
})
