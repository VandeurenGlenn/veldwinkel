import { define, ElementBase } from './../base.js';
import './../../node_modules/custom-pages/src/custom-pages.js';
import './../../node_modules/custom-selector/src/index.js';
import './../../node_modules/custom-svg-icon/src/custom-svg-icon.js';
import './../../node_modules/custom-tabs/src/custom-tabs.js';
import './../../node_modules/custom-drawer/custom-drawer.js';
import './../top-icon-button.js';
import './../top-button.js';
import './../translated-tab.js';
import './../translated-string.js';
import './../translator.js';

export default define(class AppShell extends ElementBase {
  get pages() {
    return this.shadowRoot.querySelector('custom-pages');
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
    if (value) this.setAttribute('drawer-opened', '');
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
    this.drawerOpened = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.selector.addEventListener('selected', this._selectorChange);
    this.querySelector('custom-svg-icon[icon="menu"]').addEventListener('click', this._menuClick);
    (async () => {
      if (window.location.hash) {
        this.selector.select(window.location.hash.replace('#', ''));
        this._selectorChange();
      } else {
        this.selector.select('order');
        this._selectorChange();
      }
      window.onpopstate = this._onPopstate;
      this.translatedTitle.value = this.selector.selected;
      this.pages.select(this.selector.selected);
      const loginButton = this.querySelector('.login-button');

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

  _onPopstate() {
    this.selector.selected = history.state.selected;
    this._selectorChange();
  }

  _menuClick() {
    this.drawerOpened = !this.drawerOpened;
  }

  async _selectorChange() {
    const selected = this.selector.selected;
    if (selected) {
      this.translatedTitle.value = selected;
      if (selected === 'order') await import('./top-client-order');
      if (selected === 'stock') await import('./item-list');
      if (selected === 'orders') await import('./order-list');
      this.pages.select(selected);
      history.pushState({selected}, selected, `#${selected}`);
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

    <span class="row selection" data-route="order" >
      <custom-svg-icon icon="shopping-cart"></custom-svg-icon>
      <span class="flex"></span>
      bestel
    </span>

    <span class="row selection" data-route="stock" >
      <custom-svg-icon icon="info"></custom-svg-icon>
      <span class="flex"></span>
      veld overzicht
    </span>

    <span class="row selection" data-route="orders" >
      <custom-svg-icon icon="menu"></custom-svg-icon>
      <span class="flex"></span>
      bestellingen
    </span>

    <span class="flex" style="pointer-events: none;"></span>

    <span class="row selection" data-route="info" >
      <custom-svg-icon icon="info"></custom-svg-icon>
      <span class="flex"></span>
      info
    </span>

  </custom-selector>
</custom-drawer>
<custom-pages attr-for-selected="route">
  <top-client-order route="order"></top-client-order>
  <item-list route="stock" type="stock"></item-list>
  <order-list route="orders" type="orders"></order-list>
  <section route="info">
    <span class="container">
    <h4>Guldentop Veldwinkel</h4>
    <span class="row"><strong>adres: </strong>Guldentop 23, 3118 Rotselaar</span>

    </span>
  </section>
</custom-pages>`;
  }
})
