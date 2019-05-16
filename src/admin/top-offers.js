import { ElementBase, define } from './../base.js';
import './top-offer-item.js';

export default define(class TopOffers extends ElementBase {
  get offerDisplay() {
    return {
      get: () => new Promise((resolve, reject) => {
        const value = localStorage.getItem('offerDisplay');
        resolve(JSON.parse(value));
      }),
      set: (value) => {
        return new Promise((resolve, reject) => {
          localStorage.setItem('offerDisplay', JSON.stringify(value));
          resolve();
        });
      }
    };
  }

  get offers() {
    return {
      get: () => new Promise((resolve, reject) => {
        const value = localStorage.getItem('offers');
        resolve(JSON.parse(value));
      }),
      set: (value) => {
        return new Promise((resolve, reject) => {
          localStorage.setItem('offers', JSON.stringify(value));
          resolve();
        });
      }
    };
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onFabClick = this._onFabClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
    this.shadowRoot.querySelector('.fab').addEventListener('click', this._onFabClick);

    (async () => {
      await import('./top-offer-item.js')
      window.offerDisplay = window.offerDisplay || await this.offerDisplay.get();
      if (offerDisplay) {
        window.offers = window.offers || await this.offers.get();
        await this.stamp();
      }
      try {
        const snap = await firebase.database().ref('offerDisplay').once('value');
        window.offerDisplay = snap.val();
        this.stamp();
        await this.offerDisplay.set(offerDisplay);
      } catch (e) {
        console.log('offline');
      }
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

  async stamp() {
    if (!window.offers) window.offers = [];
    for (const offer of Object.keys(offerDisplay)) {
      if (!offers[offer]) {
        const snap = await firebase.database().ref(`offers/${offer}`).once('value');
        offers[offer] = snap.val();
      }
      let item = this.querySelector(`data-route[offer]`);
      if (!item) {
        item = document.createElement('top-offer-item');
        this.appendChild(item);
      }
      item.value = { ...offerDisplay[offer], ...offers[offer]};
      item.key = offer;
      item.dataset.route = offer;
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
