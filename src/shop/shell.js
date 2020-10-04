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
import './../custom-fab.js';
import ShopCartController from './../shop-cart-controller.js';
import './../top-button.js';

export default define(class AppShell extends ElementBase {
  get badge() {
    return this.selector.querySelector('.badge')
  }
  get cart() {
    return this.shadowRoot.querySelector('shop-cart');
  }
  get cartAction() {
    return this.shadowRoot.querySelector('shop-cart-action');
  }
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
  get routeInfo() {
    return this.shadowRoot.querySelector('.route-info')
  }
  constructor() {
    super();
    this._selectorChange = this._selectorChange.bind(this);
    this._menuClick = this._menuClick.bind(this);
    this._onPopstate = this._onPopstate.bind(this);
    this._onCounterChange = this._onCounterChange.bind(this);
    this.select = this.select.bind(this);
    window.onpopstate = this._onPopstate;
    this.drawerOpened = false;
    window.topstore = window.topstore || {};
    window.topstore.databases = window.topstore.databases || new OADBManager(true);
    this._onResize = this._onResize.bind(this)
  }
  connectedCallback() {
    super.connectedCallback();
    this.selector.addEventListener('selected', this._selectorChange);
    window.addEventListener('resize', this._onResize);
    this.querySelector('custom-svg-icon[icon="menu"]').addEventListener('click', this._menuClick);
    (async () => {
      if (window.location.hash) {
        let route = window.location.hash.split('#');
        route = route[1].split('?');
        if (route[1])
        this.selector.select(route[0]);
        console.log(route[1]);
        if (route[1]) {
          const parts = route[1].split('=');
          
          this.pages.querySelector(`[route="${route[0]}"]`).value = parts[1]
          this.select(route[0], parts[1])
        } else {
          this.select(route[0])
        }
        
      } else {
        this.selector.select('products');
        await this._selectorChange();
      }
      // this.translatedTitle.value = this.selector.selected;
      const loginButton = this.querySelector('.login-button');
      
      this._onResize();
      
      firebase.auth().onAuthStateChanged(async user => {
        console.log(user);
        if (user) {
        if (user.email === "admin@veldwinkel.be") return logout()
          window.ref = firebase.database().ref(`${user.uid}`);
          window.user = user;
          if (user.photoURL) {
            loginButton.innerHTML = `<img src="${user.photoURL}"></img>`;
          }
          // else localDevices = ['light'];
        } else {
          loginButton.innerHTML = `login`;

          loginButton.addEventListener('click', async () => {
            window.signin()
              // firebase.auth()

          });
        }
      });
      await import('./../shop-cart-action.js');
      await import('./../shop-cart.js');
      new ShopCartController(this.cart, this.cartAction)
    })();
    document.addEventListener('counter-change', this._onCounterChange)
    

    window.go = this.select;
  }
  
  _onResize() {    
    const {height, width} = this.pages.getClientRects()[0];
    if (width > 960 && !this.drawerOpened) this.drawerOpened = true;
    requestAnimationFrame(() => {
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
  
  hideShopCartAction() {
    this.shadowRoot.querySelector('shop-cart-action').classList.add('hide');
    this.pages.style.bottom = 0;
  }
  
  showShopCartAction() {
    this.shadowRoot.querySelector('shop-cart-action').classList.remove('hide');
    this.pages.style.bottom = '56px';
  }
  
  _onCounterChange({detail}) {
    if (detail === 0) this.badge.classList.remove('active')
    else {
      if (!this.badge.classList.contains('active')) this.badge.classList.add('active')
    }
  }
  
  async select(selected, subselected) {
    console.log(selected);
    if (selected) {
        this.selector.select(selected)
    // this.translatedTitle.value = selected;
    this.pages.select(selected);
    this.pages.setAttribute('selected', selected)
    const url = subselected ? `#${selected}?uid=${subselected}` : `#${selected}`;
    history.pushState({selected}, selected, url);
      // if (selected === 'quick-order') {
      //   this.hideShopCartAction();
      //   await import('./top-client-order');
      // }
      if (selected === 'home') {
        this.hideShopCartAction()
        await import('./sections/home.js');
      }
      if (selected === 'contact') {
        this.hideShopCartAction()
        await import('./sections/contact.js');
      }
      if (selected === 'orders') {
        this.hideShopCartAction()
        await import('./order-list');
      }
      // if (selected === 'stock') {
      //   this.hideShopCartAction()
      //   await import('./item-list');
      // }
      if (selected === 'cart') {
        this.hideShopCartAction()
        if (!this.pages.querySelector('shop-cart')) await import('./../shop-cart');
      }
      if (selected === 'order') {
        this.hideShopCartAction()
        if (!this.pages.querySelector('client-order').shadowRoot) await import('./client-order');
        console.log(subselected);
        this.pages.querySelector('client-order').value = subselected;
        this.pages.querySelector('client-order')._stamp()
        console.log(this.pages.querySelector('client-order'));
      }
      if (selected === 'products') {
        this.showShopCartAction();
        await import('./client-products');
      }
      if (selected === 'product') {
        this.showShopCartAction();
        if (!this.pages.querySelector('client-product').shadowRoot) await import('./client-product');        
        this.pages.querySelector('client-product').key = subselected;
      }
      // if (selected === 'directions') {
      //   this.selector.select(this.selector.previousSelected);
      //   window.open('https://www.google.com/maps/dir//Guldentop+Veldwinkel+Veldlocatie,+Laakweg,+3118+Werchter.+Parkeren+langs+de+grote+serre+op+het+veld+of+Guldentop+23.+Dit+is+een+zijwegje+van+de+Varentstraat+tussen+Geetsvondelweg+en,+Preterstraat,+3118+Werchter/@50.9785324,4.7525245,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47c15d4466cd3215:0xfe59ae34b619fab4!2m2!1d4.7488689!2d50.9798556')
      //   return;
      // }
      if (selected === 'info') {
        this.routeInfo.src = 'https://maps.google.com/maps?q=guldentopveldwinkel&t=&z=17&ie=UTF8&iwloc=&output=embed';
      }
    }
    return
  }

  _selectorChange() {
    return this.select(this.selector.selected);
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
    
    --svg-icon-color: #535353;
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
    bottom: 56px;
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
    padding: 24px;
    text-transform: uppercase;
    cursor: pointer;
    color: #fff;
    --svg-icon-color: #fff;
    opacity: 0.88;
  }
  custom-drawer .custom-selected {
    background: #6a913d;
  }
  custom-drawer custom-svg-icon {
    pointer-events: none;
  }
  custom-drawer {
    position: fixed;
    z-index: 100;
  }
  
  custom-drawer custom-selector {
    background: #ffffff linear-gradient(167deg, #48480d, #423e21 40rem);
  }
  .flex {
    flex: 1;
  }
  
  .row {
    display: flex;
  }

  .column {
    display: flex;
    flex-direction: column;
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
  shop-cart-action {
    position: fixed;
    bottom: 0;
    right: 0;
  }
  .hide {
    
    height: 0;
    overflow: hidden;
    width: 0;
    opacity: 0;
    pointer-events: none;
  }
  
  .badge {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2f6c12c9;
    margin-left: 4px;
  }
  .badge.active {
    height: 14px;
    width: 14px;
  }
  translated-string {
    text-transform: uppercase;
  }
  @media (min-width: 960px) {
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
    :host([drawer-opened]) custom-pages,
    :host([drawer-opened]) ::slotted(header),
    :host([drawer-opened]) gesture-action-bar {
      left: var(--custom-drawer-width);
      width: calc(100% - 256px);
    }
  }
  /* custom-pages[selected="home"] {
    top: 0;
  } */
</style>

<slot></slot>
<custom-drawer>

  <custom-selector slot="content" attr-for-selected="data-route" selected="order">
    <span class="row selection" data-route="home" >
      <custom-svg-icon icon="home"></custom-svg-icon>
      <span class="flex"></span>
      home
    </span>
    
    <span class="row selection" data-route="products" >
      <custom-svg-icon icon="shopping-basket"></custom-svg-icon>
      <span class="flex"></span>
      producten
    </span>

    <!-- <span class="row selection" data-route="stock" >
      <custom-svg-icon icon="dashboard"></custom-svg-icon>
      <span class="flex"></span>
      veld overzicht
    </span> -->
    
    <!-- <span class="row selection" data-route="quick-order" >
      <custom-svg-icon icon="shopping-cart"></custom-svg-icon>
      <span class="flex"></span>
      snelle bestelling
    </span> -->

    <span class="row selection" data-route="info" >
      <custom-svg-icon icon="map"></custom-svg-icon>
      <span class="flex"></span>      
      <translated-string>location information</translated-string>
    </span>

    <span class="row selection" data-route="contact" >
      <custom-svg-icon icon="info"></custom-svg-icon>
      <span class="flex"></span>
      <translated-string>contact</translated-string>
    </span>
    
    <span class="flex" style="pointer-events: none;"></span>

    <!-- <span class="row selection" data-route="about" >
      <custom-svg-icon icon="info"></custom-svg-icon>
      <span class="flex"></span>
      about
    </span> -->
    
    <span class="row selection" data-route="cart" >
      <custom-svg-icon icon="shopping-cart"></custom-svg-icon>
      <span class="badge"></span>
      <span class="flex"></span>
      <translated-string>shopping cart</translated-string>
    </span>    

    <span class="row selection" data-route="orders" >
      <custom-svg-icon icon="orders"></custom-svg-icon>
      <span class="flex"></span>
      bestellingen
    </span>

  </custom-selector>
</custom-drawer>
<custom-pages attr-for-selected="route">
  <home-section route="home"></home-section>
  <contact-section route="contact"></contact-section>
  <shop-cart route="cart"></shop-cart>
  <top-client-order route="quick-order"></top-client-order>
  <client-products route="products"></client-products>
  <client-product route="product"></client-product>
  <!-- <item-list route="stock" type="stock"></item-list> -->
  <order-list route="orders" type="orders"></order-list>
  <client-order route="order" type="order"></client-order>
  <section route="info">
    <iframe class="route-info" width="600" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    <h4 style="padding: 12px 16px;
    box-sizing: border-box;
    text-align: center;">Opgelet: gelieve niet te parkeren bij nr 33, onze parking bevind zich verder door langs de zij/veld(weg), vlak naast het veld.</h4>
  </section>
</custom-pages>
<shop-cart-action>
  <top-icon-button slot="fab" icon="shopping-cart">shoplist</top-icon-button>
</shop-cart-action>`;
  }
})
