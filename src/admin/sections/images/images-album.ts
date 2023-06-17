
import { LitElement, css, html, nothing, render } from 'lit';
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
import { firebaseImgurAlbum, imgurBaseAlbum, imgurBaseImage } from '../../../apis/imgur-base.js';
import { customElement } from 'define-custom-element-decorator'

declare global {
  interface HTMLElementTagNameMap {
    'images-album': ImagesAlbum
  }
}

@customElement()
export default class ImagesAlbum extends LitElement {

  @property({type: String})
  selection: string

  @property({type: Array})
  album: imgurBaseAlbum

  #dialogTask: 'create' | 'remove'
  #currentlyRemoving

  addImage() {

  }

  async willUpdate(changedProperties) {
    if (changedProperties.has('selection') && this.selection) {
      console.log(this.selection);
      
      this.album = await api.getAlbum(this.selection)
      console.log(this.album);
      
      this.requestUpdate('album')
    }
  }

  constructor() {
    super()
    
    // this.onAction = this.onAction.bind(this)
  }

  get #dialog() {
    return this.renderRoot.querySelector('md-dialog')
  }

  #onAction = async ({detail}) => {

    if (detail.action === 'submit' && this.#dialogTask === 'remove') {
      const deletehash = this.#dialog.querySelector('.deletehash').getAttribute('deletehash')
      const firebaseKey = this.#currentlyRemoving
      await api.removeAlbum({deletehash, firebaseKey})
      pubsub.publish('event.albums', { type: 'delete', key: firebaseKey})
    }
    
    
    // @ts-ignore
    this.#dialog.removeEventListener('closed', this.#onAction)
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

    header {
      display: flex;
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

    md-dialog {

      --_container-color: #2d2f31;
    }

    md-filled-text-field {
      --_container-color: #2d2f31;
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
      <strong>Are you sure you want to remove <span class="deletehash" deletehash=${target}>${target}</span>?</strong>
    </flex-column>

    <flex-row slot="footer">
      <md-text-button dialogAction="submit">cancel</md-text-button>
      <flex-one></flex-one>
      <md-text-button dialogAction="submit">submit</md-text-button>
    </flex-row>
    `
  }

  render() {
    return this.album ? html`
    <md-dialog></md-dialog>

    <flex-container>
      <header>
        <h4>${this.album.title}</h4>
        <flex-it flex="1"></flex-it>
        <strong>${this.album.id}</strong>
      </header>
      <md-list>
        ${this.album ?
          map(this.album.images, (image: imgurBaseImage) => html`
            <md-list-item headline="${image.title?.length > 31 ? `${image.title.slice(0, 31)}...` : image.title}">
              <flex-one></flex-one>
              <md-standard-icon-button data-variant="icon" slot="end" @click=${(event) => this.removeAlbum(image.deletehash, image.firebaseKey)}>delete</md-standard-icon-button>
            </md-list-item> 
          `)
        : nothing}
      </md-list>
    </flex-container>
    <md-fab label=${globalThis.translate('add image')} @click=${this.addImage}>
      <md-icon slot="icon">add_photo</md-icon>
    </md-fab>
    ` : nothing
  }
}
