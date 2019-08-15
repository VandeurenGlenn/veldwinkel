import { define, ElementBase } from './base.js';

export default define(class SummaryPanel extends ElementBase {
  constructor() {
    super();
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 400px;
    max-width: 1200px;
  }
  ::slotted([slot="left"]) {
    padding-bottom: 24px;
  }
  @media(min-width: 1200px) {
    :host {
      flex-direction: row;
      width: 80%;
    }
    ::slotted([slot="left"]) {
      padding-right: 24px;
      padding-bottom: 0;
    }
  }
</style>
<slot name="left"></slot>
<slot name="right"></slot>
    `;
  }
})
