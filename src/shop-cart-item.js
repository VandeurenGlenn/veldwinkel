import './custom-select'
import './custom-select-item'

export default customElements.define('shop-cart-item', class ShopCartItem extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this._onInput = this._onInput.bind(this)
  }
  
  set value(value) {
    this._value = value;
    this.name = value.name;
    this.price = value.price;
    this.count = value.count || 1;
    
    (async () => {
      // let images = await topstore.databases.get('images')
      // images = await images.get(value.uid)
      // this.image = `https://ipfs.io/ipfs/${images.thumbm}`
      this.uid = value.uid;
      this.setAttribute('uid', this.uid);
      this._stamp()
      for (var i = 0; i < 49; i++) {
        const el = document.createElement('custom-select-item')
        
        this.shadowRoot.querySelector('custom-select').appendChild(el)
        el.setAttribute('type', 'number')
        el.dataset.route = i;
        el.setAttribute('value', i)
      }
      
      this.shadowRoot.querySelector('custom-svg-icon[icon="delete"]').addEventListener('click', async () => {
        const answer = await confirm('are you sure you want to remove this product?')
        console.log(shoppingCart);
        if (answer) window.shoppingCart.remove(this.uid)
      })
    })()    
  }
  
  get value() {
    return this._value;
  }
  
  get _input() {
    return this.shadowRoot.querySelector('input');
  }
  
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback()
  }
  
  _stamp() {
    if (this._input) this._input.removeEventListener(this._onInput)
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;
          font-size: 18px;
          --svg-icon-size: 18px;
          font-size: 16px;
          color: #757575;
          border-bottom: 1px solid #757575;
        }
        .flex {
          flex: 1;
        }
        .flex2 {
          flex: 2;
        }
        .column {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
        
        .row {
          display: flex;
          flex-direction: row;
          align-items: center;
          min-height: 26px;
          height: 100%;
          width: 100%;
        }
        
        input {
          margin-right: -30px;
          padding: 12px 0px 12px 6px;
          box-sizing: border-box;
          width: 42px;
          outline: none;
          border: none;
          background: transparent;
          pointer-events: auto;
          color: var(--client-order-selector-item-color, '#888');
          font-size: 18px;  
        }
        
        img {
          border-radius: 30px;
        }
        
        p, strong {
          text-transform: uppercase;
        }
        .price {
          max-width: 88px;
          width: 100%;
          align-items: center;
          justify-content: flex-end;
        }
        @media (max-width: 321px) {
          img {
            width: 82px;
          }
        }
        .name {
          color: #111;
        }
      </style>     
      
      <span class="row">
        <img src="${this.image}"></img>
        
        <!-- <span class="flex"></span> -->
        <span class="column">      
          <span class="row">
            <p class="name">${this.name}</p>
            <span class="flex"></span>
            <span class="price row">
              <custom-svg-icon icon="euro"></custom-svg-icon>
              <p>${this.price}</p>
            </span>
          </span>
          
          <span class="flex"></span>
          
          <span class="row">
            <p>aantal</p>
            <custom-select selected="${this.count}"></custom-select>
            <span class="flex"></span>
            <custom-svg-icon icon="delete"></custom-svg-icon>
          </span>
        </span>
      </span>
    `;
  }
  
  async _onInput() {
    const count = Number(this._input.value)
    if (count === 0) {
      const answer = await confirm('are you sure you want to remove this product?')
      if (answer) window.shoppingCart.remove(this.uid)
    } else {
      const item = this.value;
      item.count = count;
      window.shoppingCart.change(item)
    }
  }
});