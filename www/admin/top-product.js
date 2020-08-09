import{d as t}from"./base-49bd4703.js";import"./translated-string-6e8cd549.js";import"./custom-input-b2e10efd.js";import"./image-mixin-bc9c72cf.js";import{P as s}from"./product-editor-mixin-a2de97d5.js";export default t(class TopProduct extends s{set value(t){this._value=t,this.rendered&&this.stamp()}constructor(){super(),this.ref="products"}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._value&&this.stamp()}stamp(){this.innerHTML="",this.nails.innerHTML="",firebase.database().ref(`products/${this._value}`).once("value").then(t=>{const s=t.val();console.log({value:s});for(const t of Object.keys(s)){console.log(s[t]);let e=s[t];if("image"===t)"object"==typeof e&&(e=[...Object.entries(e)]),Array.isArray(e)||(e=[e]),e.forEach(([t,s])=>{console.log(t,s),this.nails.add({key:t,src:`https://ipfs.io/ipfs/${s}`})});else if("packageCount"!==t){this.shadowRoot.querySelector(`custom-input[name="${t}"]`).value=e}else this.packageCount=e}this.render({packageCount:this.packageCount})})}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  custom-input {
    color: #eee;
    /* box-shadow: 0px 1px 3px 1px #eee; */
    border: 1px solid #38464e;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
  custom-container {
    overflow-y: auto;
  }
  .column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
<custom-container>

<image-nails></image-nails>

<span class="column">
  <h4><translated-string>name</translated-string></h4>
  <custom-input name="name" type="text"></custom-input>
</span>

<span class="column">
  <h4><translated-string>description</translated-string></h4>
  <custom-input name="description" type="text"></custom-input>
</span>

<span class="column">
  <h4><translated-string>portion</translated-string></h4>
  <custom-input name="portion" type="text"></custom-input>
</span>

<span class="column">
  <h4><translated-string>stockCount</translated-string></h4>
  <custom-input name="stockCount" type="number"></custom-input>
</span>
<span class="column">
  <h4><translated-string>packageCount</translated-string></h4>
  <span name="packageCount">${"packageCount"}</span>
</span>
</custom-container>

<shop-admin-action-bar></shop-admin-action-bar>`}});
