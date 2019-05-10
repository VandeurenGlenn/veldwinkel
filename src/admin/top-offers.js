import { ElementBase, define } from './../base.js';
import './top-offer-item.js';

export default define(class TopOffers extends ElementBase {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onFabClick = this._onFabClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    (async () => {
      const snap = await firebase.database().ref('offers').once('value');
      window.offers = snap.val();
      await import('./top-offer-item.js')
      this.stamp();
      this.addEventListener('click', this._onClick);
      this.shadowRoot.querySelector('.fab').addEventListener('click', this._onFabClick);
    })();
  }

  _onClick(e) {
    // this.selected =
    const target = e.path[0];
    if (target.localName === 'top-offer-item') this.selected = target.getAttribute('data-route')
    if (this.selected !== this.previousSelected) {
      if (this.previousSelected) this.querySelector(`[data-route="${this.selected}"]`).classList.remove('custom-selected')
      target.classList.add('custom-selected');
      this.previousSelected = this.selected;
      window.adminGo('offer', this.selected);
    }

  }

  _onFabClick() {
    console.log('e');
    window.adminGo('add-offer');
  }

  stamp() {
    let index = 0;
    for (const product of offers) {
      let item = this.querySelector('index[index]');
      if (!item) {
        item = document.createElement('top-offer-item');
        this.appendChild(item);
      }
      item.value = product;
      item.key = index;
      item.dataset.route = index;
      ++index;
    }
  }

  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .flex {
    flex: 1;
  }
  header {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    width: 100%;
  }
  .name {
    min-width: 240px;
  }
  .fab {
    display: flex;
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 48px;
    min-width: 110px;
    border: 1px solid #888;
    border-radius: 28px;
    box-sizing: border-box;
    padding: 12px;
  }
  ::slotted(:nth-of-type(odd)) {
    background: #eee;
  }
</style>
<span class="fab">
  <custom-svg-icon icon="add"></custom-svg-icon>
  <span class="flex"></span>
  add
</span>

<header>
    <custom-svg-icon icon="filter-list"></custom-svg-icon>
    <span class="flex"></span>
    <custom-svg-icon icon="mode-edit"></custom-svg-icon>
    <custom-svg-icon icon="search"></custom-svg-icon>

</header>
<header>
  <h4 class="name">naam</h4>
  <span class="flex"></span>
  <h4>voorraad</h4>
  <span class="flex"></span>
  <h4>in pakket</h4>
</header>
<span class="container">
  <slot></slot>
</span>`;
  }
});
