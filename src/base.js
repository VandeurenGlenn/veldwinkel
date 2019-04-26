import define from './../node_modules/backed/src/utils/define.js';
import Renderer from './../node_modules/custom-renderer-mixin/src/render-mixin.js';
import CSS from './../node_modules/backed/src/mixins/css-mixin.js';

const mixin = (mix = HTMLElement) => class Mixin extends mix {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
  }

  get template() {
    return html`<slot></slot>`;
  }
}
class ElementBase extends CSS(Renderer(HTMLElement)) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
  }

  get template() {
    return html`<slot></slot>`;
  }
}

export { define, ElementBase }
