import { ElementBase, define } from './../base.js';
export default define(class TopOfferItem extends ElementBase {
  get _publicIcon() {
    return this.shadowRoot.querySelector('custom-svg-icon[icon="public"]');
  }

  set value(value) {
    this._value = value;
    console.log(value);
    this.name = value.name || 'missing name';
    this.per = value['per'];
    this.description = value['omschrijving'];
    this.price = value['prijs'];
    this.image = value['foto'];
    this.type = value['type'];
    if (value.public) this._publicIcon.setAttribute('public', '');
    const title = this.name;
    this.name = this.name.slice(0, 31);
    if (this.name.length < title.length) {
      this.name += '...';
      this.shadowRoot.querySelector('.name').setAttribute('title', title);
    }
    // this.stamp();
    this.render({ name: this.name });
  }

  set key(value) {
    this._key = value;
  }

  constructor() {
    super();
  }

  boolify(value) {
    switch (value) {
      case '':
      case 0:
      case null:
      case undefined:
      case false:
        return false;
        break;
      default:
        return true;
    }
  }

  get template() {
    return html`<style>
  :host {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    height: 64px;
    pointer-events: auto;
    cursor: pointer;
    padding: 0 24px;
    align-items: center;
    box-sizing: border-box;
  }

  [public] {
    --svg-icon-color: #4caf50;
  }

  .flex {
    flex: 1;
  }
  .filler {
    display: block;
    min-width: 240px;
  }
  input {
    width: 100px;
  }
  h4, p, span {
    pointer-events: none;
  }
  .row {
    width: 100%;
  }
  apply(--css-row)
  apply(--css-center)
</style>

<span class="row center">
  <h4 class="name center">${'name'}</h4>
  <span class="flex"></span>
  <custom-svg-icon icon="public"></custom-svg-icon>
</span>
`;
  }
});
