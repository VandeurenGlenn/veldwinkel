import { define, ElementBase } from './../base.js';
import './top-order-item.js';

export default define(class TopOrders extends ElementBase {
  constructor() {
    super();
    this._stampOrders = this._stampOrders.bind(this);
    this._onClick = this._onClick.bind(this);
  }
  get orders() {
    return this.oadb;
  }
  connectedCallback() {
    super.connectedCallback();
    (async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          window.orders = {};
          // if (orders) {
          //   for (const uid of Object.keys(orders)) {
          //   // const snap = await firebase.database().ref(`users/${uid}/orders`).once('value');
          //   // let order = snap.val();
          //     Object.keys(order).map((o) => {
          //       order[o][0].user = uid;
          //     });
          //   // orders = { ...orders, ...order }
          //   }
          // }

          // window.orders = orders;
          firebase.database().ref(`orders`).on('child_changed', this._stampOrders);
          // const snap = await firebase.database().ref(`users/${user.uid}/orders`).once('value');
          // window.orders = snap.val();
          this._stampOrders();
        }
      });
    })();
    this.addEventListener('click', this._onClick);
  }
  _onClick(e) {
    // this.selected =
    const target = e.path[0];
    if (target.localName === 'top-order-item') this.selected = target.getAttribute('data-route');
    if (this.selected !== this.previousSelected) {
      if (this.previousSelected) this.querySelector(`[data-route="${this.previousSelected}"]`).classList.remove('custom-selected');
      target.classList.add('custom-selected');
      this.previousSelected = this.selected;
      window.adminGo('order', { uid: this.selected, user: target.user });
    }
  }

  async _stampOrders() {
    const snap = await firebase.database().ref(`orderKeys`).once('value');
    window.orderKeys = snap.val();
    this.innerHTML = '';
    if (orderKeys) {
      for (const key of Object.keys(orderKeys)) {
        let orders = await firebase.database().ref(`orders/${key}`).once('value');
        orders = orders.val();
        if (!window.orders[key]) window.orders[key] = {};

        for (const order of Object.keys(orders)) {
          if (!orders[order][0].ready) {
            const item = document.createElement('top-order-item');
            this.appendChild(item);
            orders[order][0].user = key;

            window.orders[key][order] = orders[order];

            item.value = { key: order, order: orders[order] };
          }
        }
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
});
