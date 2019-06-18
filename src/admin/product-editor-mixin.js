
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
    this._onNailUpload = this._onNailUpload.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onPublic = this._onPublic.bind(this);
    this._onSave = this._onSave.bind(this);
    this.ref = 'products';
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (this._value) this.stamp();
    this.nails.addEventListener('nail-upload', this._onNailUpload);
    this.publicIcon.addEventListener('click', this._onPublic);
    this.saveButton.addEventListener('click', this._onSave);
    this.deleteButton.addEventListener('click', this._onDelete);
  }

  async _onSave() {
    console.log('save');
    const value  = {};
    const inputs = Array.from(this.querySelectorAll('custom-input'));
    let image = Array.from(this.nails.querySelectorAll('img'));
    value.image = {};
    image = image.map((img, i) => {
      let src;
      if (img.src.indexOf('base64') !== -1) src = img.src.split(',')[1];
      else src = img.src.replace(`${window.functionsRoot}/api/thumb/`, '');
console.log(img.getAttribute('key'));
      value.image[img.getAttribute('key')] = src;
    })
    inputs.forEach((input) => value[input.getAttribute('name')] = input.value);
    const pub = this.publicIcon.hasAttribute('public');

    const body = JSON.stringify({
      ...value,
      key: this._value,
      public: pub
    });
    const url = `${window.functionsRoot}/api/${this.ref}`;
    const options = {
      method: 'PATCH',
      body,
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    };
    await fetch(url, options)
    history.back();
  }

  async _onNailUpload({ detail }) {
    this.nails.add({ src: detail, key: this.nails.children.length > 0 ? this.nails.children.length - 1 : 0 });
  }

  _onPublic() {
    if (this.publicIcon.hasAttribute('public')) this.publicIcon.removeAttribute('public');
    else this.publicIcon.setAttribute('public', '');
  }

  async _onDelete() {
    const answer = await confirm('are you sure you want to remove this product?');
    if (answer) {
      const body = JSON.stringify({
        key: this._value
      });
      const url = `${window.functionsRoot}/api/${this.ref}`;
      const options = {
        method: 'DELETE',
        body,
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
      };
      await fetch(url, options)
      history.back();
    }
  }
}
