import{d as e}from"./base-49bd4703.js";import"./custom-container-b8612822.js";import"./custom-input-7bdb41b0.js";import"./image-mixin-3ab70175.js";import{P as t}from"./product-editor-mixin-3cc75949.js";import"./custom-date-61d31a4f.js";import"./input-field-a00d2276.js";export default e(class TopOffer extends t{get addFieldIcon(){return this.shadowRoot.querySelector('[icon="add"]')}constructor(){super(),this.ref="offers",this.addField=this.addField.bind(this)}connectedCallback(){let e;super.connectedCallback&&super.connectedCallback(),this.addFieldIcon.addEventListener("click",this.addField),pubsub.subscribe(`event.${this.ref}`,async({value:t,name:s,key:i,type:a})=>{if("edit"===a){let a;a="name"===s||"price"===s?`offerDisplay/${i}/${s}`:`offers/${i}/${s}`,console.log(s,t);const n={...window.offers[this._value],...window.offerDisplay[this._value],image:{...window.images[this._value]}};n[s]=t,await firebase.database().ref(a).set(t);const o=(new Date).getTime();await firebase.database().ref(`offers/${i}/timestamp`).set(o),e&&clearTimeout(e),e=setTimeout(()=>{console.log("changeeeee"),pubsub.publish(`event.${this.ref}`,{type:"change",key:i,value:n}),e=!1},2e3)}})}async addField(){const e=await prompt("please enter field name");if(e){const t=document.createElement("input-field");t.name=e,t.value="",t.ref="offers",t.key=this._value,this.appendChild(t)}}async stamp(){this.innerHTML="",this.nails.clear();const e={...window.offers[this._value],...window.offerDisplay[this._value],image:{...window.images[this._value]}};e.image=await firebase.database().ref(`images/${this._value}`).once("value"),e.image=e.image.val()||[],delete e.image.timestamp,console.log(e);for(const t of Object.keys(e))if("key"===t){const s=document.createElement("span");s.classList.add("key"),s.setAttribute("slot",t),s.innerHTML=`\n        <h4><translated-string>SKU</translated-string></h4>\n        <span class="flex"></span>\n        ${e[t]}\n        `,this.appendChild(s)}else if("image"===t&&e[t]){let s=e[t];if(s)for(const e of Object.keys(s))s[e]&&"thumb"!==e&&"thumbm"!==e&&"placeholder"!==e&&this.nails.add({key:e,src:`https://guldentopveldwinkel.be/ipfs/${s[e]}`})}else if("public"===t)e[t]&&this.publicIcon.setAttribute("public","");else if("timestamp"===t){const s=document.createElement("span");s.classList.add("timestamp"),s.setAttribute("slot",t),s.innerHTML=`\n        <h4><translated-string>last edit</translated-string></h4>\n        <span class="flex"></span>\n        <custom-date lang="nl" value="${e[t]}">${new Date(e[t])}</custom-date>\n        `,this.appendChild(s)}else{const s=document.createElement("input-field");s.name=t,s.value=e[t],s.ref="offers",s.key=this._value,this.appendChild(s)}}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  custom-container {
    overflow-y: auto;
  }
  ::slotted(.column) {
    mixin(--css-column)
    width: 100%;
    min-height: 110px;
  }
  ::slotted(.timestamp) {
    mixin(--css-row)
    mixin(--css-center)
    width: 100%;
    height: 54px;
  }
  ::slotted(*.flex) {
    mixin(--css-flex)
  }
  .toolbar {
    height: 72px;
    box-sizing: border-box;
    padding: 24px;
    width: 100%;
    max-width: 640px;
  }
  [icon="add"] {
    margin-top: 24px;
  }
  .wrapper {
    display: flex;
    box-sizing: border-box;
    padding: 12px 24px 24px;
    width: 100%;
  }
  custom-svg-icon {
    cursor: pointer;
  }
  [public] {
    --svg-icon-color: #4caf50;
  }
  ::slotted(.key) {
    width: 100%;
    mixin(--css-row)
    mixin(--css-center)
  }
  apply(--css-row)
  apply(--css-center)
  apply(--css-flex)
</style>

<custom-container>  
  <slot name="timestamp"></slot>
  <slot name="key"></slot>
  <image-nails></image-nails>
  <slot></slot>
  <span class="wrapper">
    <span class="flex"></span>
    <custom-svg-icon icon="add" title="add info field"></custom-svg-icon>
    <span class="flex"></span>
  </span>
</custom-container>

<shop-admin-action-bar></shop-admin-action-bar>`}});
