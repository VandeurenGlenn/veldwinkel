import { define, ElementBase } from './base.js';
import './top-price.js';

export default define(class TopClientOrder extends ElementBase {
  constructor() {
    super();
    this._onSelected = this._onSelected.bind(this);
    this._submit = this._submit.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector('custom-svg-icon[icon="done"]').addEventListener('click', this._submit)
    this.selectors = this.shadowRoot.querySelectorAll('custom-selector');
    for (const selector of this.selectors) {
      selector.addEventListener('selected', this._onSelected);
    }

    (async () => {
      const snap = await firebase.database().ref(`offers`).once('value');
      const products = snap.val();
      for (const product of products) {
        const { type } = product;
        const el = document.createElement('span');
        el.classList.add('selection');
        el.setAttribute('data-name', type);

        if (type === 'bloemen' || type === 'eieren' || type === 'wijn' || type === 'honing') {
          this.selectors[1].appendChild(el);

          el.innerHTML = `<span class="row center"><input name="${type}" type="number" value="${product.per}"></input><h4>${product.product}</h4>
            <span class="flex"></span>
            <top-price name="${type}">${product.prijs}</top-price>
          </span>
          <summary>${product.omschrijving}</summary>`;
        } else {
          this.selectors[0].appendChild(el);

          el.innerHTML = `<span class="row center"><input name="${type}" type="number" value="${product.per}"></input><h4>${product.product} - ${product.type}</h4>
            <span class="flex"></span>
            <top-price name="${type}">${product.prijs}</top-price>
          </span>
          <summary>${product.omschrijving}</summary>`;
        }
      }

      import('./../node_modules/custom-selector/src/index.js');
    })()
  }

  async _submit() {
    const set = [{referentie: this.shadowRoot.querySelector('input[name="reference"]').value}];
    let selected = [];
    if (!window.user) {
      await window.signin();
    }
    for (const selector of this.selectors) {
      if (Array.isArray(selector.selected)) {
        selected = [...selected, ...selector.selected];
      }
    }
    for (const query of selected) {
      if (typeof query === 'string') {
        let price = this.shadowRoot.querySelector(`top-price[name="${query}"]`).innerHTML;
        const pieces = this.shadowRoot.querySelector(`input[name="${query}"]`).value;
        set.push({
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          product: query,
          aantal: Number(pieces)
        });
      }
    }
    if (set.length > 1) {
      const snap = await firebase.database().ref(`users/${user.uid}/orders`).push(set);
      // document.dispatchEvent(new CustomEvent('order-placed', { detail: snap.key }));
      const answer = await Notification.requestPermission();
      if (answer === 'granted') navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Guldentop Veldwinkel', {
          body: `order geplaatst\n
    U kan deze afhalen met\n
    order nummer:\n
    ${snap.key}\n
    Tot snel!`});
    this._clear();
      });
  //     if (answer) new Notification('Guldentop Veldwinkel', {
  //       body: `order geplaatst\n
  // U kan deze afhalen met\n
  // order nummer:\n
  // ${snap.key}\n
  // Tot snel!`});


    }



  }

  _clear() {
    requestAnimationFrame(() => {
      this.selectors[0].selected = [];
      this.selectors[1].selected = [];
    })
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
        let price = this.shadowRoot.querySelector(`top-price[name="${query}"]`).innerHTML
        if (query === 'eieren') price = price / 6;
        set.push([
          Number(this.shadowRoot.querySelector(`input[name="${query}"]`).value),
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
    display: flex;
    overflow-y: auto;
  }
  summary, span {
    user-select: none;
    pointer-events: none;
  }
  .container {
    mixin(--css-column)
    min-width: 320px;
    width: 100%;
    box-shadow: 0px 1px 3px 0px #333;
    overflow-y: auto;
    pointer-events: auto;
  }
  .custom-selected {
    background: #1b5e20a6;
    color: #fff;
    --svg-icon-color: #fff;
  }

  .custom-selected input {
    /* background: #1b5e20a6; */
    color: #fff;
  }
  .toolbar {
    box-sizing: border-box;
    padding: 12px;
    align-items: center;
    height: 52px;
    border-top: 1px solid #0000004f;
  }
  custom-svg-icon {
    cursor: pointer;
    pointer-events: auto;
  }
  h2 {
    padding: 24px;
    margin: 0;
    border-top: 1px solid #0000004f;
    border-bottom: 1px solid #0000004f;
    text-transform: uppercase;
    pointer-events: none;
  }
  h3 {
    padding: 24px;
    margin: 0;
    text-transform: uppercase;
    pointer-events: none;
  }
  h4 {
    margin: 0;
    pointer-events: none;
    text-transform: uppercase;
  }
  .selection {
    mixin(--css-column)
    padding: 24px;
    box-sizing: border-box;
    min-height: 82px;
    height: fit-content;
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
  summary {
    padding-left: 48px;
  }
  @media (min-width: 640px) {
    :host {
      /* align-items: center; */
      /* justify-content: center; */
    }
  }
  /* custom-selector {
    padding: 24px;
    box-sizing: border-box;
  } */
  apply(--css-row)
  apply(--css-center)
  apply(--css-flex)
</style>
<span class="container">
  <h3>groentepakketten</h3>
  <custom-selector attr-for-selected="data-name" multi="true" selected="" class="paketten"></custom-selector>

  <h3>allerlei</h3>
  <custom-selector attr-for-selected="data-name" multi="true" selected=""></custom-selector>

  <input name="reference" type="text" placeholder="referentie of opmerking"></input>
  <span class="flex"></span>
  <span class="row toolbar">
    <custom-svg-icon icon="close"></custom-svg-icon>
    <span class="flex"></span>
    <top-price class="total">0</top-price>
    <span class="flex"></span>
    <custom-svg-icon icon="done"></custom-svg-icon>
  </span>
</span>`;
  }
})
