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
import './menu/sub-menu.js'
import './menu/menu.js'
import './sections/catalog/catalog.js'
import './sections/media/media.js'
import Router from './router.js';

globalThis.pubsub = new PubSub(true)

declare global {
  interface HTMLElementTagNameMap {
    'admin-shell': AdminShell
  }
}

export default class AdminShell extends LitElement {
  router: Router
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
    this.router = new Router(this)
    this._menuClick = this._menuClick.bind(this);
    this._onPopstate = this._onPopstate.bind(this);
    this.drawerOpened = false;
    
    globalThis.onpopstate = this._onPopstate
    globalThis.topstore = globalThis.topstore || {};
    globalThis.topstore.databases = globalThis.topstore.databases || new OADBManager(false);
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete
    if (matchMedia('(min-width: 720px)').matches) this.drawerOpened = true;
    document.addEventListener('mouseup', e => {
      if (matchMedia('(max-width: 641px)').matches && this.drawerOpened && !e.path[0].hasAttribute('subber')) this.drawerOpened = false;
    });
    // this.translatedTitle.value = this.selector.selected;
    // this.selector.addEventListener('selected', this._selectorChange);
    this.menuIcon.addEventListener('click', this._menuClick);
    // this._selectorChange();
    this._preload()
  }

  async _preload() {
    console.log('loaded');
    try {
      // globalThis.exports = {};
      // await importScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.1');
      // await importScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@1.0.0');
      // globalThis.model = await mobilenet.load()

      // await globalThis.model
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  _onPopstate() {
    console.log('pop');
    console.log(history);
    
    console.log(history.state);
    console.log();
    
    // if (history.state) this.selector.select(history.state.selected);
    // this._selectorChange();
  }

  _menuClick() {
    this.drawerOpened = !this.drawerOpened;
  }

  async select(paths, selection) {
    await this.updateComplete
    console.log(paths, selection);
    
    const route = paths.join('/')
    const routeInfo = Router.routes[route]
    if (!customElements.get(routeInfo.tag)) await import(`./${routeInfo.import || routeInfo.tag}.js`)
    this.shadowRoot.querySelector('top-menu').select(route)
    this.pages.select(paths[0])
    let previous = this.pages.querySelector(`[route="${paths[0]}"]`)

    paths.shift()
    // console.log(paths && i === paths.length - 1 );
    
    for (let i = 0; i < paths.length; i++) {
      previous.select(paths[i])
      const el = previous.shadowRoot.querySelector(`[route="${paths[i]}"]`)
      console.log(el);
      if (selection && i === paths.length - 1 ) el.selection = selection
      else if (i !== paths.length - 1) el.select(paths[i + 1])
      previous = el
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
