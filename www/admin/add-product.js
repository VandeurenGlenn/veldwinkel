import{d as e,E as t}from"./base-49bd4703.js";import"./top-button.js";import"./custom-input-b2e10efd.js";import"./device-api-1ef4def0.js";define(class SelectableInput extends ElementBase{static get observedAttributes(){return["type","name","placeholder"]}set opened(e){if(e){const{left:e,right:t,top:s,bottom:i}=this.getBoundingClientRect();window.innerWidth<640?(this.selector.style.left="50%",this.selector.style.top="50%",this.selector.style.transform="translate(-50%, -50%)"):(this.selector.style.left=`${e}px`,this.selector.style.top=`${s}px`,this.selector.style.transform=""),this.setAttribute("opened",""),this._dropDownEl.setAttribute("icon","arrow-drop-up")}else this.removeAttribute("opened"),this._dropDownEl.setAttribute("icon","arrow-drop-down")}get opened(){return this.hasAttribute("opened")}get _inputEl(){return this.shadowRoot.querySelector("custom-input")}get _dropDownEl(){return this.shadowRoot.querySelector(".drop")}constructor(){super(),this._onDropDownClick=this._onDropDownClick.bind(this)}get selector(){return this.shadowRoot.querySelector("custom-selector")}add(e){this.selector.appendChild(e)}remove(e){this.selector.removeChild(e)}attributeChangedCallback(e,t,s){this.rendered&&t!==s&&this._inputEl.setAttribute(e,s)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._inputEl.setAttribute("name",this.getAttribute("name")),this._inputEl.setAttribute("type",this.getAttribute("type")||"text"),this._inputEl.setAttribute("placeholder",this.getAttribute("placeholder")),this._dropDownEl.addEventListener("click",this._onDropDownClick)}_onDropDownClick(){this.opened=!this.opened}get template(){return html`
<style>
  :host {
    mixin(--css-column)
    width: 100%;
  }
  custom-selector {
    mixin(--css-column)
    position: fixed;
    opacity: 0;
    pointer-events: none;
    transform: scale(0);
    background: #fff;
  }
  :host([opened]) custom-selector {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
    z-index: 100;
  }
</style>
<custom-input>
  <custom-svg-icon icon="arrow-drop-down" slot="after" class="drop"></custom-svg-icon>
</custom-input>
<custom-selector></custom-selector>
    `}});export default e(class AddProduct extends t{get _submitButton(){return this.shadowRoot.querySelector('custom-svg-icon[icon="done"]')}get _frontCamButton(){return this.shadowRoot.querySelector('custom-svg-icon[icon="camera-front"]')}get _rearCamButton(){return this.shadowRoot.querySelector('custom-svg-icon[icon="camera-rear"]')}get _camButton(){return this.shadowRoot.querySelector("top-button.camera")}get _previewEl(){return this.shadowRoot.querySelector(".preview")}get _previewPhotoEl(){return this.shadowRoot.querySelector(".preview-photo")}get nails(){return this.shadowRoot.querySelector("image-nails")}constructor(){super(),this.ref="products",this.takePhoto=this.takePhoto.bind(this),this.submit=this.submit.bind(this),this._switchCameraFront=this._switchCameraFront.bind(this),this._switchCameraRear=this._switchCameraRear.bind(this),this._closePreview=this._closePreview.bind(this),this.nailUpload=this.nailUpload.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._init()}async _init(){(await deviceApi.hasFrontCam()||await deviceApi.hasBackCam())&&(deviceApi.camera.preview(this._previewEl),this._camButton.addEventListener("click",this.takePhoto),this._frontCamButton.addEventListener("click",this._switchCameraFront),this._rearCamButton.addEventListener("click",this._switchCameraRear),this._previewPhotoEl.addEventListener("click",this._closePreview)),this._submitButton.addEventListener("click",this.submit),this.nails.addEventListener("nail-upload",this.nailUpload)}_closePreview(){this._previewPhotoEl.src="",this.classList.remove("has-close")}_switchCameraFront(){this._rearCamButton.classList.remove("custom-selected"),this._frontCamButton.classList.add("custom-selected"),this._facingMode="user",deviceApi.camera.preview(this._previewEl,this._facingMode)}_switchCameraRear(){this._frontCamButton.classList.remove("custom-selected"),this._rearCamButton.classList.add("custom-selected"),this._facingMode="environment",deviceApi.camera.preview(this._previewEl,this._facingMode)}async takePhoto(){this._previewEl.srcObject=null;const e=await deviceApi.camera.takePhoto(this._facingMode);(new FormData).append("image",e);const t=await readAsDataURL(e),s=Number(this.nails.children.length)>0?Number(this.nails.children.length)-1:0;this.nails.add({key:s,src:t}),deviceApi.camera.preview(this._previewEl,this._facingMode)}nailUpload({detail:e}){const t=Number(this.nails.children.length)>0?Number(this.nails.children.length)-1:0;this.nails.add({key:t,src:e})}async addImage(e,t,s,i,o){s=await webpEncoder.encode(s,i,o);const a=(await ipfs.add(s)).cid.toString();0===t&&await firebase.database().ref(`images/${e}`).set({timestamp:(new Date).getTime()}),await firebase.database().ref(`images/${e}/${t}`).set(a)}async submit(){const e={};[...Array.from(this.shadowRoot.querySelectorAll("custom-input")),...Array.from(this.shadowRoot.querySelectorAll("selectable-input"))].forEach(t=>e[t.getAttribute("name")]=t.value);let t=Array.from(this.nails.children);t=t.map(e=>e.src);const s=await firebase.database().ref(this.ref).push({...e});for await(const e of t)await this.addImage(s.key,0,e,960,95),await this.addImage(s.key,"thumbm",e,320,95),await this.addImage(s.key,"thumb",e,120,85),await this.addImage(s.key,"placeholder",e,5,25);"granted"===await Notification.requestPermission()&&navigator.serviceWorker.ready.then(t=>{t.showNotification("Guldentop Veldwinkel",{body:`Product ${e.name} saved as: ${s.key}`,link:"https://guldentopveldwinkel.be",data:s.key})}),globalThis.pubsub.publish(`event.${this.ref}`,{type:"add",key:s.key,value:e}),history.back()}get template(){return html`
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
  <slot name="timestamp"></slot>
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
    `}});
