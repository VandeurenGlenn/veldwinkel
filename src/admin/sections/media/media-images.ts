
import styles from './images.css.js'
import { LitElement, html } from 'lit';
import 'custom-tabs/custom-tab.js'
import 'custom-tabs/custom-tabs.js'

export default class ImagesSection extends LitElement {
  constructor() {
    super()
  }

  get #tabs() {
    return this.renderRoot.querySelector('custom-tabs')
  }

  get #pages() {
    return this.renderRoot.querySelector('custom-pages')
  }

  static styles = [
    styles
  ]

  async select(route) {

    console.log({route});
    this.#pages.select(route)
    this.#tabs.select(route)
  }

  render() {
    return html`
    <header>
      <custom-tabs attr-for-selected="data-route">
        <span class="tab" data-route="albums">
          <a href="#!/media/images/albums">
            <translated-string>albums</translated-string>
          </a>
        </span>

        <span class="tab" data-route="library">
          <a href="#!/media/images/library">
            <translated-string>library</translated-string>
          </a>
        </span>
      </custom-tabs>
    </header>
    
    <custom-pages attr-for-selected="route">
      <images-albums route="albums"></images-albums>
      <images-library route="library"></images-library>
      <images-album route="album"></images-album>
    </custom-pages>
    `
  }
}

customElements.define('media-images', ImagesSection);
