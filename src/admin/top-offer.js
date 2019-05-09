import { ElementBase, define } from './../base.js';
import './top-product-item.js';

export default define(class TopOffer extends ElementBase {

  set value(value) {
    firebase.database().ref(`offers/${value}`).once('value').then(snap => {
      value = snap.val();
      for (const item of Object.keys(value)) {
        this.innerHTML += `${item}: <br>${value[item]}<br><br>`
      }
      // this.innerHTML = JSON.stringify(snap.val());
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
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
</style>
<slot></slot>`;
  }

})
