import './../top-price.js';

export default define(class ClientOrderSelectorItem extends ElementBase {
  constructor() {
    super();
  }

  get pieces() {
    return this.shadowRoot.querySelector('input').value;
  }

  connectedCallback() {
    super.connectedCallback();
    const is = this.getAttribute('data-key');
    const { type, description, price, name } = { ...offers[is], ...offerDisplay[is] };;
    this.render({ name, price, description, is });
  }

  get template() {
    return html`<style>
  :host {
    mixin(--css-column)
    padding: 24px 12px;
    box-sizing: border-box;
    /* min-height: 82px; */
    width: 100%;
    height: fit-content;
    cursor: pointer;
    pointer-events: auto;
  }
  summary, span {
    user-select: none;
    pointer-events: none;
  }
  h4 {
    margin: 0;
    pointer-events: none;
    text-transform: uppercase;
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
    color: var(--client-order-selector-item-color, '#888')
  }

  summary {
    padding-left: 48px;
  }
  apply(--css-row)
  apply(--css-center)
  apply(--css-flex)
</style>
<span class="row center">
  <input type="number" value="1"></input>
  <h4>${'name'}</h4>
  <span class="flex"></span>
  <top-price>${'price'}</top-price>
</span>

<summary>${'description'}</summary>
`;
  }
});
