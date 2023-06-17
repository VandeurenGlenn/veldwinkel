
import { LitElement, css, html, render } from 'lit';
import '@material/web/fab/fab.js'
import '@material/web/icon/icon.js'
import '@material/web/iconbutton/standard-icon-button.js'
import '@material/web/fab/fab.js'
import '@material/web/button/text-button.js'
import '@material/web/textfield/filled-text-field.js'
import { property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import '@material/web/list/list.js'
import '@material/web/list/list-item.js'
import { firebaseImgurAlbum, imgurBaseAlbum } from '../../../apis/imgur-base.js';
import './images-dialog.js'
import { customElement } from 'define-custom-element-decorator';

declare global {
  interface HTMLElementTagNameMap {
    'images-library': ImagesLibrary
  }
}
@customElement()
export default class ImagesLibrary extends LitElement {

  @property({type: Array})
  images = []

  get #dialog() {
    return this.renderRoot.querySelector('images-dialog')
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback()
    await this.updateComplete
    this.images = await api.getImages()
    this.requestUpdate('images')
  }

  #onclick = (event, firebaseKey) => {
    event.cancelBubble = true
    location.hash = `/#!/media/images/album?selected=${firebaseKey}`
  }

  async removeImage(deletehash, firebaseKey) {
    const {action} = await this.#dialog.removeImage(deletehash)
    if (action === 'submit') {
      await api.removeImage({deletehash, firebaseKey})
      const index = this.images.indexOf(this.images.filter(item => item.deletehash === deletehash)[0])
      this.images.splice(index)
      this.requestUpdate('images')
    }
  }

  async addImage( ) {
    const {action, fields, image} = await this.#dialog.addImage()
    if (action === 'submit') {
      let result
      if (image.type === 'base64[]') {
        result = Promise.all(image.data.map(async image => 
          (await api.addImage({
            type: 'base64',
            title: image.name,
            description: fields.description,
            image: image.data.replace('data:image/png;base64,', '')
          }))
        ))
      } else if (image.type === 'url') {
        result = [await api.addImage({
          type: image.type,
          title: fields.title || image.data as string,
          description: fields.description,
          image: image.data as string
        })]
      } else {
       result = [await api.addImage({
          type: image.type,
          title: fields.title,
          description: fields.description,
          image: image.data as string
        })]
      }
      
      for (const item of result) {
        this.images.push(item)
      }
      
      this.requestUpdate('images') 
    }
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

    md-dialog {

      --_container-color: #2d2f31;
    }

    md-filled-text-field {
      --_container-color: #2d2f31;
    }

    md-standard-icon-button:hover {

    }
    `
  ]

  render() {
    return html`
    <images-dialog></images-dialog>

    <flex-container>
      <md-list>
        ${
          map(this.images, (album: imgurBaseAlbum) => html`
            <md-list-item headline="${album.title?.length > 31 ? `${album.title.slice(0, 31)}...` : album.title}" @click=${(event) => this.#onclick(event, album.firebaseKey)}>
              <flex-one></flex-one>
              <md-standard-icon-button data-variant="icon" slot="end" @click=${(event) => event.cancelBubble = true && this.removeImage(album.deletehash, album.firebaseKey)}>
                <md-icon>delete</md-icon>
              </md-standard-icon-button>
            </md-list-item> 
          `)
        }
      </md-list>
    </flex-container>
    <md-fab variant="primary" label=${globalThis.translate('add image')} @click=${this.addImage}>
      <md-icon slot="icon">add_photo</md-icon>
    </md-fab>
    `
  }
}
