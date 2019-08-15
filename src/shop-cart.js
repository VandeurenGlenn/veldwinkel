import './shop-cart-item.js';

export default customElements.define('shop-cart', class ShopCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
  }
  
  get button() {
    return this.shadowRoot.querySelector('top-button');
  }
  
  connectedCallback() {
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
        /* @media (min-width: 1440px) {
          :host {
            position: absolute;
            transform: translateX(-50%);
            left: 54.3%;
          }
        } */
      </style>
      
      <custom-container>
        <span class="row toolbar">
          <!-- <translated-string>products</translated-string> -->
          <span class="flex"></span>
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
    
    this.button.addEventListener('click', this._submit)
  }
  _submit() {
    shoppingCart.submit()
  }
  
  add(item) {
    
    const innerItem = document.createElement('shop-cart-item');
    innerItem.setAttribute('name', item.name);
    innerItem.setAttribute('uid', item.uid);
    innerItem.setAttribute('price', item.price);
    innerItem.setAttribute('image', item.image.replace('thumbm', 'thumb'));
    innerItem.setAttribute('count', item.count || 1)
    this.appendChild(innerItem);
  }
});