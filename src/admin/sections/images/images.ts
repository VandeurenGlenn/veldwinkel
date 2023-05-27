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

  async connectedCallback(): Promise<void> {
    super.connectedCallback()
    await this.updateComplete
    this.#tabs.addEventListener('selected', this.#onSelected.bind(this))
    this.#onSelected({detail: 'albums'})
  }

  static styles = [
    styles
  ]

  async #onSelected({detail}) {
    await !customElements.get(`images-${detail}`) && await import(`./${detail}.js`)
    this.#pages.select(detail)
  }

  render() {
    return template
  }
}

customElements.define('images-section', ImagesSection);
