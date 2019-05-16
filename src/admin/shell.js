import { define, ElementBase } from './../base.js';
import './../../node_modules/custom-svg-icon/src/custom-svg-icon.js';
import './../../node_modules/custom-pages/src/custom-pages.js';
import './../../node_modules/custom-tabs/src/custom-tabs.js';
import './../../node_modules/custom-tabs/src/custom-tab.js';
import './../../node_modules/custom-selector/src/index.js';
import './../../node_modules/custom-drawer/custom-drawer.js';
import './../translator.js';
import './../translated-string.js';
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
    this.drawerOpened = false;
  }
  connectedCallback() {
    super.connectedCallback();
    if (matchMedia('(min-width: 720px)').matches) this.drawerOpened = true;
    document.addEventListener('mouseup', () => {
      if (matchMedia('(max-width: 641px)').matches && this.drawerOpened) this.drawerOpened = false;
    });
    this.translatedTitle.value = this.selector.selected;
    this.selector.addEventListener('selected', this._selectorChange);
    this.menuIcon.addEventListener('click', this._menuClick);
    this.selector.selected = 'orders';
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

  _menuClick() {
    this.drawerOpened = !this.drawerOpened;
  }

  async _selectorChange() {
    const selected = this.selector.selected;
    if (selected) {
      if (selected === 'products') await import('./top-products.js');
      if (selected === 'sheet') await import('./top-sheet.js');
      if (selected === 'offers') await import('./top-offers.js');
      if (selected === 'orders') await import('./top-orders.js');
      if (selected === 'collections') await import('./top-collections.js');
      this.translatedTitle.value = selected;
      this.pages.select(selected);
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
      ::slotted(custom-pages) {
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        top: 56px;
        left: 0;
      }
      header {
        display: flex;
        align-items: center;
        height: 56px;
        background: transparent;
        position: absolute;
        right: 0;
        width: 100%;
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
          <custom-svg-icon icon="menu"></custom-svg-icon>
          <span class="flex"></span>
          bestellingen
        </span>

        <span class="row selection" data-route="collections" >
          <custom-svg-icon icon="menu"></custom-svg-icon>
          <span class="flex"></span>
          <translated-string>collections</translated-string>
        </span>

        <span class="row selection" data-route="offers" >
          <custom-svg-icon icon="info"></custom-svg-icon>
          <span class="flex"></span>
          aanbiedingen
        </span>

        <span class="row selection" data-route="products" >
          <custom-svg-icon icon="shopping-cart"></custom-svg-icon>
          <span class="flex"></span>
          producten
        </span>

        <span class="row selection" data-route="sheet" >
          <custom-svg-icon icon="info"></custom-svg-icon>
          <span class="flex"></span>
          sheet
        </span>

        <span class="flex" style="pointer-events: none;"></span>

        <span class="row selection" data-route="info" >
          <custom-svg-icon icon="info"></custom-svg-icon>
          <span class="flex"></span>
          info
        </span>

      </custom-selector>
    </custom-drawer>
    <slot></slot>
    `
  }
});
