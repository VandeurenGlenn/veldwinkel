import { define, ElementBase } from './base.js';
import './../node_modules/custom-pages/src/custom-pages.js';
import './../node_modules/custom-selector/src/index.js';
import './../node_modules/custom-svg-icon/src/custom-svg-icon.js';
import './../node_modules/custom-tabs/src/custom-tabs.js';
import './top-icon-button.js';
import './top-button.js';
import './translated-tab.js';
import './translated-string.js';
import './item-list.js';
import './top-order.js';

export default define(class AppShell extends ElementBase {
  get pages() {
    return this.shadowRoot.querySelector('custom-selector');
  }
  get translatedTitle() {
    return this.querySelector('translated-string');
  }
  constructor() {
    super();
    this._pageChange = this._pageChange.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.translatedTitle.value = this.pages.selected;
    this.pages.addEventListener('selected', this._pageChange);
  }

  _pageChange() {
    console.log(this.pages.selected);
    this.translatedTitle.value = this.pages.selected;
  }
  get template() {
    return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
<slot></slot>
<custom-pages attr-for-selected="route" selected="order">
  <top-order route="order"></top-order>
  <item-list route="items"></item-list>
  <section class="subscribe">
    <h4>seizoensgebonden groentepakketten op maat</h4>
    <custom-tabs attr-for-selected="data-route">
      <translated-tab data-route="big">groot</translated-tab>
      <translated-tab data-route="small">klein</translated-tab>
      <translated-tab data-route="hurry-hap">hurry hap</translated-tab>
    </custom-tabs>
    <custom-pages attr-for-selected="value">
      <top-box value="big"></top-box>
      <top-box value="small"></top-box>
      <top-box value="hurry-hap"></top-box>
    </custom-pages>

  </section>
</custom-pages>
<custom-selector attr-for-selected="data-route" selected="order">
  <custom-svg-icon data-route="order"></custom-svg-icon>
</custom-selector>
    `;
  }
})
