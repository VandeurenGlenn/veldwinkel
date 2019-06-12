import { ElementBase, define } from './../base.js';
import ProductEditorMixin from './product-editor-mixin.js';
import './../image-nails.js';
import './../custom-container.js';
import './../../node_modules/custom-input/custom-input.js';

export default define(class TopOffer extends ProductEditorMixin {
  get addFieldIcon() {
    return this.shadowRoot.querySelector('[icon="add"]');
  }
  constructor() {
    super();
    this.addField = this.addField.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.addFieldIcon.addEventListener('click', this.addField);
  }

  async addField() {
    const name = await prompt('please enter field name');
    if (name) {
      const span = document.createElement('span');
      span.classList.add('column');
      span.innerHTML = `
      <h4><translated-string>${name}</translated-string></h4>
      <custom-input name="${name}" type="text" value=""></custom-input>
      `;

      this.appendChild(span);
    }
  }

  stamp() {
    this.innerHTML = '';
    const offer = {...window.offers[this._value], ...window.offerDisplay[this._value]};
    // console.log(offer);
    for (const i of Object.keys(offer)) {
      console.log(i);
      console.log(offer[i]);
      if (i === 'image') {
        let val = offer[i];
        if (typeof val === 'object') val = [...Object.entries(val)];
        if (!Array.isArray(val)) val = [val];
        val.forEach(([key, src]) => {
          console.log(key, src);
          this.nails.add({ key, src });
        });
      } else if (i === 'public') {
        if (offer[i]) this.publicIcon.setAttribute('public', ' ')
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
    min-height: 110px;
  }
  .toolbar {
    height: 72px;
    box-sizing: border-box;
    padding: 24px;
    width: 100%;
    max-width: 640px;
  }
  [icon="add"] {
    margin-top: 24px;
  }
  .wrapper {
    display: flex;
    box-sizing: border-box;
    padding: 12px 24px 24px;
    width: 100%;
  }
  custom-svg-icon {
    cursor: pointer;
  }
  [public] {
    --svg-icon-color: #4caf50;
  }
  apply(--css-row)
  apply(--css-center)
  apply(--css-flex)
</style>

<custom-container>
  <image-nails></image-nails>
  <slot></slot>
  <span class="wrapper">
    <span class="flex"></span>
    <custom-svg-icon icon="add" title="add info field"></custom-svg-icon>
    <span class="flex"></span>
  </span>
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
