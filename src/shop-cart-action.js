export default customElements.define('shop-cart-action', class ShopCartAction extends HTMLElement {
  get actionButton() {
    return this.shadowRoot.querySelector('[icon="shopping-cart"]');
  }
  
  get closeButton() {
    return this.shadowRoot.querySelector('[icon="close"]');
  }
  
  get innerItems(){
    return Array.from(this.querySelectorAll('.cart-action-item'))
  }
  
  get opened() {
    return this._opened;
  }
  
  set opened(value) {
    this._opened = value;
    
    if (value) this.classList.add('opened');
    else this.classList.remove('opened');
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this._onClick = this._onClick.bind(this);
    window.shoppingCart = window.shoppingCart || {};
    window.shoppingCart.add = this.add.bind(this);
  }
  
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 56px;
          max-width: calc(72px * 3);
          padding: 16px;
          box-sizing: border-box;
          background: #fff;
          z-index: 100;
        }
        .row {
          display: flex;
          align-items: center;
        }
        .actions-container {
          display: flex;
          flex-direction: row;
          height: 56px;
          max-width: calc(72px * 3);
          min-height: 56px;
        }
        :host(.opened) {
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          position: fixed;
          height: 100%;
          width: 100%;
          max-width: 100%;
          transform: translateX(0);
        }
        .flex {
          flex: 1;
        }
        
        :host(.opened) .actions-container {
          min-height: 0;
          height: 0;
          width: 0;
        }
        @media (min-width: 1440px) {
          :host {
            position: absolute;
            transform: translateX(-50%);
            left: 54.3%;
          }
        }
      </style>
      <span class="actions-container">
        <span class="flex"></span>
        <custom-svg-icon icon="shopping-cart"></custom-svg-icon>
        <slot></slot>
      </span>
      <span class="row">
        <translated-string>checkout</translated-string>
        <span class="flex"></span>
        <custom-svg-icon icon="close"></custom-svg-icon>
      </span>
      
      <custom-container>
        <slot></slot>
      </custom-container>
      <!-- <span class="flex"></span> -->
    `;
    
    this.actionButton.addEventListener('click', this._onClick);
    this.closeButton.addEventListener('click', this._onClick);
  }  
  
  add(item) {
    if (this.items[item.uid]) this.items[item.uid].count += item.count;
    else this.items[item.uid] = item;
    
    this.removeChild(this.innerItems.shift());
    
    const innerItem = document.createElement('span');    
    innerItem.classList.add('cart-action-item');
    innerItem.innerHTML = `<img src=${item.image}></img>`;   
    
    
    
    
    this.appendChild(innerItem);
  }
  
  _onClick() {
    this.opened = !this.opened;
  }
});