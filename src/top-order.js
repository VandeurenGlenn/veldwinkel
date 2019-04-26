import { define, ElementBase } from './base.js';
import './../node_modules/custom-selector/src/index.js';
import './top-price.js';

export default define(class TopOrder extends ElementBase {
  constructor() {
    super();
    this._onSelected = this._onSelected.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.selectors = this.shadowRoot.querySelectorAll('custom-selector');
    for (const selector of this.selectors) {
      selector.addEventListener('selected', this._onSelected);
    }
  }

  _onSelected(event) {
    const set = [];
    let selected = [];
    for (const selector of this.selectors) {
      if (Array.isArray(selector.selected)) {
        selected = [...selected, ...selector.selected];
      }

    }
    console.log(selected);
    for (const query of selected) {
      console.log(query);
      if (typeof query === 'string') {
        let price = this.shadowRoot.querySelector(`top-price[name="${query}"]`).innerHTML
        if (query === 'eggs') price = price / 6;
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
    console.log(event);
  }

  get template() {
    return html`<style>
  :host {
    display: flex;
  }
  .container {
    mixin(--css-column)
    min-width: 320px;
    max-width: 620px;
    width: 100%;
    box-shadow: 0px 1px 3px 0px #333;
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
    mixin(--css-row)
    padding: 24px;
    box-sizing: border-box;
    height: 64px;
    align-items: center;
    cursor: pointer;
  }
  input {
    margin-right: 8px;
    padding: 12px 0px 12px 6px;
    box-sizing: border-box;
    width: 42px;
    outline: none;
    border: none;
    background: transparent;
  }
  @media (min-width: 640px) {
    :host {
      align-items: center;
      justify-content: center;
    }
  }
  /* custom-selector {
    padding: 24px;
    box-sizing: border-box;
  } */
  apply(--css-row)
  apply(--css-flex)
</style>
<span class="container">
  <h2>bestelling</h2>
  <h3>groentepakketten</h3>
  <custom-selector attr-for-selected="data-name" multi="true" selected="">
    <span class="selection" data-name="big">
      <input name="big" type="number" value="1"></input><h4>groot</h4>
      <span class="flex"></span>
      <top-price name="big">15</top-price>
    </span>

    <span class="selection" data-name="small">
      <input name="small" type="number" value="1"></input><h4>klein</h4>
      <span class="flex"></span>
      <top-price name="small">10</top-price>
    </span>

    <span class="selection" data-name="hurry-hap">
      <input name="hurry-hap" type="number" value="1"></input><h4>hurry hap</h4>
      <span class="flex"></span>
      <top-price name="hurry-hap">10</top-price>
      <h5></h5>
    </span>
  </custom-selector>

  <h3>allerlei</h3>
  <custom-selector attr-for-selected="data-name" multi="true" selected="">
    <span class="selection" data-name="eggs">
      <input name="eggs" type="number" step="6" value="6"></input>
      <h4>eieren</h4>
      <span class="flex"></span>
      <top-price name="eggs">3</top-price>
    </span>

    <span class="selection" data-name="flowers">
      <input name="flowers" type="number" value="1"></input><h4>bloemen</h4>
      <span class="flex"></span>
      <top-price name="flowers">7</top-price>
    </span>

    <span class="selection" data-name="wine">
      <input name="wine" type="number" value="1"></input><h4>kersenwijn</h4>
      <span class="flex"></span>
      <top-price name="wine">7</top-price>
    </span>

    <span class="selection" data-name="honey">
      <input name="honey" type="number" value="1"></input><h4>honing</h4>
      <span class="flex"></span>
      <top-price name="honey">7</top-price>
    </span>
  </custom-selector>
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
