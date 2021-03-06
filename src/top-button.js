import { define, ElementBase } from './base.js';

export default define(class TopButton extends ElementBase {
  constructor() {
    super();
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
        pointer-events: none;
      }
      custom-svg-icon {
        padding-right: 10px;
        width: calc(var(--top-button-height) - 28px);
        height: calc(var(--top-button-height) - 28px);
        pointer-events: none;
      }
      slot {
        font-size: 18px;
        pointer-events: none;
      }
    </style>


    <button>
      <slot></slot>
    </button>`;
  }
})
