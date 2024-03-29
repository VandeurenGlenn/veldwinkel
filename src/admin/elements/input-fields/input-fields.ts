import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('input-field')
export class InputFields extends LitElement {
  static get observedAttributes() {
    return ['fields'];
  }

  constructor() {
    super();
  }

  set fields(value) {
    if (typeof value === 'string') value = JSON.parse(value);
    if (this.rendered) {
      this._fields = value;
      if (value) {
        for (let field of value) {
          if (!Array.isArray(field)) field = [field];
          const input = document.createElement('custom-input');
          this.appendChild(input);
          input.setAttribute('name', field[0]);
          if (field[1]) input.setAttribute('value', field[1]);
        }
      }
    }
  }

  get fields() {
    return this._fields;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.fields) this.fields = this.getAttribute('fields');
  }

  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value;
  }

  get template() {
    return html`
<style>

</style>
<slot></slot>
<span class="row">
  <custom-svg-icon icon="close"></custom-svg-icon>
  <span class="flex"></span>
  <custom-svg-icon icon="done"></custom-svg-icon>
</span>`;
  }
}
