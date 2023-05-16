import { define, ElementBase } from './../base.js';

export default define(class TopCollection extends ElementBase {

  set value({ user, uid }) {
    console.log(user, {uid});
    if (user && uid) {
      const order = collections[uid];
      console.log(order);
      this.order = order;
      this.orderLength = order.length;
      this.user = user;
      this.uid = uid;
      console.log({ info });
      this.innerHTML = `
      <span class="row">
        <h4 class="name">name</h4>
        <span class="flex"></span>
        <h4 class="name" slot="info">${order.payer.name.surname} ${order.payer.name.given_name}</h4>
      </span>
      <span class="row">
        <h4 class="name">email</h4>
        <span class="flex"></span>
        <h4 class="name">${order.payer.email_address}</h4>
      </span>
        ${order.products.map(item => {
          return `<span class="row" name="${item.key}">${item.key}<span class="flex" style="pointer-events: none;"></span>${item.count}</span>`
        }).join(' ')}
      `;
      // if ()
      // firebase.database().ref(`users/${user}/orders/${uid}`).once('value')
    }
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    (async () => {
      await import('./../top-button.js')
    })();

    this.addEventListener('click', this._onClick)
  }

  async _onClick(event) {
    const path = event.composedPath()
    if (path[0].classList.contains('confirm')) {
      await firebase.database().ref(`orders/${this.user}/${this.uid}/shipped`).set('true');
      await firebase.database().ref(`collectionKeys/${this.uid}`).remove();
      let orders = await firebase.database().ref(`orders/${this.user}`).once('value');
      orders = orders.val();
      const notShipped = Object.keys(orders).reduce((p, order) => {
        console.log(order);
        if (!orders[order].shipped) p+=1;
        return p;
      }, 0)
      if (notShipped === 0) await firebase.database().ref(`orderKeys/${this.user}`).set(null);
      adminGo('collections')
    }
    if (path[0].classList.contains('cancel')) adminGo('collections');
  }
  get template() {
    return html`<style>
  :host {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  ::slotted(*) {
    user-select: none;
    pointer-events: none;
  }
  apply(--css-flex)
  .toolbar {
    mixin(--css-row)
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    padding: 12px;
    align-items: center;
    height: 52px;
    border-top: 1px solid #0000004f;
  }
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  @media (min-width: 640px) {
    :host {
      align-items: center;
    }
    .container {
      align-items: center;
      justify-content: center;
      max-width: 640px;
    }
    .wrapper {
      max-height: 640px;
    }
  }
</style>

<span class="container">
  <slot name="info"></slot>
  <span class="wrapper">
    <slot style="pointer-events: none;"></slot>

    <span class="toolbar">
      <top-button class="cancel">cancel</top-button>
      <span class="flex"></span>
      <top-button class="confirm">confirm</top-button>
    </span>
  </span>
</span>`;
  }
})
