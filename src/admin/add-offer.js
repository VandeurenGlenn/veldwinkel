import { define, ElementBase } from './../base.js';
import './../../node_modules/custom-input/custom-input.js';
import './../top-button.js';
import './../custom-container.js';
import './../device-api.js';
import './../image-nails.js';
import ImageMixin from './image-mixin.js'

export default define(class AddOffer extends ImageMixin(ElementBase) {
  get _submitButton() {
    return this.shadowRoot.querySelector('custom-svg-icon[icon="done"]');
  }
  get _publishButton() {
    return this.shadowRoot.querySelector('custom-svg-icon[icon="public"]');
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
  
  get nails() {
    return this.shadowRoot.querySelector('image-nails');
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
    this.nailUpload = this.nailUpload.bind(this)
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this._init()
  }
  
  async _init() {
    if (await deviceApi.hasFrontCam() || await deviceApi.hasBackCam()) {
      deviceApi.camera.preview(this._previewEl)
      this._camButton.addEventListener('click', this.takePhoto);
      this._frontCamButton.addEventListener('click', this._switchCameraFront);
      this._rearCamButton.addEventListener('click', this._switchCameraRear);
      this._previewPhotoEl.addEventListener('click', this._closePreview);
    } else {
      // TODO: hide _previewEl
    }
    
    this._submitButton.addEventListener('click', this.submit);
    this._publishButton.addEventListener('click', this._publish);
    
    this.nails.addEventListener('nail-upload', this.nailUpload)
  }

  _publish() {
    this.public = true;
    this.submit();
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

    const fd = new FormData();
    fd.append('image', blob);

    const base64 = await readAsDataURL(blob);
    const key = Number(this.nails.children.length) > 0 ? Number(this.nails.children.length) - 1 : 0
    this.nails.add( {key, src: base64});

    deviceApi.camera.preview(this._previewEl, this._facingMode);
  }
  
  nailUpload({detail}) {
    const key = Number(this.nails.children.length) > 0 ? Number(this.nails.children.length) - 1 : 0
    this.nails.add({key, src: detail})
  }

  async submit() {
    const value  = {};
    const inputs = Array.from(this.shadowRoot.querySelectorAll('custom-input'));    
    inputs.forEach((input) => value[input.getAttribute('name')] = input.value);
    
    let image = Array.from(this.nails.children);    
    image = image.map((img) => img.src)
    
    const { name, price } = value
    
    delete value.name
    delete value.price
    
    
    const snap = await firebase.database().ref(`offers`).push({...value});
    
    globalThis.pubsub.publish('event.offers', { type: 'add', key: snap.key, value: {name, price, public: this.public, ...value}})
    globalThis.adminGo('offers')
    
    await firebase.database().ref(`offerDisplay/${snap.key}`).set({name, price, public: this.public});
    
    
    let i = 0
    for await (const img of image) {
      await this.addImage(snap.key, i, img, 960, 95)
      if (i === 0) {
        await this.addImage(snap.key, 'thumbm', img, 320, 95)
        await this.addImage(snap.key, 'thumb', img, 120, 85)
        await this.addImage(snap.key, 'placeholder', img, 5, 25)
      }
    }
    // TODO: after promise.all and not notification?
    // adminGo('offers');
    const answer = await Notification.requestPermission();
    if (answer === 'granted') {
      if (!navigator.serviceWorker.controller) new Notification('Guldentop Veldwinkel', {
        body: `Offer ${name} saved as: ${snap.key}`,
        link: 'https://guldentopveldwinkel.be',
        data: snap.key
      })
      else navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Guldentop Veldwinkel', {
          body: `Offer ${name} saved as: ${snap.key}`,
          link: 'https://guldentopveldwinkel.be',
          data: snap.key
        })
      });
    }
    
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
  <image-nails></image-nails>
  <span class="image-previews"></span>

  <custom-input name="name" title="name" placeholder="name"></custom-input>
  <custom-input name="content" title="content" placeholder="content"></custom-input>
  <custom-input name="description" title="description" placeholder="description"></custom-input>
  <custom-input name="price" title="price" placeholder="price"></custom-input>
  <custom-input name="portion" title="portion" placeholder="portion"></custom-input>
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
