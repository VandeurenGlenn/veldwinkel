import { define, ElementBase } from './../base.js';
import './../../node_modules/custom-svg-icon/src/custom-svg-icon.js';
import './../../node_modules/custom-pages/src/custom-pages.js';
import './../../node_modules/custom-tabs/src/custom-tabs.js';
import './../../node_modules/custom-tabs/src/custom-tab.js';
import './../../node_modules/custom-selector/src/index.js';
import './../../node_modules/custom-drawer/custom-drawer.js';
import './../translator.js';
import './../translated-string.js';
import OADBManager from './../oadb-manager.js';
import PubSub from './../../node_modules/@vandeurenglenn/little-pubsub/src/index.js'

globalThis.pubsub = new PubSub()
// import './top-products.js';
// import './top-orders.js';
// import './input-fields.js';



export default define(class AdminShell extends ElementBase {
  get pages() {
    return this.querySelector('custom-pages');
  }
  get selector() {
    return this.shadowRoot.querySelector('custom-selector');
  }
  get drawer() {
    return this.shadowRoot.querySelector('custom-drawer');
  }
  get translatedTitle() {
    return this.shadowRoot.querySelector('translated-string[name="title"]');
  }
  set drawerOpened(value) {
    if (value) this.setAttribute('drawer-opened', '');
    else this.removeAttribute('drawer-opened');
  }
  get drawerOpened() {
    return this.hasAttribute('drawer-opened');
  }

  get menuIcon() {
    return this.shadowRoot.querySelector('.menu');
  }
  constructor() {
    super();
    this._selectorChange = this._selectorChange.bind(this);
    this._menuClick = this._menuClick.bind(this);
    this._onPopstate = this._onPopstate.bind(this);
    this.drawerOpened = false;
    
    window.onpopstate = this._onPopstate
    window.topstore = window.topstore || {};
    window.topstore.databases = window.topstore.databases || new OADBManager(false);
    window.topstore.upgrade = async (target) => {
      const url = 'http://localhost:5000/topveldwinkel/us-central1/api/add/offer';

      let offers = await firebase.database().ref('offers').once('value');
      offers = offers.val();
      for (const o of Object.keys(offers)) {
        let value = await firebase.database().ref(`offerDisplay/${o}`).once('value');
        value = value.val();
        const body = JSON.stringify({...value, ...offers[o]});

        const options = {
          method: 'POST',
          body,
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' }
        };
        await fetch(url, options)
      }

    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (matchMedia('(min-width: 720px)').matches) this.drawerOpened = true;
    document.addEventListener('mouseup', e => {
      if (matchMedia('(max-width: 641px)').matches && this.drawerOpened && !e.path[0].hasAttribute('subber')) this.drawerOpened = false;
    });
    this.translatedTitle.value = this.selector.selected;
    this.selector.addEventListener('selected', this._selectorChange);
    this.menuIcon.addEventListener('click', this._menuClick);
    
    
    globalThis.adminGo = async (view, selection) => {
    if (selection && view === 'product') {
      await import('./top-product.js');
      const product = document.querySelector('top-product');
      product.value = selection;
    } else if (selection && view === 'offer') {
      await import('./top-offer.js');
      const offer = document.querySelector('top-offer');
      offer.value = selection;
    } else if (selection && view === 'order') {
      await import('./top-order.js');
      const order = document.querySelector('top-order');
      order.value = selection;
    } else if (view === 'add-product' || view === 'add-offer') {
      await import(`./${view}.js`);
    } else if (view === 'collection') {
      await import('./top-collection.js');
      const collection = document.querySelector('top-collection');
      collection.value = selection;
    } else if (view === 'settings') {
      await import('./sections/settings.js');
      const settings = document.querySelector('settings-section');
      // collection.value = selection;
    }

    history.pushState({selected: view}, view, `#${view}`);
    this.pages.select(view);
    }
    
    if (window.location.hash) {
      let route = window.location.hash.split('#');
      route = route[1].split('?');
      this.selector.select(route[0]);
      if (route[1]) {
        const parts = route[1].split('=');
        
        this.pages.querySelector(`[route="${route[0]}"]`).value = parts[1]
        globalThis.adminGo(route[0], parts[1])
      } else {
        globalThis.adminGo(route[0])
      }
      
    } else {
      this.selector.select('orders');
      
    }
    this._selectorChange();
    this._preload()
  }

  async _preload() {
    console.log('loaded');
    try {
      // window.exports = {};
      // await importScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.1');
      // await importScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@1.0.0');
      // window.model = await mobilenet.load()

      // await window.model
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  _onPopstate() {
    console.log('pop');
    if (history.state) this.selector.select(history.state.selected);
    this._selectorChange();
  }

  _menuClick() {
    this.drawerOpened = !this.drawerOpened;
  }

  async _selectorChange() {
    const selected = this.selector.selected;
    if (selected) {
      const prefix = './'
      if (selected === 'products') await import(`${prefix}top-products.js`);
      if (selected === 'sheet') await import(`${prefix}top-sheet.js`);
      if (selected === 'offers') await import(`${prefix}top-offers.js`);
      if (selected === 'orders') await import(`${prefix}top-orders.js`);
      if (selected === 'collections') await import(`${prefix}top-collections.js`);
      if (selected === 'categories') await import(`${prefix}top-categories.js`);
      if (selected === 'catalog' || selected === 'offers' ||
          selected === 'products' || selected === 'categories') {
        let items = Array.from(this.shadowRoot.querySelectorAll('[menu-item="catalog"]'))
        items = [ ...items, this.shadowRoot.querySelector('[data-route="catalog"]')]
        if (selected === 'catalog') {
          if (items[0].hasAttribute('shown')) {
            for (const item of items) {
              item.removeAttribute('shown')
            }
          } else {
            for (const item of items) {
              item.setAttribute('shown', '')
            }
          }  
        } else {
          for (const item of items) {
            item.setAttribute('shown', '')
          }
        }
        
      }
      if (selected !== 'catalog') {
        this.translatedTitle.value = selected;
        this.pages.select(selected);
        history.pushState({selected}, selected, `#${selected}`);  
      }
      
    }
  }

  get template() {
    return html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;
        color: #eee;
        background: #445c68;
        --svg-icon-color: #eee;
      }
      custom-drawer {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        transform: translateX(-105%);
        background: #1a1f229e;
      }
      ::slotted(custom-pages) {
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        top: 56px;
        left: 0;
        background: #1a1f229e;
      }
      translated-string[name="title"] {
        padding-left: 12px;
        text-transform: uppercase;
      }
      header {
        display: flex;
        align-items: center;
        height: 56px;
        min-height: 56px;
        background: #38464e;
        position: absolute;
        box-sizing: border-box;
        right: 0;
        width: 100%;
        padding: 24px;
        color: #eee;
      }
      custom-drawer header {
        position: relative;
        justify-content: center;
      }
      :host([drawer-opened]) custom-drawer {
        opacity: 1;
        transform: translateX(0);
      }
      header h3 {
        margin: 0;
        font-size: 20px;
      }
      custom-drawer .selection {
        height: 56px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 12px;
        text-transform: uppercase;
        cursor: pointer;
        color: #eee;
      }
      custom-drawer .custom-selected {
        background: #eee;
        color: #616161;
        --svg-icon-color: #616161;
      }
      custom-drawer custom-svg-icon {
        pointer-events: none;
      }
      custom-drawer {
        position: fixed;
        z-index: 100;
      }
      .flex {
        flex: 1;
      }
      
      custom-selector {
        height: 100%;
      }
      section {
        display: flex;
        flex-direction: column;
      }
      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      [menu-item] {
        transform: scale(0);
        height: 0px !important;
        padding: 0 !important;
      }
      [menu-item][shown] {
        height: auto !important;
        padding: 12px 12px 12px 36px !important;
        transform: scale(1);
      }
      [data-route="catalog"][shown] custom-svg-icon {
        transform: rotate(90deg)
      }
      @media (min-width: 720px) {
        section {
          align-items: center;
          justify-content: center;
        }
        .container {
          max-width: 640px;
        }
        custom-drawer {
          position: absolute;
        }
        :host([drawer-opened]) ::slotted(custom-pages) {
          left: var(--custom-drawer-width);
          width: calc(100% - 256px);
        }
        :host([drawer-opened]) .main {
          left: var(--custom-drawer-width);
          width: calc(100% - 256px) !important;
        }
      }
    </style>

    <header class="main">
      <custom-svg-icon icon="menu" class="menu"></custom-svg-icon>
      <translated-string name="title"></translated-string>
    </header>

    <custom-drawer>
      <header slot="header">
        <h3>Guldentop veldwinkel</h3>
      </header>
      <custom-selector slot="content" attr-for-selected="data-route" selected="">

        <span class="row selection" data-route="orders" >
          bestellingen
        </span>
        
        <span class="row selection" data-route="collections" >
          
          
          <translated-string>collections</translated-string>
        </span>
                
        <span class="row selection" data-route="catalog" subber>
          <custom-svg-icon icon="chevron-right"></custom-svg-icon>
          
          <translated-string>catalog</translated-string>
        </span>
        
        <span class="row selection" data-route="categories" menu-item="catalog">          
          <translated-string>categories</translated-string>
        </span>
        
        <span class="row selection" data-route="offers"  menu-item="catalog">
          <translated-string>offers</translated-string>
        </span>

        <span class="row selection" data-route="products" menu-item="catalog">
          <translated-string>products</translated-string>
        </span>

        <!-- <span class="row selection" data-route="sheet" >
          <custom-svg-icon icon="info"></custom-svg-icon>
          <span class="flex"></span>
          sheet
        </span> -->

        <span class="flex" style="pointer-events: none;"></span>

        <span class="row selection" data-route="settings" >
          <custom-svg-icon icon="settings"></custom-svg-icon>
          <span class="flex"></span>
          settings
        </span>

      </custom-selector>
    </custom-drawer>
    <slot></slot>
    `
  }
});
