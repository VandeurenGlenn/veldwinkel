import { define, ElementBase } from './base.js';
import './../node_modules/custom-svg-icon/src/custom-svg-icon.js';

export default define(class TopIconButton extends ElementBase {
  get icon() {
    return this._icon;
  }
  set icon(value) {
    if (value !== this._icon) {
      this._icon = value;
      this.setAttribute('icon', value);
      this.shadowRoot.querySelector('custom-svg-icon').setAttribute('icon', value);
    }
  }
  constructor() {
    super();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.icon = this.getAttribute('icon');
  }

  get template() {
    return html`
    <style>
      :host {
        --top-icon-button-height: 54px;
        display: flex;
        flex-direction: row;
        height: var(--top-icon-button-height);
        user-select: none;
        border-radius: 30px;
        --svg-icon-color: #1B5E20;
        border-radius: 30px;
        border-bottom-left-radius: var(--top-icon-button-border-radius-left, 30px);
        border-bottom-right-radius: var(--top-icon-button-border-radius-right, 30px);
        overflow: hidden;
        pointer-events: auto;
        cursor: pointer;
      }
      button {
        display: flex;
        flex-direction: row;
        border-radius: 30px;
        border-bottom-left-radius: var(--top-icon-button-border-radius-left, 30px);
        border-bottom-right-radius: var(--top-icon-button-border-radius-right, 30px);
        padding: 10px 14px;
        width: 100%;
        background: transparent;
        align-items: center;
        box-sizing: border-box;
        outline: none;
        cursor: pointer;
        border-color: #8BC34A;
        color: var(--svg-icon-color);
        text-transform: uppercase;
        overflow: hidden;
        pointer-events: none;
      }
      custom-svg-icon {
        padding-right: 10px;
        width: calc(var(--top-icon-button-height) - 28px);
        height: calc(var(--top-icon-button-height) - 28px);
      }
    </style>


    <button>
      <custom-svg-icon></custom-svg-icon>
      <span style="flex: 1;"></span>
      <slot></slot>
    </button>
    `;
  }
});
