export default define(class OrderList extends ElementBase {
  constructor() {
    super();
    this._stampOrders = this._stampOrders.bind(this);
    this._onClick = this._onClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    (async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        await import('./order-list-item')
        if (user) {
          firebase.database().ref(`orders/${user.uid}`).on('child_changed', this._stampOrders);
          const snap = await firebase.database().ref(`orders/${user.uid}`).once('value');
          window.orders = snap.val();

          // if (location.hash === '#order/latest') go('order', Object.keys(orders)[0]);
          await this._stampOrders();
          this.addEventListener('click', this._onClick, true)
        }
      });
    })();
  }
  _onClick(e) {
    if (e.path[0].localName === 'order-list-item') {
      console.log(e.path[0].dataset.key);
      go('order', e.path[0].dataset.key)
    };
  }
  async _stampOrders() {
    if (orders) {
      for (const order of Object.keys(orders)) {
        let el;
        el = this.querySelector(`[data-key="${order}"]`);
        if (!el) {
          el = document.createElement('order-list-item')
          this.appendChild(el);
        }
        el.value = order;
      }
    }
  }
  get template() {
    return html`
<style>
  * {
    pointer-events: none;
    user-select: none;
  }
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
