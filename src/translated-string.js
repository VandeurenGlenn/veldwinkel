import * as translations from './translations.json';
import { define, ElementBase } from './base.js';

export default define(class TranslatedString extends ElementBase {
  static get attributeChangedCallback() {
    return ['value'];
  }
  set value(value) {
    this.setAttribute('value', value);
    this.shadowRoot.innerHTML = this.translate(this.value);
  }
  get value() {
    return this.getAttribute('value');
  }
  constructor() {
    super();
  }
  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  translate(string) {
    return translations['nl'][string];
  }
});
