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
    const { collectionTime, payment } = snap[0];
    const el = document.createElement('span');
    el.classList.add('column', 'heading');
    
    this.innerHTML = '';
    el.innerHTML = `
    <span class="row"><strong>order</strong>: ${this.value}</span><br>
    <span class="row"><strong><translated-string>collection time</translated-string></strong>: <custom-date lang="nl" value="${collectionTime[1]}"></custom-date></span><br>
    <span class="row"><strong><translated-string>payment</translated-string></strong>: ${payment}</span><br>
    `;
    this.appendChild(el);
    snap.shift();
    for (const item of snap) {
      const snap = await firebase.database().ref(`offerDisplay/${item.product}`).once('value');
      item.product = snap.val();
      const el = document.createElement('span');
      el.classList.add('row', 'list-item');
      el.innerHTML = `
      <strong>${item.aantal}</strong>
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
  }
  ::slotted(.heading) {
    mixin(--css-column)
    height: 128px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
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

</style>
<custom-container>
<slot></slot>
</custom-container>
    `;
  }
});
