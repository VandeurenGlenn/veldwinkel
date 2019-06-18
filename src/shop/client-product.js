import './../custom-container.js';

export default define(class ClientProduct extends ElementBase {
  set key(value) {
    ( async () => {
      firebase.database().ref(`images/${value}`).once('value').then(images => {
        images = images.val();
        if (images) {
          for (const img of Object.keys(images)) {
            if (img !== 'thumb') {
              if (images[img]) this.shadowRoot.querySelector('img').src = `${functionsRoot}/api/thumb/${images[img]}`;
            }
          }
        }
      });
      let snap = await firebase.database().ref(`offers/${value}`).once('value');
      snap = snap.val();
      let snapd = await firebase.database().ref(`offerDisplay/${value}`).once('value');
      snapd = snapd.val();
      const { name, description, price, photo, type, portion, pieces } = {...snapd, ...snap};



      this.render({ name, description, price, type, portion, pieces });
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

  .row {
    padding-top: 48px;
    mixin(--css-row)
    width: 100%;
  }
  summary {
    width: 100%;
  }
  apply(--css-flex)

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
<custom-container>
  <img></img>
  <span class="row">
    <h2>${'name'}</h2>
    <span class="flex"></span>
    <top-price>${'price'}</top-price>
  </span>
  <summary>${'description'}</summary>
  <span class="flex"></span>
  <top-icon-button icon="shopping-cart">add to cart</top-icon-button>
</custom-container>
    `;
  }
});
