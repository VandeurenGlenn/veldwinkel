export default define(class TopCollectionItem extends ElementBase {
  set value({ key, order }) {
    console.log({ key, order });
    this.setAttribute('data-route', key);
    this.user = order.user;
    if (order.ready) {
      this.setAttribute('ready', '');
    }
    this.name = `${order.payer.name.surname} ${order.payer.name.given_name}`;
    const total = order.products.length;
    // this.stamp();
    this.render({ name: this.name, total });
    this.setAttribute('key', key)

    // <span style="display: flex;">${orders[order][0].referentie}<span style="flex"></span>${order}<span style="flex: 1;"></span>producten: ${orders[order].length - 1}</span>
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
    mixin(--css-center)
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
</style>
<h4>${'name'}</h4>
<span class="flex"></span>
<h4>${'total'}</h4>
`;
  }
});
