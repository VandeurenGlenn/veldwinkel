import './../top-price.js';
import './../custom-container.js';
import './../translated-string.js';

export default define(class ClientOrder extends ElementBase {
  get value() {
    return this._value
  }
  set value(value) {
    console.log(value);
    this._value = value;
    this._stamp()
  }
  constructor() {
    super();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    ( async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          this._stamp()
          // this.render({ name, description, price, photo, type, portion, pieces });
        } else {
          signin();
        }
      });
    })();
  }
  
  async _stamp() {
    let snap = await firebase.database().ref(`orders/${user.uid}/${this.value}`).once('value');
    snap = snap.val();
    if (!snap) {
      if (!this.busy) {
        this.innerHTML = '';
        await import('./busy.js')
        this.busy = true;
        this.innerHTML = '<busy-animation style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"></busy-animation>'  
      }
      
      return setTimeout(() => {        
        this._stamp();
      }, 2000);
    }
    this.innerHTML = '';
    this.busy = false;
    console.log({snap});
    const { collectionTime, id, products, status } = snap;
    const el = document.createElement('span');
    el.classList.add('column', 'heading');
    
    this.innerHTML = '';
    el.innerHTML = `
    <span class="column"><strong><translated-string>order</translated-string></strong><span class="flex"></span>${this.value}</span><br>
    <span class="column"><strong><translated-string>collection time</translated-string></strong><span class="flex"></span><custom-date lang="nl" value="${collectionTime[1]}"></custom-date></span><br>
    <span class="column"><strong><translated-string>payment</translated-string></strong><span class="flex"></span><translated-string>${status}</translated-string></span><br>
    <span class="column"><strong>PayPal <translated-string>transaction</translated-string></strong><span class="flex"></span><translated-string>${id}</translated-string></span><br>
    `;
    this.appendChild(el);
    for (const item of snap.products) {
      const snap = await firebase.database().ref(`offerDisplay/${item.key}`).once('value');
      item.product = snap.val();
      const el = document.createElement('span');
      el.classList.add('row', 'list-item');
      el.innerHTML = `
      <strong>${item.count}</strong>
      <strong>${item.product.name}</strong>
      <span class="flex"></span>
      <top-price>${item.product.price}</top-price>
      `;
      this.appendChild(el);
    }
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    box-sizing: border-box;
    background: #48480d linear-gradient(167deg, #62622c, #a5ae99 40rem);
  }
  ::slotted(.heading) {
    mixin(--css-column)
    height: 254px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    padding: 8px;
    background: #48480d linear-gradient(167deg, #5a5a2d, #9da48b 40rem);
    color: #fff;
  }
  ::slotted(.list-item) {
    mixin(--css-row)
    mixin(--css-center)
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    height: 48px;
  }
  ::slotted(* .flex) {
    mixin(--css-flex)
  }
  ::slotted(.row) {
    mixin(--css-row)
  }
</style>
<custom-container>
<slot></slot>
</custom-container>
    `;
  }
});
