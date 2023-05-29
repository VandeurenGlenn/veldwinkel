import template from './images.html.js'
import styles from './images.css.js'
import { LitElement } from 'lit';

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
    this.#pages.select(route)
  }

  render() {
    return template
  }
}

customElements.define('images-section', ImagesSection);
