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
      let images = await topstore.databases.get('images')
      images = await images.get(value.uid)
      this.image = `https://ipfs.io/ipfs/${images.thumbm}`
      this.uid = value.uid;
      this.setAttribute('uid', this.uid);
      this._stamp()
    })()    
  }
  
  get value() {
    return this._value;
  }
  
  get _input() {
    return this.shadowRoot.querySelector('input');
  }
  
  _stamp() {
    if (this._input) this._input.removeEventListener(this._onInput)
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 130px;
          width: 100%;
          padding: 8px 16px 16px 0;
          box-sizing: border-box;
          font-size: 18px;
          --svg-icon-size: 18px;
          font-size: 16px;
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
          font-size: 18px;  
        }
        
        img {
          border-radius: 30px;
        }
        
        p, strong {
          text-transform: uppercase;
        }
        @media (max-width: 321px) {
          img {
            width: 82px;
          }
        }
      </style>     
      
      <span class="row">
        <img src="${this.image}"></img>        
        
        <span class="flex"></span>
        <span class="column">      
          <span class="row">
            <strong>naam</strong>
            <span class="flex"></span>
            <p>${this.name}</p>     
          </span>
          <span class="flex"></span>
          <span class="row">
            <strong>prijs</strong>
            <span class="flex"></span>
            <custom-svg-icon icon="euro"></custom-svg-icon>
            <p>${this.price}</p>
          </span>
          <span class="flex"></span>
          <span class="row">
            <strong>aantal</strong>
            <span class="flex"></span>
            <input type="number" value="${this.count}"></input>
          </span>
          
          <span class="flex"></span>
        </span>
      </span>
    `;
    
    this._input.addEventListener('input', this._onInput);
  }
  
  async _onInput() {
    const count = Number(this._input.value)
    console.log(count);
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