import { ElementBase, define } from './../base.js';
import ProductEditorMixin from './product-editor-mixin.js';
import './../image-nails.js';
import './../custom-container.js';
import './../../node_modules/custom-input/custom-input.js';
import './../../node_modules/@vandeurenglenn/custom-date/custom-date.js';

import './input-field.js'

export default define(class TopOffer extends ProductEditorMixin {
  get addFieldIcon() {
    return this.shadowRoot.querySelector('[icon="add"]');
  }
  constructor() {
    super();
    this.ref = 'offers';
    this.addField = this.addField.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.addFieldIcon.addEventListener('click', this.addField);
    
    pubsub.subscribe(`event.${this.ref}`, async ({value, name, key, type}) => {
      if (type === 'edit') {
        let ref
        if (name === 'name' || name === 'price') ref = `offerDisplay/${key}/${name}`
        else ref = `offers/${key}/${name}`;  
        
        console.log(name, value);
        offer[name] = value
        await firebase.database().ref(ref).set(value)
        
      if (timeout) clearTimeout(timeout)
      
        timeout = setTimeout(() => {
          console.log('changeeeee');
          pubsub.publish(`event.${this.ref}`, {type: 'change', key, value: offer})
          timeout = false
        }, 2000);
        
      }
      
    })
  }

  async addField() {
    const name = await prompt('please enter field name');
    if (name) {
      const field = document.createElement('input-field');
      field.name = name
      field.value = ''
      field.ref = 'offers'
      field.key = this._value
      this.appendChild(field)
    }
  }

  async stamp() {
    this.innerHTML = '';
    this.nails.clear()
    const offer = {...window.offers[this._value], ...window.offerDisplay[this._value], image: { ...window.images[this._value] }};
    console.log({offer}, this._value);
    
    offer.image = await firebase.database().ref(`images/${this._value}`).once('value');
    
    offer.image = offer.image.val() || [];  
    console.log({offer}, this._value);
    delete offer.image.timestamp;
console.log(Object.keys(offer));
    let timeout;
    for (const i of Object.keys(offer)) {
      if (i === 'image' && offer[i]) {
        let val = offer[i];
        if (val) for (const key of Object.keys(val)) {
          if (val[key] && key !== 'thumb' && key !== 'thumbm' && key !== 'placeholder') this.nails.add({ key, src: `https://guldentopveldwinkel.be/ipfs/${val[key]}` });
        }
      } else if (i === 'public') {
        if (offer[i]) this.publicIcon.setAttribute('public', '')
      } else if (i === 'timestamp') {
        const span = document.createElement('span');
        span.classList.add('timestamp');
        span.setAttribute('slot', i)
        span.innerHTML = `
        <h4><translated-string>last edit</translated-string></h4>
        <span class="flex"></span>
        <custom-date lang="nl" value="${offer[i]}">${new Date(offer[i])}</custom-date>
        `;
        this.appendChild(span);
      } else {
        const field = document.createElement('input-field');
        field.name = i
        field.value = offer[i]
        field.ref = 'offers'
        field.key = this._value
        this.appendChild(field)
      }
    }
  }

  get template() {
    return html`
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

<shop-admin-action-bar></shop-admin-action-bar>`;
  }
});
