import { define, ElementBase } from './../base.js';
import './../../node_modules/custom-pages/src/custom-pages.js';
import './../../node_modules/custom-selector/src/index.js';
import './../../node_modules/custom-svg-icon/src/custom-svg-icon.js';
import './../../node_modules/custom-tabs/src/custom-tabs.js';
import './../../node_modules/custom-drawer/custom-drawer.js';
import './../custom-container.js';
import './../top-icon-button.js';
import './../top-button.js';
import './../translated-tab.js';
import './../translated-string.js';
import './../translator.js';
import OADBManager from './../oadb-manager.js';

export default define(class AppShell extends ElementBase {
  get pages() {
    return this.shadowRoot.querySelector('custom-pages');
  }
  get map() {
    return this.shadowRoot.querySelector('iframe');
  }
  get selector() {
    return this.shadowRoot.querySelector('custom-selector');
  }
  get drawer() {
    return this.shadowRoot.querySelector('custom-drawer');
  }
  get translatedTitle() {
    return this.querySelector('translated-string');
  }
  set drawerOpened(value) {
    if (value) {
      this.setAttribute('drawer-opened', '');
      this.map.width -= 256;
    }
    else this.removeAttribute('drawer-opened');
  }
  get drawerOpened() {
    return this.hasAttribute('drawer-opened');
  }
  constructor() {
    super();
    this._selectorChange = this._selectorChange.bind(this);
    this._menuClick = this._menuClick.bind(this);
    this._onPopstate = this._onPopstate.bind(this);
    window.onpopstate = this._onPopstate;
    this.drawerOpened = false;
    window.topstore = window.topstore || {};
    window.topstore.databases = window.topstore.databases || new OADBManager();
    this._onResize = this._onResize.bind(this)
  }
  connectedCallback() {
    super.connectedCallback();
    this.selector.addEventListener('selected', this._selectorChange);
    window.addEventListener('resize', this._onResize);
    this.querySelector('custom-svg-icon[icon="menu"]').addEventListener('click', this._menuClick);
    (async () => {
      if (window.location.hash) {
        console.log(window.location.hash);
        let route = window.location.hash.split('#');
        route = route[1].split('?=');
        this.selector.select(route[0]);
        console.log(route);
        await this._selectorChange();
        if (route[1]) {
          this.shadowRoot.querySelector(`[route="${route[0]}"]`).value = route[1]
        }
      } else {
        this.selector.select('quick-order');
        await this._selectorChange();
      }
      this.translatedTitle.value = this.selector.selected;
      const loginButton = this.querySelector('.login-button');
      
      this._onResize();
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          window.ref = firebase.database().ref(`${user.uid}`);
          window.user = user;
          if (user.photoURL) {
            loginButton.innerHTML = `<img src="${user.photoURL}"></img>`;
          }
          // else localDevices = ['light'];
        } else {
          loginButton.innerHTML = `<img style="margin-right: 8px;"></img>login`;

          loginButton.addEventListener('click', async () => {
            window.signin()
              // firebase.auth()

          });
        }
      });
    })();
  }
  
  _onResize() {
    requestAnimationFrame(() => {
      const {height, width} = this.pages.getClientRects()[0];
      if (this.drawerOpened) this.map.width = width - 256;
      else this.map.width = width;
      
      this.map.height = height;
    })
  }

  _onPopstate() {
    if (history.state) this.selector.selected = history.state.selected;
    this._selectorChange();
  }

  _menuClick() {
    this.drawerOpened = !this.drawerOpened;
  }

  async _selectorChange() {
    const selected = this.selector.selected;
    if (selected) {
      if (selected === 'quick-order') await import('./top-client-order');
      if (selected === 'stock') await import('./item-list');
      if (selected === 'orders') await import('./order-list');
      if (selected === 'order') await import('./client-order');
      if (selected === 'products') await import('./client-products');
      if (selected === 'product') await import('./client-product');
      if (selected === 'directions') {
        this.selector.select(this.selector.previousSelected);
        window.open('https://www.google.com/maps/dir//50.9804131,4.7489457/@50.980413,4.748946,17z?hl=en-GB')
        return;
      }
      this.translatedTitle.value = selected;
      this.pages.select(selected);
      history.pushState({selected}, selected, `#${selected}`);
    }
    return
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
  }
  custom-drawer {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-105%);
  }
  custom-pages {
    position: absolute;
    right: 0;
    bottom: 0;
    top: 56px;
    left: 0;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    background: transparent;
  }
  ::slotted(header) {
    position: absolute;
    right: 0;
  }
  :host([drawer-opened]) custom-drawer {
    opacity: 1;
    transform: translateX(0);
  }

  header h3 {
    margin: 0;
    color: #616161;
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
  }
  custom-drawer .custom-selected {
    background: #eee;
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
    :host([drawer-opened]) custom-pages {
      left: var(--custom-drawer-width);
      width: calc(100% - 256px);
    }
    :host([drawer-opened]) ::slotted(header) {
      left: var(--custom-drawer-width);
      width: calc(100% - 256px) !important;
    }
  }
</style>

<slot></slot>
<custom-drawer>
  <header slot="header">
    <h3>Guldentop veldwinkel</h3>
  </header>

  <custom-selector slot="content" attr-for-selected="data-route" selected="order">

    <span class="row selection" data-route="quick-order" >
      <custom-svg-icon icon="shopping-cart"></custom-svg-icon>
      <span class="flex"></span>
      snelle bestelling
    </span>

    <span class="row selection" data-route="products" >
      <custom-svg-icon icon="shopping-basket"></custom-svg-icon>
      <span class="flex"></span>
      producten
    </span>

    <span class="row selection" data-route="stock" >
      <custom-svg-icon icon="dashboard"></custom-svg-icon>
      <span class="flex"></span>
      veld overzicht
    </span>

    <span class="row selection" data-route="orders" >
      <custom-svg-icon icon="orders"></custom-svg-icon>
      <span class="flex"></span>
      bestellingen
    </span>

    <span class="flex" style="pointer-events: none;"></span>

    <!-- <span class="row selection" data-route="about" >
      <custom-svg-icon icon="info"></custom-svg-icon>
      <span class="flex"></span>
      about
    </span> -->
    
    <span class="row selection" data-route="info" >
      <custom-svg-icon icon="map"></custom-svg-icon>
      <span class="flex"></span>      
      <translated-string>location information</translated-string>
    </span>
    
    <span class="row selection" data-route="directions" >
      <custom-svg-icon icon="directions"></custom-svg-icon>
      <span class="flex"></span>
      <translated-string>directions</translated-string>
    </span>

  </custom-selector>
</custom-drawer>
<custom-pages attr-for-selected="route">
  <top-client-order route="quick-order"></top-client-order>
  <client-products route="products"></client-products>
  <client-product route="product"></client-product>
  <item-list route="stock" type="stock"></item-list>
  <order-list route="orders" type="orders"></order-list>
  <client-order route="order" type="order"></client-order>
  <section route="info">
      <iframe width="600" height="500" src="https://maps.google.com/maps?q=guldentopveldwinkel&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
  </section>
</custom-pages>`;
  }
})
