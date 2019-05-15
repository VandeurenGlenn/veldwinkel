import { define, ElementBase } from './../base.js';
import './../top-button.js';
import './../custom-container.js';
import './../device-api.js';
import './../../node_modules/custom-input/custom-input.js';
import './../selectable-input.js';

export default define(class AddProduct extends ElementBase {
  // #camButton = this.shadowRoot.querySelector('top-icon-button[icon="photo-camera"]');
  get _submitButton() {
    return this.shadowRoot.querySelector('custom-svg-icon[icon="done"]');
  }
  get _frontCamButton() {
    return this.shadowRoot.querySelector('custom-svg-icon[icon="camera-front"]');
  }
  get _rearCamButton() {
    return this.shadowRoot.querySelector('custom-svg-icon[icon="camera-rear"]');
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

    this.takePhoto = this.takePhoto.bind(this);
    this.submit = this.submit.bind(this);
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
    clone.onclick = ({ path }) => {
      this._previewPhotoEl.onload = async () => {
        // Classify the image.
        const predictions = await model.classify(this._previewPhotoEl);


        console.log('Predictions: ');
        console.log(predictions);
        for (const { className, probability } of predictions) {
          const el = document.createElement('span');
          el.classList.add('selectable');
          el.innerHTML = className;
          this.shadowRoot.querySelector('selectable-input[name="name"]').add(el);
        }
      };
      this._previewPhotoEl.src = path[0].src;
      this.classList.add('has-close');
    };
    this.shadowRoot.querySelector('.image-previews').appendChild(clone);
    deviceApi.camera.preview(this._previewEl, this._facingMode);
    this._previewPhotoEl.src = '';
  }

  async submit() {
    const inputs = [
      ...Array.from(this.shadowRoot.querySelectorAll('custom-input')),
      ...Array.from(this.shadowRoot.querySelectorAll('selectable-input'))
    ];
    const value = {};
    inputs.forEach((input) => value[input.getAttribute('name')] = input.value);
    value['packageCount'] = 0;
    const images = Array.from(this.shadowRoot.querySelector('.image-previews').children);
    // {
    //   image, description, portion, name, stockCount
    // }
    const snap = await firebase.database().ref('products').push(value);
    console.log(snap.key);

    images.forEach((img) =>
      firebase.database().ref(`products/${snap.key}/image`).push(img.src));

    adminGo('products');
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

  video, img {
    position: absolute;
    height: 100%;
    pointer-events: none;
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

  .selectable {
    mixin(--css-row)
  }

  apply(--css-row)
  @media (min-width: 720px) {
    .preview-container {
      height: calc(100% / 3);
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
  <span class="image-previews">

  </span>
  <selectable-input name="name" placeholder="naam"></selectable-input>
  <!-- <custom-input name="name" placeholder="naam"></custom-input> -->
  <custom-input name="description" placeholder="beschrijving"></custom-input>
  <custom-input name="portion" placeholder="portie"></custom-input>
  <h4>aantal in stock</h4>
  <custom-input type="number" name="stockCount" value="0"></custom-input>

  <span class="row">
    <span class="flex"></span>
    <custom-svg-icon icon="done"></custom-svg-icon>
  </span>
</custom-container>
    `;
  }
});
