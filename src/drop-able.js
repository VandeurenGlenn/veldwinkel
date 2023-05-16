
import { LitElement, html, css } from 'lit';

export class DropAble extends LitElement {

  async connectedCallback() {
    super.connectedCallback()
    await this.updateComplete
    this.ondragover = event => {
      event.preventDefault()
    }
    this.ondrop = event => {
      event.preventDefault()
      var data = event.dataTransfer.getData("text");
      this.dispatchEvent(event)
      
  }

  static styles = [
    css`
      :host {
        display: fill;
      }
    `
  ];

  render() {
    return html`
    <slot></slot>
    `;
  }
}
customElements.define('drop-able', DropAble);
