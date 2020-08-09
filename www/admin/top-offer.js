import{d as e}from"./base-49bd4703.js";import"./custom-input-b2e10efd.js";import"./image-mixin-bc9c72cf.js";import{P as t}from"./product-editor-mixin-a2de97d5.js";import"./custom-date-61d31a4f.js";customElements.define("input-field",class InputField extends HTMLElement{static get observedAttributes(){return["name","value"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.template}set name(e){this.shadowRoot.querySelector("translated-string").innerHTML=e,this.shadowRoot.querySelector("custom-input").name=e,this.setAttribute("name",e)}set value(e){this.shadowRoot.querySelector("custom-input").value=e,this.setAttribute("value",e)}set key(e){this.setAttribute("key",e)}set ref(e){this.setAttribute("ref",e)}get name(){return this.getAttribute("name")}get value(){return this.shadowRoot.querySelector("custom-input").value}get key(){return this.getAttribute("key")}get ref(){return this.getAttribute("ref")}render(){this.shadowRoot.querySelector("custom-input").value=value}attributeChangedCallback(e,t,s){t!==s&&(this[e]=s)}connectedCallback(){let e;this.shadowRoot.querySelector("custom-input").shadowRoot.querySelector("input").addEventListener("input",()=>{e&&clearTimeout(e),e=setTimeout(()=>{pubsub.publish("event.offers",{type:"edit",key:this.key,name:this.name,value:this.value}),e=!1},2e3)})}get template(){return`<style>\n      :host {\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n      }\n      \n      custom-input {\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 5px 0 rgba(0, 0, 0, 0.12),\n                    0 3px 1px -2px rgba(0, 0, 0, 0.2);\n        border: 1px solid #38464e;\n      }\n    </style>\n    <h4><translated-string>${this.name}</translated-string></h4>\n    <custom-input type="text"></custom-input>\n    `}});export default e(class TopOffer extends t{get addFieldIcon(){return this.shadowRoot.querySelector('[icon="add"]')}constructor(){super(),this.ref="offers",this.addField=this.addField.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.addFieldIcon.addEventListener("click",this.addField),pubsub.subscribe(`event.${this.ref}`,async({value:e,name:t,key:s,type:i})=>{if("edit"===i){let i;i="name"===t||"price"===t?`offerDisplay/${s}/${t}`:`offers/${s}/${t}`,console.log(t,e),offer[t]=e,await firebase.database().ref(i).set(e),timeout&&clearTimeout(timeout),timeout=setTimeout(()=>{console.log("changeeeee"),pubsub.publish(`event.${this.ref}`,{type:"change",key:s,value:offer}),timeout=!1},2e3)}})}async addField(){const e=await prompt("please enter field name");if(e){const t=document.createElement("input-field");t.name=e,t.value="",t.ref="offers",t.key=this._value,this.appendChild(t)}}async stamp(){this.innerHTML="",this.nails.clear();const e={...window.offers[this._value],...window.offerDisplay[this._value],image:{...window.images[this._value]}};console.log({offer:e},this._value),e.image=await firebase.database().ref(`images/${this._value}`).once("value"),e.image=e.image.val()||[],console.log({offer:e},this._value),delete e.image.timestamp,console.log(Object.keys(e));for(const t of Object.keys(e))if("image"===t&&e[t]){let s=e[t];if(s)for(const e of Object.keys(s))s[e]&&"thumb"!==e&&"thumbm"!==e&&"placeholder"!==e&&this.nails.add({key:e,src:`https://guldentopveldwinkel.be/ipfs/${s[e]}`})}else if("public"===t)e[t]&&this.publicIcon.setAttribute("public","");else if("timestamp"===t){const s=document.createElement("span");s.classList.add("timestamp"),s.setAttribute("slot",t),s.innerHTML=`\n        <h4><translated-string>last edit</translated-string></h4>\n        <span class="flex"></span>\n        <custom-date lang="nl" value="${e[t]}">${new Date(e[t])}</custom-date>\n        `,this.appendChild(s)}else{const s=document.createElement("input-field");s.name=t,s.value=e[t],s.ref="offers",s.key=this._value,this.appendChild(s)}}get template(){return html`
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
  apply(--css-row)
  apply(--css-center)
  apply(--css-flex)
</style>

<custom-container>
  <slot name="timestamp"></slot>
  <image-nails></image-nails>
  <slot></slot>
  <span class="wrapper">
    <span class="flex"></span>
    <custom-svg-icon icon="add" title="add info field"></custom-svg-icon>
    <span class="flex"></span>
  </span>
</custom-container>

<shop-admin-action-bar></shop-admin-action-bar>`}});
