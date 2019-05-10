import { define, ElementBase } from './../base.js';
import './../top-button.js';
import './../custom-container.js';
import './../device-api.js';

export default define(class AddOffer extends ElementBase {
  // #camButton = this.shadowRoot.querySelector('top-icon-button[icon="photo-camera"]');
  get _camButton() {
    return this.shadowRoot.querySelector('top-button.camera');
  }

  get _previewEl() {
    return this.shadowRoot.querySelector('.preview');
  }

  get _previewPhotoEl() {
    return this.shadowRoot.querySelector('.preview-photo');
  }

  constructor() {
    super();

    this.takePhoto = this.takePhoto.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    deviceApi.camera.preview(this._previewEl);

    this._camButton.addEventListener('click', this.takePhoto);
  }

  takePhoto() {
    // this._previewEl.stop();
    this._previewEl.srcObject = null;
    deviceApi.camera.takePhoto(this._previewPhotoEl);
  }

  submit() {
    firebase.database().ref('products')
    // { photo, description, pieces, price, type, name }
  }

  get template() {
    return html`
<style>
  :host {
    apply(--css-column)
  }
  .preview-container {
    position: relative;
    display: flex;
    overflow: hidden;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 100%;

    --svg-icon-size: 48px;
    --svg-icon-color: #fff;
  }

  video, img {
    position: absolute;
    width: calc(100% / 1.6);
    pointer-events: none;
  }

  .preview-container {
    padding-bottom: 48px;
    height: calc(100% / 3);
  }

  custom-input {
    margin-bottom: 16px;
  }

  apply(--css-flex)

  @media (max-width: 640px) {
    video, img {
      width: auto;
      height: calc(100% / 1.6);
    }
  }
</style>
<custom-container class="container">
  <span class="preview-container">
    <video class="preview" autoplay></video>
    <img class="preview-photo" autoplay></img>
    <top-button class="camera">
      <custom-svg-icon icon="photo-camera"></custom-svg-icon>
    </top-button>
  </span>

  <custom-input title="name" placeholder="name"></custom-input>
  <custom-input title="description" placeholder="description"></custom-input>
  <custom-input title="price" placeholder="price"></custom-input>
  <custom-input title="pieces" placeholder="pieces"></custom-input>
  <custom-input title="type" placeholder="type"></custom-input>
  <span class="flex"></span>
  <span class="row">
    <custom-svg-icon icon="close"></custom-svg-icon>
    <span class="flex"></span>
    <custom-svg-icon icon="done"></custom-svg-icon>
  </span>
</custom-container>
    `;
  }
})
