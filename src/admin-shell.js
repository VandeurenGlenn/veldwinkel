import { define, ElementBase } from './base.js';
import './../node_modules/custom-svg-icon/src/custom-svg-icon.js';
import './../node_modules/custom-pages/src/custom-pages.js';
import './../node_modules/custom-tabs/src/custom-tabs.js';
import './../node_modules/custom-tabs/src/custom-tab.js';
import './top-products.js';
import './top-orders.js';
import './input-fields.js';

export default define(class AppShell extends ElementBase {
  constructor() {
    super();
  }
});
