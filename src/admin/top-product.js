import { ElementBase, define } from './../base.js';
import './../image-nails.js';
import './../custom-container.js';
import './../translated-string';
import './../../node_modules/custom-input/custom-input.js';

export default define(class TopProduct extends ElementBase {
  get deleteButton() {
    return this.shadowRoot.querySelector('[icon="delete"]');
  }
  get nails() {
    return this.shadowRoot.querySelector('image-nails');
  }
  set value(value) {
    this._value = value;
    if (this.rendered) this.stamp();
  }

  constructor() {
    super();
    this._onNailSwipe = this._onNailSwipe.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (this._value) this.stamp();
    this.nails.addEventListener('image-swiped', this._onNailSwipe);
    this.deleteButton.addEventListener('click', this._onDelete);
  }

  async _onDelete() {
    const answer = await confirm('are you sure you want to remove this product?');
    if (answer) {
      firebase.database().ref(`products/${this._value}`).set(null);
      adminGo('products');
    }
  }

  _onNailSwipe({ detail }) {
    let key;
    if (detail) key = detail.getAttribute('key');
    if (key) {
      firebase.database().ref(`products/${this._value}/image/${key}`).set(null);
    }
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
            this.nails.add({ key, src });
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
    overflow-y: auto;
  }
  .column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
<custom-container>
<header>
  <span class="flex"></span>
  <custom-svg-icon icon="delete"></custom-svg-icon>
</header>

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
</custom-container>`;
  }
});
