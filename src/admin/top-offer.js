import { ElementBase, define } from './../base.js';
import ProductEditorMixin from './product-editor-mixin.js';
import './../image-nails.js';
import './../custom-container.js';
import './../../node_modules/custom-input/custom-input.js';

export default define(class TopOffer extends ProductEditorMixin {
  constructor() {
    super();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }

  stamp() {
    this.innerHTML = '';
    const offer = window.offers[this._value];
    console.log(offer);
    for (const i of Object.keys(offer)) {
      if (i === 'image') {
        if (typeof val === 'object') val = [...Object.entries(val)];
        if (!Array.isArray(val)) val = [val];
        val.forEach(([key, src]) => {
          console.log(key, src);
          this.nails.add({ key, src });
        });
      } else if (i === 'public') {
        // this.publicIcon.
      } else {
        const span = document.createElement('span');
        span.classList.add('column');
        span.innerHTML = `
        <h4><translated-string>${i}</translated-string></h4>
        <custom-input name="${i}" type="text" value="${offer[i]}"></custom-input>
        `;
        this.appendChild(span);
      }
    }
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  custom-container {
    overflow-y: auto;
  }
  ::slotted(.column) {
    mixin(--css-column)
    width: 100%;
  }
  .toolbar {
    height: 72px;
    box-sizing: border-box;
    padding: 24px;
    width: 100%;
    max-width: 640px;
  }
  apply(--css-row)
  apply(--css-center)
  apply(--css-flex)
</style>

<custom-container>
  <image-nails></image-nails>
  <slot></slot>
</custom-container>

<span class="row toolbar center">
  <custom-svg-icon icon="delete"></custom-svg-icon>
  <span class="flex"></span>
  <custom-svg-icon icon="public"></custom-svg-icon>
  <span class="flex"></span>
  <custom-svg-icon icon="save"></custom-svg-icon>
</span>`;
  }
});
