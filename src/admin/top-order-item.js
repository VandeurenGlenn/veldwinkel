import { ElementBase, define } from './../base.js';
export default define(class TopOrderItem extends ElementBase {
  set value({key, order}) {
    console.log(order);
    this.setAttribute('data-route', key);
    this.user = order.user;
    if (order.ready) {
      this.setAttribute('ready', '');
    }
    this.surname = order.payer.name.surname;
    this.given_name = order.payer.name.given_name;
    
    const total = order.products.length;
    // this.stamp();
    this.render({surname: this.surname, given_name: this.given_name, total, key: key.slice(key.length - 6, key.length)})
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
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    height: 96px;
    pointer-events: auto;
    cursor: pointer;
    padding: 24px 24px;
    box-sizing: border-box;
    mixin(--css-column)
  }

  .flex {
    flex: 1;
  }
  .flex2 {
    flex: 2;
  }
  .filler {
    display: block;
    min-width: 240px;
  }
  input {
    width: 100px;
  }
  h4, p, span {
    margin: 0;
    pointer-events: none;
  }
  
  .row {
    padding-top: 6px;
    display: flex;
    mixin(--css-center)
    width: 100%;
  }

  :host([ready]) {
    background: #8BC34A;
  }
</style>
<span class="row"><h4 style="padding-right: 4px;">${'surname'}</h4><h4>${'given_name'}</h4></span>
<span class="row">
  <h4>${'key'}</h4>
  <span class="flex"></span>
  <h4>${'total'}</h4>
</span>

`;
  }
})
