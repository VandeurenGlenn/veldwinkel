
import styles from './images.css.js'
import { LitElement, html, nothing } from 'lit';
import 'custom-tabs/custom-tab.js'
import 'custom-tabs/custom-tabs.js'
import { property } from 'lit/decorators.js';

export default class MediaImages extends LitElement {
  @property({ type: String })
  selected: string

  constructor() {
    super()
  }

  get #pages() {
    return this.renderRoot.querySelector('custom-pages')
  }

  static styles = [
    styles
  ]

  async select(route) {

    console.log({route});
    this.selected = route
    this.#pages.select(route)
  }

  #renderBack() {
    return html`
    <md-standard-icon-button @click=${() => history.go(-2)}>
      <md-icon>arrow_left</md-icon>
    </md-standard-icon-button>
    `
  }

  render() {
    return html`
    <header>
      <flex-container>
      ${this.selected !== 'album' && this.selected !== 'image' ? nothing : html`${this.#renderBack()}`}
      </flex-container>
    </header>
    
    <custom-pages attr-for-selected="route">
      <images-albums route="albums"></images-albums>
      <images-library route="library"></images-library>
      <images-album route="album"></images-album>
      <images-image route="image"></images-image>
    </custom-pages>
    `
  }
}

customElements.define('media-images', MediaImages);
