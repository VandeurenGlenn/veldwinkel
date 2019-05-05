import { define, ElementBase } from './base.js';

export default define(class TopOrder extends ElementBase {

  set value({ user, uid }) {
    if (user && uid) {
      firebase.database().ref(`users/${user}/orders/${uid}`).once('value')
      .then(snap => {
        window.order = snap.val();

        this.innerHTML = '';
        if (order) {
          console.log(order);
          // const item = document.createElement('span');
          // item.innerHTML = `<span style="display: flex;">${orders[order][0].referentie}<span style="flex"></span>${order}<span style="flex: 1;"></span>producten: ${orders[order].length - 1}</span>`;
          // this.appendChild(item);
        }
      });
    }
  }

  constructor() {
    super();
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
