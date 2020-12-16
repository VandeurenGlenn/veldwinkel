import './shop-cart-item.js';
import './custom-prompt.js'
import './../node_modules/@vandeurenglenn/custom-date/custom-date.js';
customElements.define('history-prompt', class HistoryPrompt extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          background: #00000063;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          pointer-events: none;
        }
        .row {
          display: flex;
          align-items: center;
        }
        .toolbar {
          width: 100%;
        }
        .flex {
          flex: 1;
        }
        /* @media (min-width: 1440px) {
          :host {
            position: absolute;
            transform: translateX(-50%);
            left: 54.3%;
          }
        } */
        
        :host([shown]) {
          opacity: 1;
          pointer-events: auto;
          z-index: 1000;
        }
        
        custom-prompt {
          width: 320px;
          height: 320px;
        }
      </style>
      
      <custom-prompt>
        <p>Het lijkt vrij leeg hier.</p>
        <br>
        <strong>winkelwagen herstellen naar vorige bestelling?</strong>
        <span class="flex"></span>

        <span class="row">
        
          <custom-svg-icon icon="close"></custom-svg-icon>
          <span class="flex"></span>
          <custom-svg-icon icon="done"></custom-svg-icon>
        </span>
      </custom-prompt>
      <!-- <span class="flex"></span> -->
    `;
  }
  show() {
    return new Promise((resolve, reject) => {
      this.shadowRoot.querySelector('[icon="close"]').addEventListener('click', () => {
        resolve(false)
      })
      this.shadowRoot.querySelector('[icon="done"]').addEventListener('click', () => {
        resolve(true)
      })
      this.setAttribute('shown', '')
      this.shadowRoot.querySelector('custom-prompt').show()  
    });
    
  }
  
  hide() {
    this.removeAttribute('shown')    
    this.shadowRoot.querySelector('custom-prompt').hide() 
  }
})

export default customElements.define('shop-cart', class ShopCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
      custom-prompt {
        pointer-events: none;
      }
        :host {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          background: #fff;
          z-index: 100;
        }
        .row {
          display: flex;
          align-items: center;
        }
        .toolbar {
          width: 100%;
        }
        .flex {
          flex: 1;
        }
        
        .price {
          display: flex;
          width: 88px;
          justify-content: flex-end;
        }
        
        h3, translated-string {
          padding: 24px 0;
          text-transform: capitalize;
          margin: 0;
        }
        .collection-times {
          max-width: 320px;
          width: 100%;
          height: 198px;
          padding: 0 0 44px 0;
        }
        .total-amount {
          padding: 64px 0 44px 0;
          height: 100%;          
        }
        .paypal {
          padding: 0 0 44px 0;
          height: 338px;
          width: 320px;
        }
        /* @media (min-width: 1440px) {
          :host {
            position: absolute;
            transform: translateX(-50%);
            left: 54.3%;
          }
        } */
      </style>
      <history-prompt></history-prompt>
      <custom-container>
        
        <slot></slot>
        <span class="column total-amount"><translated-string>Total</translated-string><custom-svg-icon icon="euro"></custom-svg-icon><span class="total"></span><span class="flex"></span></span>
        
        

          
        <span class="row" style="width: 100%;flex-flow: row wrap; justify-content: space-around; align-items: baseline;">
        <span class="column collection-times">
          <h3><translated-string>collection times</translated-string></h3>
          <custom-selector attr-for-selected="name" selected="tuesday">
            <custom-selectable-date name="tuesday"></custom-selectable-date>
            <custom-selectable-date name="friday"></custom-selectable-date>
          </custom-selector>
        </span>
        
        <span class="column paypal">
          <h3><translated-string>payment method</translated-string></h3>
          <slot name="paypal"></slot>
        </span>
        </span>
      </custom-container>
      
      <!-- <span class="row"> -->
      <!-- </span> -->
      <!-- <span class="flex"></span> -->
    `;
  }
  
  get button() {
    return this.shadowRoot.querySelector('top-button');
  }
  
  get historyPrompt() {
    return this.shadowRoot.querySelector('history-prompt')
  }
  
  set showHistory(value) {
    (async () => {
      let result
      if (value) {
        let items = localStorage.getItem('cart')
        items = JSON.parse(items)
        if (items && Object.keys(items).length === 0) return
        result = await this.historyPrompt.show()
        if (result) {
          let items = localStorage.getItem('cart')
          items = JSON.parse(items)
          if (items) {
            for (let item of Object.keys(items)) {
              this.add(items[item])
            }
          }
        }
        this.historyPrompt.hide()
      } else this.historyPrompt.hide()
      
      
    })()
  }
  
  connectedCallback() {
    globalThis.shoppingCart = globalThis.shoppingCart || {};
    globalThis.shoppingCart.add = globalThis.shoppingCart.add || this.add.bind(this);
    globalThis.shoppingCart.change = globalThis.shoppingCart.change || this.change.bind(this);
    globalThis.shoppingCart.remove = globalThis.shoppingCart.remove || this.remove.bind(this);
    globalThis.shoppingCart.items = globalThis.shoppingCart.items || this.items;
    this.items = {}
    this.dates = this.shadowRoot.querySelectorAll('custom-selectable-date');
    this.selectors = this.shadowRoot.querySelectorAll('custom-selector');
    
    (async () => {
      const snap = await firebase.database().ref('settings/hours').once('value')
      const { pickup, selfservice } = snap.val()
      
      this.dates[0].setAttribute('lang', 'nl');
      this.dates[1].setAttribute('lang', 'nl');
      this.dates[0].setAttribute('day', 'dinsdag');
      this.dates[1].setAttribute('day', 'vrijdag');
      this.dates[0].setAttribute('open', `${pickup.tuesday.from} - ${pickup.tuesday.to}`);
      this.dates[1].setAttribute('open', `${pickup.friday.from} - ${pickup.friday.to}`);
      this.dates[0].setAttribute('value', new Date().getTime());
      this.dates[1].setAttribute('value', new Date().getTime());
      this.dates[0]._date.next('dinsdag')
      this.dates[1]._date.next('vrijdag')
      
      const date = new Date()
      if (date.getDate() > this.dates[0]._date._date && date.getMonth() < this.dates[0]._date._date) {        
        this.dates[0]._date.next('dinsdag')
        this.dates[1]._date.next('vrijdag')
      }
    })()
    
    if (Array.from(this.querySelectorAll('shop-cart-item')).length === 0) this.showHistory = true
    const div = document.createElement('div')
    div.setAttribute('id', 'paypal-buttons')
    div.setAttribute('slot', 'paypal')
    
    this.appendChild(div)
    
    this._updatePaypalButtons()
    
    pubsub.subscribe('event.product', event => {
      
    })
  }
  
  async _updatePaypalButtons() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        paypal.Buttons({
          commit: true,
          application_context: {
            shipping_preference: 'NO_SHIPPING',
          },
          createOrder: (data, actions) => {
            return this._createOrder(actions)
          },
          onApprove: async (data, actions) => {
            // This function captures the funds from the transaction.
            return actions.order.capture().then(async details => {
              // This function shows a transaction success message to your buyer.
              // alert('Transaction completed by ' + details.payer.name.given_name);
              const products = []
              Object.keys(this.items).map(key => {
                products.push({key, count: Number(this.items[key].count)})
              })
              
              const selector = this.shadowRoot.querySelector('custom-selector')
              console.log({selector});
              console.log(this.items);
              const order = {
                collectionTime: [selector.selected, this.shadowRoot.querySelector(`[name="${selector.selected}"]`).value],
                products,
                id: details.id,
                payer: details.payer,
                status: details.status
              }
              const snap = await firebase.database().ref(`orders/${user.uid}`).push(order);
              // await firebase.database().ref(`orderKeys/${snap.key}`).set(user.uid);
              await firebase.database().ref(`orderKeys/${user.uid}`).push(snap.key);
              console.log(snap.key);
              // document.dispatchEvent(new CustomEvent('order-placed', { detail: snap.key }));
              const answer = await Notification.requestPermission();
              if (answer === 'granted') {
                navigator.serviceWorker.ready.then((registration) => {
                  registration.showNotification('Guldentop Veldwinkel', {
                    body: `order geplaatst
          u kan deze afhalen met: ${snap.key}`,
                    link: 'https://guldentopveldwinkel.be',
                    data: snap.key,
                    actions: [{
                      action: 'location',
                      title: 'afhaallocatie'
                    }, {
                      action: 'checkOrder',
                      title: 'bekijk bestelling'
                    }]
                  });
                });
              }
              Object.keys(this.items).forEach(key => this.remove(key))
              go('order', snap.key)
            });
          }
        }).render(this.querySelector('#paypal-buttons'))   
      }
    })
     
  }
  
  
  _submit() {
    shoppingCart.submit()
  }
  
  _calculateTotal() {
    const purchase_units = []
    // let items = localStorage.getItem('cart')
    // items = JSON.parse(items)
    for (const item of Object.keys(this.items)) {
      const price = this.items[item].price.replace(',', '.')
      purchase_units.push(Number(price) * Number(this.items[item].count))
    }
    const total = purchase_units.reduce((p, c) => {return p + Number(c)}, 0)
    
    return total
  }
  
  _createOrder(actions) {
    const value = this._calculateTotal()
    
    this.shadowRoot.querySelector('.total').innerHTML = value
    
    
    return actions.order.create({
      intent: 'CAPTURE',
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
      purchase_units: [{amount: { value }}]
    }) 
  }
  
  add(item) {
    console.log({item});
    if (!item.count) item.count = 1
    item.count = Number(item.count)
    let el = this.querySelector(`shop-cart-item[uid="${item.key}"]`)
    
    if (el) item.count += Number(el.count)
    else {
      el = document.createElement(`shop-cart-item`)
      this.appendChild(el)
    }
    
    el._stamp()
    el.value = item;
    let value = localStorage.getItem('cart')
    if (value) {
      value = JSON.parse(value)
    } else {
      value = {}
    }
    value[item.uid] = item
    localStorage.setItem('cart', JSON.stringify(value))
    this.showHistory = false
    
    this.items[item.uid] = item
    
    this.shadowRoot.querySelector('.total').innerHTML = this._calculateTotal()
  }
  
  change(item) {
    this.querySelector(`[uid="${item.uid}"]`).item = item;
    let value = localStorage.getItem('cart')
    if (value) {
      value = JSON.parse(value)
    } else {
      value = {}
    }
    value[item.uid] = item
    localStorage.setItem('cart', JSON.stringify(value))
    
    this.items[item.uid] = item
    
    this.shadowRoot.querySelector('.total').innerHTML = this._calculateTotal()
  }
  
  remove(uid) {
    this.removeChild(this.querySelector(`[uid="${uid}"]`))
    let value = localStorage.getItem('cart')
    if (value) {
      value = JSON.parse(value)
      delete value[uid]
    }
    localStorage.setItem('cart', JSON.stringify(value))
    if (Array.from(this.querySelectorAll('shop-cart-item')).length === 0) this.showHistory = true
    
    delete this.items[uid]
    this.shadowRoot.querySelector('.total').innerHTML = this._calculateTotal()
  }
  
});