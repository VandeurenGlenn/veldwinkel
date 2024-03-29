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
      --svg-icon-size: 13px;
    }
    .container {
      padding-left: 2px;
      text-transform: uppercase;
    }
    slot {
      font-size: 13px;
    }
  </style>

  <custom-svg-icon icon="euro" itemprop="priceCurrency" content="euro" class="text"></custom-svg-icon>
  <span class="container"><slot></slot></span>`;
  }
});
