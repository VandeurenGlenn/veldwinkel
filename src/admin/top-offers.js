import { ElementBase, define } from './../base.js';
import './top-offer-item.js';

export default define(class TopOffers extends ElementBase {
  get offerDisplay() {
    return window.topstore.databases.get('offerDisplay');
  }

  get offers() {
    return window.topstore.databases.get('offers');
  }

  get images() {
    return window.topstore.databases.get('images');
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
    this._onFabClick = this._onFabClick.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
    this.shadowRoot.querySelector('.container').ondragover = event => {
      event.preventDefault()
    }
    this.shadowRoot.querySelector('.container').ondrop = event => {
      event.preventDefault()
      var data = event.dataTransfer.getData("text");
      console.log(data);
      const node = this.querySelector(`[data-route="${data}"]`)
      console.log(node);
      const clone = document.createElement('top-offer-item')
      console.log(event.target.index === node.index);
      if (event.target.index === node.index) return
      else {
        this.removeChild(node)
        this.insertBefore(clone, event.target)
      }
      console.log(clone);
      clone.key = node.key
      clone.value = node.value
      clone.dataset.route = node.dataset.route
      
      console.log(event);
      const items = Array.from(this.querySelectorAll('top-offer-item'))
      
      items.forEach(async (item, i) => {
        item.index = i
        await firebase.database().ref(`offerDisplay/${item.key}/index`).set(i)
      })
      
      
      console.log(items);
      // this.stamp()
      
      
    }
    this.shadowRoot.querySelector('.fab').addEventListener('click', this._onFabClick);
    
    (async () => {
      await import('./top-offer-item.js')
      window.offerDisplay = await this.offerDisplay.get();
      if(offerDisplay && Object.keys(offerDisplay).length === 0) window.offerDisplay = await this.offerDisplay.get()
      await this.stamp();
    })();
    
    globalThis.pubsub.subscribe('event.offers', async change => {
      let item = this.querySelector(`[data-route=${change.key}]`);
      if (!item) {
        item = document.createElement('top-offer-item');
        this.appendChild(item);
      } 
      if (change.type === 'add') {
        if (!offers[change.key]) offers[change.key] = await this.offers.get(change.key);
        if (!images[change.key]) images[change.key] = await this.images.get(change.key);
        if (!offerDisplay[change.key]) offerDisplay[change.key] = await this.offerDisplay.get(change.key);
        item.key = change.key;
        item.value = change.value
        item.dataset.route = change.key;
        // return this.stamp()
      } else if (change.type === 'change') {
        item.value = change.value
      } else if (change.type === 'public') {
        item.public = change.value
      } else if (change.type === 'delete') {
        delete offers[change.key]
        delete offerDisplay[change.key]
        delete images[change.key]
        this.removeChild(item)
      }
    });
    
    
  }

  _onClick(e) {
    // this.selected =
    const target = e.path[0];
    if (target.localName === 'top-offer-item') this.selected = target.getAttribute('data-route')
    if (this.selected !== this.previousSelected) {
      if (this.previousSelected) this.querySelector(`[data-route="${this.selected}"]`).classList.remove('custom-selected')
      target.classList.add('custom-selected');
      this.previousSelected = this.selected;
      globalThis.adminGo('offer', this.selected);
    } else if (target.localName === 'top-offer-item') {
      globalThis.adminGo('offer', this.selected);
    } else if (target.classList.contains('fab')) {
      window.adminGo('add-offer');
    }

  }

  _onFabClick() {
    
    // window.adminGo('add-offer');
  }

  async stamp() {
    this.innerHTML = ''
    const jobs = [];
    if (!window.offers) window.offers = {}
    if (!window.images) window.images = {}
    if (offerDisplay) {
      let _offerDisplay = []
      for (const offer of Object.keys(offerDisplay)) {
        const index = offerDisplay[offer].index
        _offerDisplay[index] = offerDisplay[offer]
        _offerDisplay[index].key = offer
      }
      console.log(_offerDisplay);
      for (const {key} of _offerDisplay) {
        // jobs.push((async () => {
          if (!offers[key]) offers[key] = await this.offers.get(key);
          if (!images[key]) images[key] = await this.images.get(key);
  
          let item = this.querySelector(`[data-route=${key}]`);
          if (!item) {
            item = document.createElement('top-offer-item');
            item.draggable = true
            item.ondragstart = (ev) => {
              console.log(ev);
              ev.dataTransfer.setData("text", key);
            }
            
            this.appendChild(item);
          }
          item.index = offerDisplay[key].index
          item.key = key;
          item.value = { ...offerDisplay[key], ...offers[key], image: {...images[key]} };
  
          item.dataset.route = key;
        // })())
      }
      // await Promise.all(jobs)
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
    user-select: none;
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
    background: #38464e;
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
