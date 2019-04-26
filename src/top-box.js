import { define, ElementBase } from './base.js';

export default define(class TopBox extends ElementBase {
  static get observedAttributes() {
    return ['value'];
  }
  set value(value) {
    if (this.rendered) {
      this._value = value;
      if (value) {
        
      }
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this._value) this.value = this.getAttribute('value');
  }

  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value;
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
  }
</style>

    `;
  }
})
