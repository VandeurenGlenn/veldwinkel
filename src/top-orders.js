import { define, ElementBase } from './base.js';

export default define(class TopOrders extends ElementBase {
  constructor() {
    super();
    this._stampOrders = this._stampOrders.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    (async () => {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          let orders = [];
          const snap = await firebase.database().ref(`users`).once('value');
          console.log(snap);
          window.users = snap.val();
          console.log({users});
          for (const uid of Object.keys(users)) {
            const snap = await firebase.database().ref(`users/${uid}/orders`).once('value');
            orders = { ...orders, ...snap.val() }
          }

          window.orders = orders;
          // firebase.database().ref(`users/${user.uid}/orders`).on('child_changed', this._stampOrders);
          // const snap = await firebase.database().ref(`users/${user.uid}/orders`).once('value');
          // window.orders = snap.val();
          this._stampOrders();
        }
      });
    })();
  }
  _stampOrders() {
    this.innerHTML = '';
    if (orders) {
      for (const order of Object.keys(orders)) {
        const item = document.createElement('span');
        item.innerHTML = `<span style="display: flex;">${orders[order][0].referentie}<span style="flex"></span>${order}<span style="flex: 1;"></span>producten: ${orders[order].length - 1}</span>`;
        this.appendChild(item);
      }
    }
  }
  get template() {
    return html`<style>
  :host {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .container {
    width: 100%;
  }
  ::slotted(span) {
    mixin(--css-column)

    min-height: 56px;
    height: 56px;
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  @media (min-width: 640px) {
    :host {
      align-items: center;
    }
    .container {
      max-width: 640px;
    }
  }
</style>
<span class="container"><slot></slot></span>`;
  }
})
