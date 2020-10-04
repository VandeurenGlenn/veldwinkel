export default customElements.define('custom-select-item', class CustomSelectItem extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'value']
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== this[name]) this[name] = newValue
  }
  
  set value(value) {
    this.innerHTML = value
  }
  
  get value() {
    return Number(this.innerHTML)
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  get template() {
    return `<style>
      :host {
        display: block;
      }
    </style>
    <slot></slot>
    `
  }
});