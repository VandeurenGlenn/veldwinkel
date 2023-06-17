import { LitElement, html, css, render } from 'lit';
import { customElement } from 'define-custom-element-decorator';
import '@material/web/dialog/dialog.js'
import '@material/web/button/tonal-button.js'
import { MdFilledTextField } from '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';
import { imgurAlbumParams } from '../../../apis/imgur/types.js';
import deviceApi from '../../../device-api.js';'./../../../device-api.js'
import { property, state } from 'lit/decorators.js';

declare global {
  interface HTMLElementTagNameMap {
    'images-dialog': ImagesDialog
  }
}

declare type actionResult = {action: string, fields: imgurAlbumParams, image?: { data: string | {name: string, data: string}[], type: string}}

@customElement()
export class ImagesDialog extends LitElement {
  
  static styles = [
    css`
      :host {
        display: block;
      }

      h5 {
        margin: 0;
      }

      custom-tab.custom-selected {
        background: var(--md-sys-color-tertiary);
        border: none;
      }

      custom-tab.custom-selected span, custom-tab.custom-selected md-icon {

        color: var(--md-sys-color-on-tertiary);
      }

      custom-tab {
        gap: 8px;
        height: 40px;
        padding: 0 12px;
        box-sizing: border-box;
        width: auto;
        border-radius: 20px;
        font: var(--_supporting-text-type);
      }

      custom-tabs {
        height: 40px;
      }

      section {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        min-height: 168px;
        position: absolute;
        transform: scale(0);
        justify-content: center;
        align-items: center;
      }

      section[route="camera"] {
        overflow-y: hidden;
      }

      section.custom-selected {
        
        transform: scale(1);
        position: relative;
     
      }
      md-outlined-text-field {
        padding-top: 12px;
      }

      .camera-actions {
        width: 100%;
        position: absolute;
        bottom: 0;
      }

      section[route="camera"] flex-container {
        height: 320px;
      }

      flex-container video, img:not([data-variant="icon"]) {
        height: -webkit-fill-available;
      }

      [data-variant="icon"] {
        height: 48px;
        width: 48px;
      }
    `
  ];

  get #dialog() {
    return this.renderRoot.querySelector('md-dialog')
  }

  get #cameraPreview() {
    return this.renderRoot.querySelector('.camera-preview')
  }

  #cameraFacingMode = 'user'
  #image: {data: string | {name: string, data: string}[], type: string} = { data: null, type: null }

  #takePhoto = async () => {
    // this._previewEl.stop();
    // this._previewEl.srcObject = null;
    const blob = await deviceApi.camera.takePhoto(this.#cameraFacingMode);


    // const fd = new FormData();
    // fd.append('image', blob);

    this.#image.data = await readAsDataURL(blob);
    this.#image.type = 'base64'

    const img = document.createElement('img')
    img.src = this.#image.data as string
    this.renderRoot.querySelector('flex-container').replaceChild(img.cloneNode(true), this.#cameraPreview)
  }

  #selectFile = ({}) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true

    const onchange = async (event) => {
      console.log(event)
      console.log(input.files);
      
      const files = await Promise.all(Array.from(input.files).map(async (file) => {
        const data = await readAsDataURL(file)
        const item = document.createElement('md-list-item')
        item.headline = file.name
        item.innerHTML = `
          <img data-variant="icon" slot="start" src="${data}">
        `
        this.renderRoot.querySelector('section[route="file"]').appendChild(item) 
        return {name: file.name, data}
      }))
      
      
      this.#image.data = files as {name: string, data: string}[]
      this.#image.type = 'base64[]'
      input.removeEventListener('change', onchange)
    }

    input.addEventListener('change', onchange)

    input.click()
  }

  #onSelected = ({detail}) => {
    this.renderRoot.querySelector('custom-pages').select(detail)
    if (detail === 'camera') {
      deviceApi.camera.preview(this.#cameraPreview, this.#cameraFacingMode);
    }
  }

  #addImageTemplate() {
    return html`


    <custom-tabs slot="header" attr-for-selected="route" @selected=${this.#onSelected}>
      <custom-tab route="url">
        <md-icon>link</md-icon>
        <span>url</span>
      </custom-tab>
      <flex-it flex="1"></flex-it>

      <custom-tab route="camera">
        <md-icon>camera</md-icon>
        <span>camera</span>
      </custom-tab>
      <flex-it flex="1"></flex-it>

      <custom-tab route="file">
        <md-icon>upload</md-icon>
        <span>file</span>
      </custom-tab>
      <flex-it flex="2"></flex-it>
  </custom-tabs>

  <custom-pages attr-for-selected="route">
    <section route="url">
      <flex-column>
        add image using a link/url
        <md-outlined-text-field label="url" input-field="url"></md-outlined-text-field>
      </flex-column>
      
    </section>

    <section route="camera">
      <flex-container>
        <video autoplay="true" mute="true" class="camera-preview"></video>
      </flex-container>
      <flex-row class="camera-actions"> 
        <flex-it flex="2"></flex-it>
        
        <md-standard-icon-button @click=${() => this.#cameraFacingMode = 'user'} ?disabled=${async () => !await deviceApi.hasFrontCam()}>
          <md-icon>photo_camera_front</md-icon>
        </md-standard-icon-button>
        
        <flex-it flex="1"></flex-it>
        
        <md-standard-icon-button style="transform: scale(1.66);" @click=${this.#takePhoto}>
          <md-icon>photo_camera</md-icon>
        </md-standard-icon-button>

        <flex-it flex="1"></flex-it>

        <md-standard-icon-button @click=${() => this.#cameraFacingMode = 'environment'} ?disabled=${async () => !await deviceApi.hasBackCam()}>
          <md-icon>photo_camera_back</md-icon>
        </md-standard-icon-button>

        <flex-it flex="2"></flex-it>
      </flex-row>
    </section>

    <section route="file">
      <md-tonal-button @click=${this.#selectFile}>
        <md-icon slot="icon">upload</md-icon>
        select
      </md-tonal-button>
    </section>
  </custom-pages>
  
    <flex-row slot="footer">
      <md-text-button dialogAction="cancel">cancel</md-text-button>
      <flex-one></flex-one>
      <md-text-button dialogAction="submit">submit</md-text-button>
    </flex-row>
    `
  }

  #areYouSureDialogTemplate(deletehash, type: string = 'album') {
    return html`
    <flex-row slot="header">
      <h5>remove ${type}</h5>
      <flex-one></flex-one>        
      <md-standard-icon-button dialogAction="close">close</md-standard-icon-button>
    </flex-row>

    <flex-column>
      <strong>Are you sure you want to remove <span class="deletehash" deletehash=${deletehash}>${deletehash}</span>?</strong>
    </flex-column>

    <flex-row slot="footer">
      <md-text-button dialogAction="cancel">cancel</md-text-button>
      <flex-one></flex-one>
      <md-text-button dialogAction="submit">submit</md-text-button>
    </flex-row>
    `
  }

  #createAlbumDialogTemplate() {
    return html`
    <flex-row slot="header">
      <h5>create album</h5>
      <flex-one></flex-one>        
      <md-standard-icon-button dialogAction="close">close</md-standard-icon-button>
    </flex-row>

    <flex-column>
      <md-filled-text-field label="title" input-field></md-filled-text-field>
      <md-filled-text-field label="description" input-field></md-filled-text-field>
    </flex-column>

    <flex-row slot="footer">
      <md-text-button dialogAction="submit">cancel</md-text-button>
      <flex-one></flex-one>
      <md-text-button dialogAction="submit">submit</md-text-button>
    </flex-row>
    `  
  }

  #onAction = (): Promise<actionResult> => new Promise((resolve, reject) => {
    const action = ({detail}) => {
      const inputFields = Array.from(this.renderRoot.querySelectorAll('[input-field]')) as MdFilledTextField[]
      const fields = {}

      for (const field of inputFields) {
        fields[field.label] = field.value
      }
      
      if (!this.#image.type) {
        this.#image.type = this.renderRoot.querySelector('[input-field]') ? 'url' : undefined
        this.#image.data = this.renderRoot.querySelector('[input-field]')?.value
      }

      const image = {
        type: this.#image.type,
        data: Array.isArray(this.#image.data) ? [...this.#image.data] : this.#image.data
      }

      resolve({ ...detail, fields, image })

    // @ts-ignore
      this.#dialog.removeEventListener('closed', action)
      
      this.#image.data = null
      this.#image.type = null

      deviceApi.camera.close()
      render(html``, this.#dialog)
    }

    // @ts-ignore
    this.#dialog.addEventListener('closed', action)
  })

  async createAlbum(): Promise<actionResult> {
    render(this.#createAlbumDialogTemplate(), this.#dialog)
    this.#dialog.open = true
    return this.#onAction()
  }

    // @ts-ignore
  async removeAlbum(deletehash): Promise<actionResult> {
    render(this.#areYouSureDialogTemplate(deletehash), this.#dialog)
    this.#dialog.open = true
    return this.#onAction()
  }

  async addImage() {
    render(this.#addImageTemplate(), this.#dialog)
    this.#dialog.open = true
    return this.#onAction()
  }

  async removeImage(deletehash): Promise<actionResult> {
    render(this.#areYouSureDialogTemplate(deletehash, 'image'), this.#dialog)
    this.#dialog.open = true
    return this.#onAction()
  }

  render() {
    return html`
    <md-dialog fullscreen></md-dialog>
    `;
  }
}
