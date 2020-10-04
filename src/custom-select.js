import './../node_modules/custom-selector/src/index.js'
import './translated-string.js'

export default customElements.define('custom-select', class CustomSelect extends HTMLElement {
  static get observedAttributes() {
    return ['selected']
  }
  
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
    
    
    this._onClick = this._onClick.bind(this)
    this.addEventListener('click', this._onClick)
    
    this.shadowRoot.querySelector('custom-svg-icon[icon="expand-more"]').addEventListener('click', () => {
      this.opened = true
    })
  }
  
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (this[name] !== newValue) this[name] = newValue
  }
  
  _onClick(event) {
    
    const target = event.composedPath()[0]
    console.log(target);
    if (!target.dataset.route) this.opened = true
    else {
      this.opened = false
      const prev = this.querySelector(`connection-item[selected]`)
      if (prev) prev.removeAttribute('selected')
      
      target.setAttribute('selected', '')
      
      this.selected = target.dataset.route
      this.dispatchEvent(new CustomEvent('selected', {detail: target.dataset.route}))
    }
  }
  
  _onSelected(selected) {
    console.log(selected);
  }
  
  set selected(value) {
    this.shadowRoot.querySelector('.selected').innerHTML = globalThis.translate(value) || value
    this._selected = value
  }
  
  get selected() {
    return this._selected
  }
  
  set opened(value) {
    if (value) this.setAttribute('opened', '')
    else this.removeAttribute('opened')
    
    console.log(value);
  }
  
  get template() {
    return `<style>
      :host {
        position: relative;
        display: block;
        cursor: pointer;
        user-select: none;
        padding-left: 12px;
      }
      
      .dropdown {
        position: absolute;
        opacity: 0;
        left: 0;
        top: 0;
        width: 120px;
        max-height: 240px;
        background: #333;
        border: 1px solid rgba(0,0,0,0.5);
        user-select: none;
        pointer-events: none;
        overflow: auto;
        z-index: 100;
      }
      
      span {
        pointer-events: auto;
      }
      
      ::slotted(*) {
        pointer-events: none !important;
      }
      custom-svg-icon {
        pointer-events: auto;
        padding-left: 24px;
      }
      :host([opened]) .dropdown, :host([opened]) ::slotted(*) {
        pointer-events: auto !important;
        opacity: 1;
      }
      :host([opened]) custom-svg-icon, :host([opened]) .selected {
        pointer-events: none;
      }
      
    </style>
    
    <span class="row">
      <span class="selected" icon></span>    
      <custom-svg-icon icon="expand-more"></custom-svg-icon>
    </span>
    
    <span class="dropdown">
      <slot></slot>
    </span>
    `
  }
});