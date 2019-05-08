import { define, ElementBase } from './base.js';

export default define(class SummaryPanelMirror extends ElementBase {
  constructor() {
    super();
    this._matches = this._matches.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    const match = window.matchMedia("(min-width: 1200px)")
    this._matches(match);
    match.addListener(this._matches)
  }

  _matches({ matches }) {
    console.log({matches});
    const left = this.querySelector('[slot="left"]');
    const right = this.querySelector('[slot="right"]');
    if (matches) {
      if (right.hasAttribute('switched')) {
        left.removeAttribute('switched')
        left.setAttribute('slot', 'right');
        right.setAttribute('slot', 'left');
      }
      // this.shadowRoot.querySelector('.mobile').removeAttribute('if');
    } else {
      // if (left.getAttribute('switched')) {
      left.setAttribute('switched', '')
      left.setAttribute('slot', 'right');
      right.setAttribute('slot', 'left');
      // this.shadowRoot.querySelector('.desktop').removeAttribute('if');
      // this.shadowRoot.querySelector('.mobile').setAttribute('if', '');
    }
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

  .desktop, .mobile {
    opacity: 0;
  }

  [if] {
    opacity: 1;
  }

  @media(min-width: 1200px) {
    :host {
      flex-direction: row;
      width: 80%;
    }
  }
</style>
<slot name="left"></slot>
<slot name="right"></slot>
    `;
  }
})
