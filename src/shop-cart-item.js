export default customElements.define('shop-cart-item', class ShopCartItem extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
  }
  
  connectedCallback() {
    const name = this.getAttribute('name');
    const price = this.getAttribute('price');
    const count = this.getAttribute('count') || 1;
    const image = this.getAttribute('image');
    const uid = this.getAttribute('uid');
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 130px;
          width: 100%;
          padding: 8px 16px 16px 0;
          box-sizing: border-box;
        }
        .flex {
          flex: 1;
        }
        
        .column {
          display: flex;
          flex-direction: column;
          width: 66%;
          height: 100%;
        }
        
        .row {
          display: flex;
          flex-direction: row;
          align-items: center;
          min-height: 26px;
          height: 100%;
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
        }
        
        img {
          border-radius: 30px;
        }
      </style>     
      
      <!-- <span>${uid}</span> -->
      <span class="row">
        <img src="${image}"></img>        
        
        <span class="flex"></span>
        <span class="column">      
          <span class="row">
            <strong>naam</strong>
            <span class="flex"></span>
            <strong>${name}</strong>     
          </span>
          <span class="flex"></span>
          <span class="row">
            <strong>prijs</strong>
            <span class="flex"></span>
            <custom-svg-icon icon="euro"></custom-svg-icon>
            <strong>${price}</strong>
          </span>
          <span class="flex"></span>
          <span class="row">
            <strong>aantal</strong>
            <span class="flex"></span>
            <input type="number" value="${count}"></input>
          </span>
          
          <span class="flex"></span>
        </span>
      </span>
    `;
    
    // this.actionButton.addEventListener('click', this._onClick);
    // this.closeButton.addEventListener('click', this._onClick);
  }
  
  _onClick() {
    this.opened = !this.opened;
  }
});