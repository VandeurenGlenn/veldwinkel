import { define, ElementBase } from './../base.js';
import './top-order-item.js';

export default define(class TopOrders extends ElementBase {
  constructor() {
    super();
    this._stampOrders = this._stampOrders.bind(this);
    this._onClick = this._onClick.bind(this);
  }
  get orderKeys() {
    return window.topstore.databases.get('orderKeys');
  }
  get orders() {
    return window.topstore.databases.get('orders');
  }
  connectedCallback() {
    super.connectedCallback();
    // (async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          globalThis.gvw = globalThis.gvw || {}
          globalThis.orderKeys = await this.orderKeys.get();
          if(orderKeys && Object.keys(orderKeys).length === 0) globalThis.orderKeys = await this.orderKeys.get()
          // await this._stampOrders();
          pubsub.subscribe('orderKeys.added', async (key) => {
            console.log({key}, 'added');
            // console.log(await this.orders.get(key));
            // const user = await this.orderKeys.get(key);
            // console.log({user});
            // setTimeout(async () => {
              let orders = await this.orders.get(key)
              if (!globalThis.orders[key]) globalThis.orders[key] = {};
console.log({orders});
              if (!orders) return
              
              for (const order of Object.keys(orders)) {
                if (!orders[order].ready) {
                  let item = this.querySelector(`[data-route="${order}"]`)
                  if (!item) {
                    item = document.createElement('top-order-item');
                    this.appendChild(item);  
                  }                
                  orders[order].key = order;
                  orders[order].user = key;

                  globalThis.orders[key][order] = orders[order];
                  item.value = { key: order, order: orders[order] }
                }
              }
            // }, 1000);
            
          })
          
          pubsub.subscribe('orderKeys.remove', async (key) => {
            console.log({key});
            this.removeChild(this.querySelector(`[key=${key}]`))
          })
        }
      });
    // })();
    this.addEventListener('click', this._onClick);
    
    
  }
  _onClick(e) {
    // this.selected =
    
    const target = e.composedPath()[0];
    if (target.localName === 'top-order-item') this.selected = target.getAttribute('data-route');
    if (this.selected !== this.previousSelected) {
      if (this.previousSelected && this.querySelector(`[data-route="${this.previousSelected}"]`)) this.querySelector(`[data-route="${this.previousSelected}"]`).classList.remove('custom-selected');
      target.classList.add('custom-selected');
      this.previousSelected = this.selected;
      window.adminGo('order', { uid: this.selected, user: target.user });
    }
  }

  async _stampOrders() {
    // this.innerHTML = '';
    if (orderKeys) {
      for (const key of Object.keys(orderKeys)) {
        let orders = await this.orders.get(key)
        if (!globalThis.orders[key]) globalThis.orders[key] = {};

        for (const order of Object.keys(orders)) {
          if (!orders[order][0].ready) {
            const item = document.createElement('top-order-item');
            this.appendChild(item);
            orders[order][0].user = key;

            globalThis.orders[key][order] = orders[order];
            item.value = { key: order, order: orders[order] }
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
  
  ::slotted(:nth-of-type(odd)) {
    background: #38464e;
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
