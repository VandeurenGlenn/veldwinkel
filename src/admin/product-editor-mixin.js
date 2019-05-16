
export default class ProductEditorMixin extends ElementBase {
  get publicIcon() {
    return this.shadowRoot.querySelector('[icon="public"]');
  }
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
}
