import { define, ElementBase } from '../base.js';
import 'custom-svg-icon/src/custom-svg-icon.js';
import 'custom-pages/src/custom-pages.js';
import 'custom-tabs/custom-tabs.js';
import 'custom-tabs/custom-tab.js';
import 'custom-selector/src/index.js';
import 'custom-drawer';
import '../translator.js';
import '../translated-string.js';
import OADBManager from '../oadb-manager.js';
import PubSub from '@vandeurenglenn/little-pubsub'
import '@vandeurenglenn/flex-elements'

import template from './shell.html.js'
import styles from './shell.css.js'
import { LitElement } from 'lit';

globalThis.pubsub = new PubSub()

declare global {
  interface HTMLElementTagNameMap {
    'admin-shell': AdminShell
  }
}

export default class AdminShell extends LitElement {
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
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete
    if (matchMedia('(min-width: 720px)').matches) this.drawerOpened = true;
    document.addEventListener('mouseup', e => {
      if (matchMedia('(max-width: 641px)').matches && this.drawerOpened && !e.path[0].hasAttribute('subber')) this.drawerOpened = false;
    });
    this.translatedTitle.value = this.selector.selected;
    this.selector.addEventListener('selected', this._selectorChange);
    this.menuIcon.addEventListener('click', this._menuClick);
    
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
      if (selected === 'images') await import(`${prefix}images.js`);
      if (selected === 'settings') await import(`${prefix}settings.js`);
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
      if (selected === 'media' || selected === 'images' ||
          selected === 'videos') {
        let items = Array.from(this.shadowRoot.querySelectorAll('[menu-item="media"]'))
        items = [ ...items, this.shadowRoot.querySelector('[data-route="media"]')]
        if (selected === 'media') {
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
      if (selected !== 'catalog' &&  selected !== 'media') {
        this.translatedTitle.value = selected;
        this.pages.select(selected);
        history.pushState({selected}, selected, `#${selected}`);  
      }
      
    }
  }

  static styles = [
    styles
  ]

  render() {
    return template
  }
}

define(AdminShell)
