

export default define(class ClientProduct extends ElementBase {
  set key(value) {
    ( async () => {
      const snap = await firebase.database().ref(`offers/${value}`).once('value');
      const { name, description, price, photo, type, portion, pieces } = snap.val();
      if (photo) this.shadowRoot.querySelector('img').src = photo;
      this.render({ name, description, price, photo, type, portion, pieces });
    })();
  }
  constructor() {
    super();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 720px) {
    top-icon-button {
      position: fixed;
      bottom: 0;
      height: 54px;
      left: 0;
      right: 0;
      --top-icon-button-border-radius-right: 0;
      --top-icon-button-border-radius-left: 0;
    }
  }
</style>
<img crossorigin="use-credentials"></img>
<h2>${'name'}</h2>
<top-price>${'price'}</top-price>
<summary>${'description'}</summary>

<top-icon-button icon="shopping-cart">add to cart</top-icon-button>
    `;
  }
});
