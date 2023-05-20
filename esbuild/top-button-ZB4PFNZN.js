import {
  ElementBase,
  define_default
} from "./chunk-JGNXSNDS.js";
import "./chunk-DZ5PPEG7.js";

// src/top-button.js
var top_button_default = define_default(class TopButton extends ElementBase {
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
        pointer-events: auto;
        cursor: pointer;
      }
      button {
        display: flex;
        flex-direction: row;
        padding: 10px 14px;
        width: 100%;
        background: transparent;
        align-items: center;
        box-sizing: border-box;
        outline: none;
        cursor: pointer;
        border: none;
        pointer-events: none;
        cursor: pointer;
        text-transform: uppercase;
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
});
export {
  top_button_default as default
};
