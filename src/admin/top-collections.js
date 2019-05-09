export default define(class TopCollections extends ElementBase {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._stamp = this._stamp.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    (async () => {
      if (user) {
        await import('./top-collection-item.js');
        window.collections = {};
        const snap = await firebase.database().ref(`users`).once('value');
        window.users = snap.val();
        if (users) for (const uid of Object.keys(users)) {
          const snap = await firebase.database().ref(`users/${uid}/orders`).once('value');
          let orders = snap.val();
          Object.keys(orders).map(order => {
            if (orders[order][0].ready && !orders[order][0].shipped) {
              orders[order][0].user = uid;
              collections[order] = orders[order];
            }
          });

        }
        // firebase.database().ref(`users/${user.uid}/orders`).on('child_changed', this._stampOrders);
        // const snap = await firebase.database().ref(`users/${user.uid}/orders`).once('value');
        // window.orders = snap.val();
        this._stamp();

        firebase.database().ref('users').on('child_changed', this._stamp);
      }
      this.addEventListener('click', this._onClick);
    })();
  }

  _onClick(e) {
    // this.selected =
    const target = e.path[0];
    if (target.localName === 'top-collection-item') this.selected = target.getAttribute('data-route')
    if (this.selected !== this.previousSelected) {
      if (this.previousSelected) this.querySelector(`[data-route="${this.selected}"]`).classList.remove('custom-selected')
      target.classList.add('custom-selected');
      this.previousSelected = this.selected;
      console.log(this.selected);
      window.adminGo('collection', {uid: this.selected, user: target.user});
    }

  }

  async _stamp(change) {
    console.log(change);
    let index = 0;
    console.log(collections);
    this.innerHTML = '';
    if (change) {
      const snap = await firebase.database().ref(`users`).once('value');
      window.users = snap.val();
      window.collections = {};
      if (users) for (const uid of Object.keys(users)) {
        const snap = await firebase.database().ref(`users/${uid}/orders`).once('value');
        let orders = snap.val();
        Object.keys(orders).map(order => {
          if (orders[order][0].ready && !orders[order][0].shipped) {
            orders[order][0].user = uid;
            collections[order] = orders[order];
          }
        });
      }
    }
    for (const collection of Object.keys(collections)) {
      console.log(collection);
      let item = this.querySelector('index[index]');
      if (!item) {
        item = document.createElement('top-collection-item');
        this.appendChild(item);
      }
      console.log({collection});
      item.value = { key: collection, order: collections[collection] };
      ++index;
    }
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    align-items: center;
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

</style>
<custom-container>
  <slot></slot>
<custom-container>`;
  }
});
