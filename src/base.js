import define from './../node_modules/backed/src/utils/define.js';
import Renderer from './../node_modules/custom-renderer-mixin/src/render-mixin.js';
import CSS from './../node_modules/backed/src/mixins/css-mixin.js';
import importScript from './../node_modules/backed/src/utils/load-script.js';
import SelectorMixin from './../node_modules/custom-select-mixins/src/selector-mixin.js';

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
};
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
    return html`<style>:host { pointer-events: none; }</style><slot></slot>`;
  }
}
/**
 * @param {blob|file} input
 */
window.readAsDataURL = (input) => new Promise((resolve, reject) => {
  console.log(input);
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    resolve(reader.result);
  }, false);
  reader.readAsDataURL(input);
});
window.importScript = importScript;
window.ElementBase = ElementBase;
window.define = define;
window.SelectorMixin = SelectorMixin;
window.RenderMixin = Renderer;
export { define, ElementBase, Renderer, SelectorMixin };
