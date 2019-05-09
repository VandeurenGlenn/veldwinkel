import * as translations from './translations.json';
import { define, ElementBase } from './base.js';

export default define(class TranslatedString extends ElementBase {
  static get attributeChangedCallback() {
    return ['value'];
  }
  set value(value) {
    this.setAttribute('value', value);
    this.innerHTML = this.translate(this.value);
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
    if (!this.value && this.innerHTML) this.value = this.innerHTML;
  }
  translate(string) {
    const translation = translations['nl'][string];
    if (!translation) return this.value;
    return translation;
  }
});
