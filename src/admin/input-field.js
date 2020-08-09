import './../../node_modules/custom-input/custom-input.js'

export default customElements.define('input-field', class InputField extends HTMLElement {
  
  static get observedAttributes() {
    return ['name', 'value']
  }
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  
  set name(value) {
    this.shadowRoot.querySelector('translated-string').innerHTML = value
    this.shadowRoot.querySelector('custom-input').name = value
    this.setAttribute('name', value)
  }
  
  set value(value) {
    this.shadowRoot.querySelector('custom-input').value = value
    this.setAttribute('value', value)
  }
  
  set key(value) {
    this.setAttribute('key', value)
  }
  
  set ref(value) {
    this.setAttribute('ref', value)
  }
  
  get name() {
    return this.getAttribute('name')
  }
  
  get value() {
    return this.shadowRoot.querySelector('custom-input').value
  }
  
  get key() {
    return this.getAttribute('key')
  }
  
  get ref() {
    return this.getAttribute('ref')
  }
  
  render() {
    this.shadowRoot.querySelector('custom-input').value = value
  }
  
  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value
  }
  
  connectedCallback() {
    let timeout
    this.shadowRoot.querySelector('custom-input').shadowRoot.querySelector('input').addEventListener('input', () => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        pubsub.publish(`event.offers`, { type: 'edit', key: this.key, name: this.name, value: this.value})
        timeout = false
      }, 2000);
      
    })
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      
      custom-input {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        border: 1px solid #38464e;
      }
    </style>
    <h4><translated-string>${this.name}</translated-string></h4>
    <custom-input type="text"></custom-input>
    `
  }
});