import{d as t,E as e}from"./base-49bd4703.js";t(class CustomContainer extends e{constructor(){super()}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 24px 24px 48px;
  }
  :host([row]) {
    flex-direction: column;
  }
  @media (min-width: 640px) {
    ::slotted(*) {
      max-width: 640px;
    }
  }
</style>
<slot></slot>
    `}}),(()=>{customElements.define("custom-input",class CustomInput extends HTMLElement{static get observedAttributes(){return["placeholder","value","type","autocomplete","name"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.template}set autocomplete(t){this.input.setAttribute("autocomplete",t)}set name(t){this.input.setAttribute("name",t)}set type(t){this.input.setAttribute("type",t)}set placeholder(t){this.input.setAttribute("placeholder",t)}set value(t){this.input.setAttribute("value",t)}get autocomplete(){return this.input.autocomplete}get input(){return this.shadowRoot.querySelector("input")}get value(){return this.input.value}get name(){return this.input.name}addListener(t,e){"input"===t||"change"===t||"value"===t?this.input.addEventListener(t,e):this.addEventListener(t,e)}attributeChangedCallback(t,e,n){e!==n&&(this[t]=n)}get template(){return'\n        <style>\n          :host {\n            display: flex;\n            align-items: center;\n            height: var(--custom-input-height, 48px);\n            background: var(--custom-input-background, transparent);\n            width: 100%;\n            box-shadow: 0px 1px 3px -1px #333;\n            min-width: 240px;\n          }\n          input {\n            --webkit-visibility: none;\n            border: none;\n            background: transparent;\n            height: var(--custom-input-height, 48px);\n            width: 100%;\n            box-sizing: border-box;\n            padding: 10px;\n            color: inherit;\n          }\n        </style>\n        <slot name="before"></slot>\n        <input></input>\n        <slot name="after"></slot>\n      '}})})();
