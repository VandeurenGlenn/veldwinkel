import{d as t,E as s}from"./base-8131728b.js";import"./custom-svg-icon-6e670944.js";t(class TopPrice extends s{constructor(){super()}get template(){return html`<style>
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
  <span class="container"><slot></slot></span>`}});
