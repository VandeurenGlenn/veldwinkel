import { define, ElementBase } from './base.js';

export default define(class CustomContainer extends ElementBase {
  constructor() {
    super();
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  :host([row]) {
    flex-direction: column;
  }
  @media (min-width: 640px) {
    ::slotted(*) {
      max-width: 640px;
    }
  }
</style>
<slot></slot>
    `;
  }
})
