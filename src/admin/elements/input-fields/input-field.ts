import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '@material/web/field/outlined-field.js'

@customElement('input-field')
export class InputField extends LitElement {
  @query('input')
  input

  @property({type: String})
  name

  @property({ type: String })
  value

  get event() {
    return this.getAttribute('event') || 'event.offers'
  }
  
  set event(value) {
    this.setAttribute('event', value)
  }
  set key(value) {
    this.setAttribute('key', value)
  }
  
  set ref(value) {
    this.setAttribute('ref', value)
  }
  
  get key() {
    return this.getAttribute('key')
  }
  
  get ref() {
    return this.getAttribute('ref')
  }
  
  async connectedCallback() {
    super.connectedCallback()
    await this.updateComplete
    let timeout
    this.shadowRoot.querySelector('input').addEventListener('input', () => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        pubsub.publish(this.event, { type: 'edit', key: this.key, name: this.name, value: this.input.value})
        timeout = false
      }, 1000);
      
    })
  }

  render() {
    return html`<style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      
      input {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        border: 1px solid #38464e;

        padding: 12px 24px;
        box-sizing: border-box;
        border-radius: 12px;
        color: #fff;
        background: transparent;
      }
    </style>
    <h4><translated-string>${this.name}</translated-string></h4>
    <input type="text" value=${this.value} name=${this.name}>
    `
  }
}