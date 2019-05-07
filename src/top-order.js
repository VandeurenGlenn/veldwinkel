import { define, ElementBase } from './base.js';

export default define(class TopOrder extends ElementBase {

  set value({ user, uid }) {
    console.log(user, uid);
    if (user && uid) {
      const order = orders[uid];
      const info = order.shift();
      this.order = order;
      this.orderLength = order.length;
      this.user = user;
      this.uid = uid;
      console.log({ info });
      this.innerHTML = `
      <h4 class="name" slot="info">${info.displayName}</h4>
      <h4 class="name" slot="info">${info.email}</h4>

      <custom-selector multi="true" selected="[]" attr-for-selected="name">
        ${order.map(item => {
          return `<span class="row selection" name="${item.product}">${item.product}<span class="flex" style="pointer-events: none;"></span>${item.aantal}</span>`
        }).join(' ')}
      </custom-selector>
      `;
      // if ()
      // firebase.database().ref(`users/${user}/orders/${uid}`).once('value')
    }
  }

  constructor() {
    super();
  }
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    (async () => {
      await import('./../top-button.js')
    })();

    this.addEventListener('click', async ({path}) => {
      if (path[0].classList.contains('confirm')) {
        const selected = this.querySelector('custom-selector').selected;
        console.log(selected);
        if (selected.length !== this.orderLength) {
          const answer = await confirm(`are you sure?\n it seem's you haven't selected all products,\n\nIf everyting is in stock press cancel\n\npress confirm if item is out of stock (users will see this in their order list)`)
          console.log(selected);

          if (answer === true) {

            let missing;
            if (selected.length === 0) missing = this.order;
            else {
              missing = [];
              this.order.map(o => {
                if (selected.indexOf(o.product) === -1) missing.push(o.product);
              })
            };
            firebase.database().ref(`users/${this.user}/orders/${this.uid}/0/missing`).set(missing);
            firebase.database().ref(`users/${this.user}/orders/${this.uid}/0/ready`).set('true');
            adminGo('orders')
          }
        } else {
          firebase.database().ref(`users/${this.user}/orders/${this.uid}/0/ready`).set('true');
          adminGo('orders')
        }
      }
      if (path[0].classList.contains('cancel')) adminGo('orders');
    })
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
