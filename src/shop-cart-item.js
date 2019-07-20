export default customElements.define('shop-cart-item', class ShopCartItem extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
  }
  
  connectedCallback() {
    const name = this.getAttribute('name');
    const price = this.getAttribute('price');
    const count = this.getAttribute('count');
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 56px;
          padding: 16px;
          box-sizing: border-box;
        }
        .flex {
          flex: 1;
        }
      </style>
      <input type="number" value="${count}"></input>
      <strong>${name}</strong>      
      <span class="flex"></span>
      <strong>${price}</strong>
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