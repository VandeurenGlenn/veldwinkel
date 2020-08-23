import './shop-cart-item.js';
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
          z-index: 100;
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
  }
})

export default customElements.define('shop-cart', class ShopCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
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
        <span class="row toolbar">
        <strong>product</strong>
          <!-- <translated-string>products</translated-string> -->
          <span class="flex"></span>
          <strong>aantal</strong>
          
          <strong class="price">prijs</strong>
        </span>
        <slot></slot>
      </custom-container>
      
      <span class="row">
        <span class="flex"></span>
        <top-button>checkout</top-button>
        <span class="flex"></span>
      </span>
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
    
    this.button.addEventListener('click', this._submit)
    
    if (Array.from(this.querySelectorAll('shop-cart-item')).length === 0) this.showHistory = true
  }
  _submit() {
    shoppingCart.submit()
  }
  
  add(item) {
    console.log({item});
    const innerItem = document.createElement('shop-cart-item');
    this.appendChild(innerItem);
    innerItem.value = item;
    
    let value = localStorage.getItem('cart')
    if (value) {
      value = JSON.parse(value)
    } else {
      value = {}
    }
    value[item.uid] = item
    localStorage.setItem('cart', JSON.stringify(value))
    this.showHistory = false
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
  }
  
  remove(uid) {
    this.removeChild(this.querySelector(`[uid="${uid}"]`))
    let value = localStorage.getItem('cart')
    if (value) {
      value = JSON.parse(value)
      delete value[item.uid]
    }
    localStorage.setItem('cart', JSON.stringify(value))
    if (Array.from(this.querySelectorAll('shop-cart-item')).length === 0) this.showHistory = true
  }
});