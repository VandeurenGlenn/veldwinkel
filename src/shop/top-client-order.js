import './../top-price.js';
import './client-order-selector.js';
import './../custom-container.js';
import './../../node_modules/@vandeurenglenn/custom-date/custom-date.js';

export default define(class TopClientOrder extends ElementBase {
  get selectors() {
    return Array.from(this.querySelectorAll('client-order-selector'));
  }

  get offerDisplay() {
    return window.topstore.databases.get('offerDisplay');
  }

  get offers() {
    return window.topstore.databases.get('offers');
  }

  constructor() {
    super();
    this._onSelected = this._onSelected.bind(this);
    this._submit = this._submit.bind(this);
    this._clear = this._clear.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector('custom-svg-icon[icon="done"]').addEventListener('click', this._submit);
    this.shadowRoot.querySelector('custom-svg-icon[icon="close"]').addEventListener('click', this._clear);

    (async () => {
      window.offerDisplay = await this.offerDisplay.get();
      if(Object.keys(offerDisplay).length === 0) window.offerDisplay = await this.offerDisplay.get()
      await this.stamp();
      
      for (const selector of this.selectors) {
        selector.addEventListener('selected', this._onSelected);
      }
    })();

    // import('./../../node_modules/custom-selector/src/index.js');
  }

  async stamp() {
    if (!window.offers) window.offers = await this.offers.get();
    for (const offer of Object.keys(offerDisplay)) {
      if (!offers[offer]) offers[offer] = await this.offers.get(offer);
      const pub = offerDisplay[offer].public || false;
      if (pub) {
        const el = document.createElement('span');
        el.classList.add('selection');
        el.setAttribute('data-key', offer);

        const { type } = offers[offer];
        let sel = this.querySelector(`client-order-selector[is="${type}"]`);

        if (!sel) {
          sel = document.createElement('client-order-selector', type);
          this.appendChild(sel);
        }
        sel.add(offer);
      }
    }
  }

  // async paymentOption() {
  // TODO: dialog
  // await ask
  // await import('./../custom-prompt.js');
  // const prompt = document.createElement('custom-prompt');
  // prompt.innerHTML = `
  // <span slot="pages">
  //   <section data-route="paymentOption">
  //     <selectable-input></selectable-input>
  //   </section>
  //   <section data-route="paymentRequest"></section>
  // </span>`;
  // document.body.appendChild(prompt);
  // await prompt.prompt()
  // document.removeChild(document.querySelector('custom-prompt'));
  // return null;
  // }

  async checkout(set) {
    const snap = await firebase.database().ref(`orders/${user.uid}`).push(set);
    firebase.database().ref(`orderKeys/${user.uid}`).set(true);
    console.log(snap.key);
    // document.dispatchEvent(new CustomEvent('order-placed', { detail: snap.key }));
    const answer = await Notification.requestPermission();
    if (answer === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Guldentop Veldwinkel', {
          body: `order geplaatst
u kan deze afhalen met: ${snap.key}`,
          link: 'https://guldentopveldwinkel.be',
          data: snap.key,
          actions: [{
            action: 'location',
            title: 'afhaallocatie'
          }, {
            action: 'checkOrder',
            title: 'bekijk bestelling'
          }]
        });
        this._clear();
      });
    }
  }

  async _submit() {
    if (!window.user) {
      await window.signin();
    }
    await import('./checkout-prompt.js')
    let prompt = document.createElement('checkout-prompt');
    document.body.appendChild(prompt)
    const prompted = await prompt.show();

    const set = [{
      collectionTime: prompted[0],
      payment: prompted[1],
      referentie: this.shadowRoot.querySelector('input[name="reference"]').value,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber
    }];
    let selected = [];
    for (const selector of this.selectors) {
      if (Array.isArray(selector.selected)) {
        selected = [...selected, ...selector.selected];
      }
    }
    console.log(selected);
    for (const query of selected) {
      if (typeof query === 'string') {
        const pieces = this.querySelector(`client-order-selector-item[is="${query}"]`).pieces;
        set.push({
          product: query,
          aantal: Number(pieces)
        });
      }
    }


    if (set.length > 1) {
      // let paymentResult;
      // const paymentMethod = await this.paymentOption();
      // if (paymentMethod) paymentResult = await import('./shop-checkout');
      // else return this.checkout()


      // if (paymentResult) {
      this.checkout(set);
      // }
    }
  }

  _clear() {
    requestAnimationFrame(() => {
      for (let i = 0; i<this.selectors.length; ++i) {
        this.selectors[i].selected = [];
      }
    });
  }

  _onSelected(event) {
    const set = [];
    let selected = [];
    for (const selector of this.selectors) {
      if (Array.isArray(selector.selected)) {
        selected = [...selected, ...selector.selected];
      }
    }
    for (const query of selected) {
      if (typeof query === 'string') {
        const price = offerDisplay[query].price;
        set.push([
          Number(this.querySelector(`client-order-selector-item[is="${query}"]`).pieces),
          Number(price)
        ]);
      }
    }
    const price = set.reduce((p, c) => {
      c = c[0] * c[1];
      return p + c;
    }, 0);

    this.shadowRoot.querySelector('.total').innerHTML = String(price);
  }

  get template() {
    return html`<style>
  :host {
    mixin(--css-column)
    overflow-y: auto;
    align-items: center;
  }
  summary, span {
    user-select: none;
    pointer-events: none;
  }
  custom-container {
    overflow-y: auto;
    overflow-x: hidden;
    pointer-events: auto;
    height: calc(100% - 54px);
  }
  .toolbar {
    box-sizing: border-box;
    padding: 24px;
    align-items: center;
    height: 52px;
    border-top: 1px solid #0000004f;
    max-width: 640px;
    width: 100%;
  }
  custom-svg-icon {
    cursor: pointer;
    pointer-events: auto;
  }
  input {
    margin-right: 8px;
    padding: 12px 0px 12px 6px;
    box-sizing: border-box;
    width: 42px;
    outline: none;
    border: none;
    background: transparent;
    pointer-events: auto;
  }
  input[name="reference"] {
    height: 48px;
    width: 100%;
    border-top: 1px solid #0000004f;
    padding: 12px 24px;
  }
  /* custom-selector {
    padding: 24px;
    box-sizing: border-box;
  } */
  apply(--css-row)
  apply(--css-center)
  apply(--css-flex)
</style>
<custom-container>
  <slot></slot>
  <input name="reference" type="text" placeholder="referentie of opmerking"></input>
  <span class="flex"></span>
</custom-container>

<span class="row toolbar">
  <custom-svg-icon icon="close"></custom-svg-icon>
  <span class="flex"></span>
  <top-price class="total">0</top-price>
  <span class="flex"></span>
  <custom-svg-icon icon="done"></custom-svg-icon>
</span>`;
  }
});
