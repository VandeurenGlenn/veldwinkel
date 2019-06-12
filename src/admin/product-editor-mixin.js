
export default class ProductEditorMixin extends ElementBase {
  get publicIcon() {
    return this.shadowRoot.querySelector('[icon="public"]');
  }
  get deleteButton() {
    return this.shadowRoot.querySelector('[icon="delete"]');
  }
  get saveButton() {
    return this.shadowRoot.querySelector('[icon="save"]');
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
    this._onNailUpload = this._onNailUpload.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onPublic = this._onPublic.bind(this);
    this._onSave = this._onSave.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (this._value) this.stamp();
    this.nails.addEventListener('image-swiped', this._onNailSwipe);
    this.nails.addEventListener('nail-upload', this._onNailUpload);
    this.publicIcon.addEventListener('click', this._onPublic);
    this.saveButton.addEventListener('click', this._onSave);
    this.deleteButton.addEventListener('click', this._onDelete);
  }

  async _onSave() {
    console.log('save');
    const inputs = Array.from(this.querySelectorAll('custom-input'));
    const images = Array.from(this.nails.querySelectorAll('img'));
    inputs.forEach((input) => {
      const name = input.getAttribute('name');
      if (name === 'name' || name === 'price' || name === 'public') {
        firebase.database().ref(`offerDisplay/${this._value}/${name}`).set(input.value);
      } else {
        firebase.database().ref(`offers/${this._value}/${name}`).set(input.value);
      }
    });
    const pub = this.publicIcon.hasAttribute('public');

    await firebase.database().ref(`offerDisplay/${this._value}/public`).set(pub);
    images.forEach((img, i) => {
      const key = img.getAttribute('key');
      if (key) {
        if (i === 0) firebase.database().ref(`offerDisplay/${this._value}/image/${key}`).set(img.src);
        else firebase.database().ref(`offers/${this._value}/image/${key}`).set(img.src);
      } else {
        if (i === 0) firebase.database().ref(`offerDisplay/${this._value}/image`).push(img.src);
        else firebase.database().ref(`offers/${this._value}/image`).push(img.src);
      }
    });
  }

  async _onNailUpload({ detail }) {
    let snap = await firebase.database().ref(`offerDisplay/${this._value}/image`);
    if (!snap.value) snap = await firebase.database().ref(`offerDisplay/${this._value}/image`).push(detail);
    else snap = await firebase.database().ref(`offers/${this._value}/image`).push(detail);
    this.nails.add({ src: detail, key: snap.key });
  }

  _onPublic() {
    if (this.publicIcon.hasAttribute('public')) this.publicIcon.removeAttribute('public');
    else this.publicIcon.setAttribute('public', '');
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
}
