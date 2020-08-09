import{d as e}from"./selector-mixin-ac7e516c.js";import{E as t}from"./base-e9eb045d.js";import"./select-mixin-bf4ecf3c.js";export default e(class TopBox extends t{static get observedAttributes(){return["value"]}set value(e){this.rendered&&(this._value=e)}constructor(){super()}connectedCallback(){super.connectedCallback(),this._value||(this.value=this.getAttribute("value"))}attributeChangedCallback(e,t,s){t!==s&&(this[e]=s)}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
  }
</style>

    `}});
