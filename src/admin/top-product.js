import { ElementBase, define } from './../base.js';
import ProductEditorMixin from './product-editor-mixin.js';
import './../image-nails.js';
import './../custom-container.js';
import './../translated-string';
import './../../node_modules/custom-input/custom-input.js';


export default define(class TopProduct extends ProductEditorMixin {
  set value(value) {
    this._value = value;
    if (this.rendered) this.stamp();
  }

  constructor() {
    super();
    this.ref = 'products';
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (this._value) this.stamp();
  }

  stamp() {
    this.innerHTML = '';
    this.nails.innerHTML = '';
    firebase.database().ref(`products/${this._value}`).once('value').then((snap) => {
      const value = snap.val();
      console.log({ value });
      for (const item of Object.keys(value)) {
        console.log(value[item]);
        let val = value[item];
        if (item === 'image') {
          if (typeof val === 'object') val = [...Object.entries(val)];
          if (!Array.isArray(val)) val = [val];
          val.forEach(([key, src]) => {
            console.log(key, src);
            this.nails.add({ key, src: `https://ipfs.io/ipfs/${src}` });
          });
        } else {
          if (item !== 'packageCount') {
            const input = this.shadowRoot.querySelector(`custom-input[name="${item}"]`);
            input.value = val;
          } else {
            this.packageCount = val;
          }
        }

        // this.innerHTML += `${item}: <br>${value[item]}<br><br>`
      }
      // this.innerHTML = JSON.stringify(snap.val());
      this.render({ packageCount: this.packageCount });
    });
  }
  get template() {
    return html`
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
  <span name="packageCount">${'packageCount'}</span>
</span>
</custom-container>

<shop-admin-action-bar></shop-admin-action-bar>`;
  }
});
