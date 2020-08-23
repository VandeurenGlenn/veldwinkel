export default define(class TopCollections extends ElementBase {
  
  get orders() {
    return globalThis.topstore.databases.get('orders');
  }
  
  get collectionKeys() {
    return globalThis.topstore.databases.get('collectionKeys');
  }
  
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._stamp = this._stamp.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    (async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          await import('./top-collection-item.js');
          globalThis.collectionKeys = await this.collectionKeys.get()
          globalThis.orders = await this.orders.get()
          
          window.collections = {};
          
          if (collectionKeys) for (const uid of Object.keys(collectionKeys)) {
            console.log(uid, collectionKeys[uid]);
            Object.keys(orders[collectionKeys[uid]]).map(order => {
              if (orders[collectionKeys[uid]][order][0].ready && !orders[collectionKeys[uid]][order][0].shipped) {
                orders[collectionKeys[uid]][order][0].user = collectionKeys[uid];
                collections[order] = orders[collectionKeys[uid]][order];
              }
            });
  
          }
          
          
          // firebase.database().ref(`users/${user.uid}/orders`).on('child_changed', this._stampOrders);
          // const snap = await firebase.database().ref(`users/${user.uid}/orders`).once('value');
          // window.orders = snap.val();
          // this._stamp();
          pubsub.subscribe('collectionKeys.added', async (key) => {
            
            globalThis.collectionKeys = await this.collectionKeys.get()
            globalThis.orders = await this.orders.get()
            Object.keys(orders[collectionKeys[key]]).map(order => {
              if (orders[collectionKeys[key]][order][0].ready && !orders[collectionKeys[key]][order][0].shipped) {
                orders[collectionKeys[key]][order][0].user = collectionKeys[key];
                collections[order] = orders[collectionKeys[key]][order];
              }
            });
            
            if (collections) for (const collection of Object.keys(collections)) {
              let item = this.querySelector(`[key=${collection}]`);
              if (!item) {
                item = document.createElement('top-collection-item');
                this.appendChild(item);
              }
              console.log({collection});
              item.value = { key: collection, order: collections[collection] };
            }
          })
          
          pubsub.subscribe('collectionKeys.remove', key => {
            this.removeChild(this.querySelector(`[key=${key}]`))
          })
          // firebase.database().ref('collectionKeys').on('child_changed', this._stamp);
        }
      });
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
    let index = 0;
    this.innerHTML = '';
    if (change) {
      window.collections = {}
      globalThis.orders = await this.orders.get()
      if (orders) for (const uid of Object.keys(orders)) {
        Object.keys(orders[uid]).map(order => {
          if (orders[uid][order][0].ready && !orders[uid][order][0].shipped) {
            orders[uid][order][0].user = uid;
            collections[order] = orders[uid][order];
          }
        });

      }
    }
    for (const collection of Object.keys(collections)) {
      console.log(collection);
      let item = this.querySelector(`key[${collection}]`);
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
