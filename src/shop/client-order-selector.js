import './../top-price.js';
import './client-order-selector-item.js';

export default define(class ClientOrderSelector extends RenderMixin(SelectorMixin(HTMLElement)) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    super.connectedCallback();
    this.multi = true;
    this.attrForSelected = 'data-key';
    this.shadowRoot.querySelector('h3').innerHTML = this.getAttribute('is');
  }

  clear() {
    this.selected = [];
  }

  _onSelected(event) {
    this._onSelectedAction();
  }

  add(key) {
    let el = this.querySelector(`[data-key="${key}"]`);
    if (!el) {
      el = document.createElement('client-order-selector-item', key);
      el.setAttribute('data-key', key);
      el.classList.add('selection');
      this.appendChild(el);
    }
  }

  get template() {
    return html`<style>
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  summary, span {
    user-select: none;
    pointer-events: none;
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
  ::slotted(.custom-selected) {
    background: #1b5e20a6;
    color: #fff;
    --svg-icon-color: #fff;
    --client-order-selector-item-color: #fff;
  }
  slot {
    pointer-events: none;
  }
</style>
<h3></h3>
<slot></slot>
`;
  }
});
