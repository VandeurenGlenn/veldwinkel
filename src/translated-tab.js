import './../node_modules/custom-tabs/src/custom-tab.js';
import { define, ElementBase } from './base.js';

export default define(class TranslatedTab extends ElementBase {
  set text(value) {
    this.render({ text: value })
  }
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback();
    this.text = this.innerHTML;
  }

  get template() {
    return html`
    <style>
      :host {
        position: relative;
        display: inline-flex;
        width: 118px;
        height: 48px;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        box-sizing: border-box;
        cursor: pointer;
        --svg-icon-size: 16px;
        --svg-icon-color: #EEE;
        user-select: none;
      }
      :host(.custom-selected) {
        border-bottom: 2px solid #00B8D4;
      }
      custom-tab {
        pointer-events: none;
        text-transform: uppercase;
      }
    </style>
<custom-tab>
  ${'text'}
</custom-tab>
    `;
  }
});
