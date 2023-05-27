
import { LitElement, css, html, render } from 'lit';
import '@material/web/fab/fab.js'
import '@material/web/icon/icon.js'
import '@material/web/iconbutton/standard-icon-button.js'
import '@material/web/dialog/dialog.js'
import '@material/web/button/text-button.js'
import '@material/web/textfield/filled-text-field.js'
import { property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import '../../elements/items/album-list-item.js'
import '@material/web/list/list.js'
import '@material/web/list/list-item.js'
import { firebaseImgurAlbum, imgurBaseAlbum } from '../../../apis/imgur-base.js';

declare global {
  interface HTMLElementTagNameMap {
    'image-albums': ImagesAlbums
  }
}

export default class ImagesAlbums extends LitElement {

  @property({type: Array})
  albums

  #dialogTask: 'create' | 'remove'
  #currentlyRemoving
  constructor() {
    super()
    
    // this.onAction = this.onAction.bind(this)
  }

  get #dialog() {
    return this.renderRoot.querySelector('md-dialog')
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback()
    await this.updateComplete
    this.albums = await api.getAlbums()
    console.log(this.albums);
    
    this.requestUpdate('albums')
    // api.getAlbum()
  }

  #onAction = async ({detail}) => {
    
    if (detail.action === 'submit' && this.#dialogTask === 'create') {
      const title = this.#dialog.querySelector('[label="title"]').value
      const description = this.#dialog.querySelector('[label="description"]').value
      const result = await api.createAlbum({title, description})
      const album = await api.getAlbum(result.id)
      this.albums.push({...result, ...album})
      this.requestUpdate('albums')
    }

    if (detail.action === 'submit' && this.#dialogTask === 'remove') {
      const deletehash = this.#dialog.querySelector('.deletehash')
      const firebaseKey = this.#currentlyRemoving
      await api.removeAlbum({deletehash, firebaseKey})
      const index = this.albums.filter(item => item.deletehash === deletehash)
      this.albums.slice(index)
      this.requestUpdate('albums')
    }
    
    
    // @ts-ignore
    this.#dialog.removeEventListener('closed', this.#onAction)
  }

  async createAlbum()  {
    this.#dialogTask = 'create'
    render(this.#createAlbumDialogTemplate(), this.#dialog)
    this.#dialog.open = true
    // @ts-ignore
    this.#dialog.addEventListener('closed', this.#onAction)
  }

  async removeAlbum(deletehash, firebaseKey) {
    this.#dialogTask = 'remove'
    this.#currentlyRemoving = firebaseKey
    render(this.#areYouSureDialogTemplate(deletehash), this.#dialog)
    this.#dialog.open = true
    // @ts-ignore
    this.#dialog.addEventListener('closed', this.#onAction)
  }

  static styles = [
    css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    md-fab {
      position: absolute;
      bottom: 24px;
      right: 24px;
    }

    h5 {
      margin: 0;
    }

    md-filled-text-field:not(first-child) {
      padding-top: 12px;
    }
    `
  ]

  #createAlbumDialogTemplate() {
    return html`
    <flex-row slot="header">
      <h5>create album</h5>
      <flex-one></flex-one>        
      <md-standard-icon-button dialogAction="close">close</md-standard-icon-button>
    </flex-row>

    <flex-column>
      <md-filled-text-field label="title"></md-filled-text-field>
      <md-filled-text-field label="description"></md-filled-text-field>
    </flex-column>

    <flex-row slot="footer">
      <md-text-button dialogAction="submit">cancel</md-text-button>
      <flex-one></flex-one>
      <md-text-button dialogAction="submit">submit</md-text-button>
    </flex-row>
    `  
  }

  #areYouSureDialogTemplate(target) {
    return html`
    <flex-row slot="header">
      <h5>remove album</h5>
      <flex-one></flex-one>        
      <md-standard-icon-button dialogAction="close">close</md-standard-icon-button>
    </flex-row>

    <flex-column>
      <strong>Are you sure you want to remove <span class="deletehash">${target}</span>?</strong>
    </flex-column>

    <flex-row slot="footer">
      <md-text-button dialogAction="submit">cancel</md-text-button>
      <flex-one></flex-one>
      <md-text-button dialogAction="submit">submit</md-text-button>
    </flex-row>
    `
  }

  render() {
    return html`
    <md-dialog></md-dialog>

    <flex-container>
      <md-list>
        ${
          map(this.albums, (album: imgurBaseAlbum) => html`
            <md-list-item headline="${album.title?.length > 31 ? `${album.title.slice(0, 31)}...` : album.title}">
              <flex-one></flex-one>
              <md-icon-button data-variant="icon" slot="end" @click="${(event) => this.removeAlbum(album.deletehash, album.firebaseKey)}">delete</md-icon-button>
            </md-list-item> 
          `)
        }
      </md-list>
    </flex-container>
    <md-fab label=${globalThis.translate('create')} @click=${this.createAlbum}>
      <md-icon slot="icon">add</md-icon>
    </md-fab>
    `
  }
}

customElements.define('images-albums', ImagesAlbums);
