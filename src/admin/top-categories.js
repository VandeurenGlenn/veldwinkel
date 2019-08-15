import { ElementBase, define } from './../base.js';
import './top-offer-item.js';

export default define(class TopCategories extends ElementBase {
  get categories() {
    return window.topstore.databases.get('categories');
  }

  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);

    (async () => {
      await import('./top-offer-item.js')
      window.categories = await this.categories.get();
      if(categories && Object.keys(categories).length === 0) window.categories = await this.categories.get()
      await this.stamp();
    })();
  }

  async stamp() {
    // if (!window.offers) await this.offers.get();
    // if (!window.images) await this.images.get();
    const jobs = [];
    if (categories) {
      for (const offer of Object.keys(categories)) {
        jobs.push((async () => {
          if (!offers[offer]) offers[offer] = await this.offers.get(offer);
          if (!images[offer]) images[offer] = await this.images.get(offer);
  
          let item = this.querySelector(`data-route[offer]`);
          if (!item) {
            item = document.createElement('top-offer-item');
            this.appendChild(item);
          }
          item.key = offer;
          item.value = { ...categories };
  
          item.dataset.route = offer;
        })())
      }  
    }
    

    Promise.all(jobs)
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

<header>
  <custom-svg-icon icon="filter-list"></custom-svg-icon>
  <span class="flex"></span>
  <custom-svg-icon icon="search"></custom-svg-icon>
</header>
<!-- <header>
  <h4 class="name">naam</h4>
  <span class="flex"></span>
</header> -->
<span class="container">
  <slot></slot>
</span>`;
  }
});
