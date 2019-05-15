import { define, ElementBase } from './../base.js';
import './../../node_modules/custom-input/custom-input.js';
import './../top-button.js';
import './../custom-container.js';
import './../device-api.js';

export default define(class AddOffer extends ElementBase {

  get _submitButton() {
    return this.shadowRoot.querySelector('custom-svg-icon[icon="done"]')
  }
  get _publishButton() {
    return this.shadowRoot.querySelector('custom-svg-icon[icon="public"]')
  }
  get _frontCamButton() {
    return this.shadowRoot.querySelector('custom-svg-icon[icon="camera-front"]')
  }
  get _rearCamButton() {
    return this.shadowRoot.querySelector('custom-svg-icon[icon="camera-rear"]')
  }
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
    this.public = false;
    this.takePhoto = this.takePhoto.bind(this);
    this.submit = this.submit.bind(this);
    this._publish = this._publish.bind(this);
    this._switchCameraFront = this._switchCameraFront.bind(this);
    this._switchCameraRear = this._switchCameraRear.bind(this);
    this._closePreview = this._closePreview.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    deviceApi.camera.preview(this._previewEl);

    this._camButton.addEventListener('click', this.takePhoto);
    this._frontCamButton.addEventListener('click', this._switchCameraFront);
    this._rearCamButton.addEventListener('click', this._switchCameraRear);
    this._previewPhotoEl.addEventListener('click', this._closePreview);
    this._submitButton.addEventListener('click', this.submit);
    this._publishButton.addEventListener('click', this._publish);
  }

  _publish() {
    this.public = true;
    this.submit()
  }

  _closePreview() {
    this._previewPhotoEl.src = '';
    this.classList.remove('has-close');
  }

  _switchCameraFront() {
    this._rearCamButton.classList.remove('custom-selected');
    this._frontCamButton.classList.add('custom-selected');
    this._facingMode = 'user';
    deviceApi.camera.preview(this._previewEl, this._facingMode);
  }

  _switchCameraRear() {
    this._frontCamButton.classList.remove('custom-selected');
    this._rearCamButton.classList.add('custom-selected');
    this._facingMode = 'environment';
    deviceApi.camera.preview(this._previewEl, this._facingMode);
  }

  async takePhoto() {
    // this._previewEl.stop();
    this._previewEl.srcObject = null;
    const blob = await deviceApi.camera.takePhoto(this._facingMode);
    const base64 = await readAsDataURL(blob);
    this._previewPhotoEl.src = base64;
    const clone = this._previewPhotoEl.cloneNode(true);
    clone.classList.remove('preview-photo');
    clone.classList.add('image-previews-image');
    clone.onclick = ({path}) => {
      this._previewPhotoEl.src = path[0].src;
      this.classList.add('has-close');
    }
    this.shadowRoot.querySelector('.image-previews').appendChild(clone);
    deviceApi.camera.preview(this._previewEl, this._facingMode);
    this._previewPhotoEl.src = '';
  }

  async submit() {
    const inputs = Array.from(this.shadowRoot.querySelectorAll('custom-input'));
    const value = {}
    inputs.forEach(input => value[input.getAttribute('name')] = input.value);
    value.packageCount = 0;
    value.public = this.public;
    const images = Array.from(this.shadowRoot.querySelector('.image-previews').children);
    const snap = await firebase.database().ref('offers').push(value);

    images.forEach(img =>
      firebase.database().ref(`offers/${snap.key}/image`).push(img.src));

    adminGo('offers');
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
  --svg-icon-color: #eee;
}

custom-svg-icon {
  cursor: pointer;
}

video, img {
  position: absolute;
  width: calc(100% / 1.6);
  pointer-events: none;
}

.preview-container {

  height: calc(100% / 3);
}
[icon="camera-front"], [icon="camera-rear"] {
  --svg-icon-size: 32px;
}
[icon="camera-front"].custom-selected, [icon="camera-rear"].custom-selected {
  --svg-icon-color: #9e9e9e;
}
.camera-bar {
  align-items: flex-center;
}
.image-previews {
  display: flex;
  flex-direction: row;
  height: 128px;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.image-previews img {
  height: 120px;
  width: 120px;
  pointer-events: auto;
}

.preview-photo {
  pointer-events: none;
}

custom-svg-icon.close {
  opacity: 0;
  top: 10px;
  position: absolute;
  z-index: 100;
  pointer-events: none;
}

:host(.has-close) .preview-photo {
  pointer-events: auto;
}

:host(.has-close) custom-svg-icon.close {
  opacity: 1;
}

.actions {
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
}

apply(--css-row)
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
    <custom-svg-icon icon="close" class="close"></custom-svg-icon>
    <img class="preview-photo"></img>
    <span class="row camera-bar">
      <custom-svg-icon icon="camera-front" class="custom-selected" name="front"></custom-svg-icon>
      <top-button class="camera">
        <custom-svg-icon icon="photo-camera"></custom-svg-icon>
      </top-button>
      <custom-svg-icon icon="camera-rear" name="rear"></custom-svg-icon>
    </span>
  </span>
  <span class="image-previews"></span>

  <custom-input name="name" title="name" placeholder="name"></custom-input>
  <custom-input name="description" title="description" placeholder="description"></custom-input>
  <custom-input name="price" title="price" placeholder="price"></custom-input>
  <custom-input name="pieces" title="pieces" placeholder="pieces"></custom-input>
  <custom-input name="type" title="type" placeholder="type"></custom-input>
  <span class="flex"></span>
  <span class="row actions">
    <custom-svg-icon icon="close"></custom-svg-icon>
    <span class="flex"></span>
    <custom-svg-icon icon="public"></custom-svg-icon>
    <span class="flex"></span>
    <custom-svg-icon icon="done"></custom-svg-icon>
  </span>
</custom-container>
    `;
  }
});
