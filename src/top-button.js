import { define, ElementBase } from './base.js';

export default define(class TopButton extends ElementBase {
  constructor() {
    super();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }

  get template() {
    return html`
    <style>
      :host {
        --top-button-height: 54px;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: var(--top-button-height);
        user-select: none;
      }
      button {
        display: flex;
        flex-direction: row;
        border-radius: 14px;
        padding: 10px 14px;
        width: 100%;
        background: transparent;
        align-items: center;
        box-sizing: border-box;
        outline: none;
        cursor: pointer;
        border: var(--top-button-border, inherit);
      }
      custom-svg-icon {
        padding-right: 10px;
        width: calc(var(--top-button-height) - 28px);
        height: calc(var(--top-button-height) - 28px);
      }
      slot {
        font-size: 18px;
      }
    </style>


    <button>
      <slot></slot>
    </button>`;
  }
})
