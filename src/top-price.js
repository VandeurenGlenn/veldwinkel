import { define, ElementBase } from './base.js';
import './../node_modules/custom-svg-icon/src/custom-svg-icon.js';

export default define(class TopPrice extends ElementBase {
  constructor() {
    super();
  }

  get template() {
    return html`<style>
    :host {
      mixin(--css-row)
      align-items: center;
      justify-content: center;
      pointer-events: none;
      --svg-icon-size: 16px;
    }
    .container {
      padding-left: 8px;
      text-transform: uppercase;
    }
    slot {
      font-size: 16px;
    }
  </style>

  <custom-svg-icon icon="euro"></custom-svg-icon>
  <span class="container"><slot></slot></span>`;
}
})
