
import { LitElement, css, html } from 'lit';

export default class ImagesLibrary extends LitElement {
  constructor() {
    super()
  }

  upload() {
    
  }

  static styles = [
    css``
  ]

  render() {
    return html`
    
    
    <md-fab label=${globalThis.translate('create')} @click=${this.upload}>
      <md-icon slot="icon">upload</md-icon>
    </md-fab>
    `
  }
}

customElements.define('images-library', ImagesLibrary);
