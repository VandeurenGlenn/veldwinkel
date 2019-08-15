export default customElements.define('shop-cart-action', class ShopCartAction extends HTMLElement {
  get badge() {
    return this.shadowRoot.querySelector('.badge')
  }
  get actionButton() {
    return this.shadowRoot.querySelector('[icon="shopping-cart"]');
  }
  
  get innerItems(){
    return Array.from(this.querySelectorAll('.cart-action-item'))
  }
  
  set counter(value) {
    this._counter = value;
    if (value === 0) this.classList.remove('active');
    else {
      if (!this.classList.contains('active')) this.classList.add('active')
    }
    
    document.dispatchEvent(new CustomEvent('counter-change', {detail: value}))
  }
  
  get counter() {
    return this._counter || 0;
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this._onClick = this._onClick.bind(this);
  }
  
  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          /* height: 56px; */
          padding: 16px;
          box-sizing: border-box;
          background: #fff;
          z-index: 100;
          --svg-icon-size: 32px;
        }
        .row {
          display: flex;
          align-items: center;
        }
        .flex {
          flex: 1;
        }
        custom-svg-icon {
          cursor: pointer
        }
        /* @media (min-width: 1440px) {
          :host {
            position: absolute;
            transform: translateX(-50%);
            left: 54.3%;
          }
        } */
        
        .badge {
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2f6c12a8;
          background: #2f6c12c9;
          margin-left: 8px;
          margin-bottom: -3px;
        }
        :host(.active) .badge {
          height: 14px;
          width: 14px;
        }
      </style>
      <span class="badge"></span>
      <custom-svg-icon icon="shopping-cart"></custom-svg-icon>
      <!-- <span class="flex"></span> -->
    `;
    
    this.actionButton.addEventListener('click', this._onClick);
  }  
  
  add(item) {    
    this.counter += 1;
  }
  
  remove(item) {    
    this.counter -= 1;
  }
  
  _onClick() {
    go('cart')
  }
});