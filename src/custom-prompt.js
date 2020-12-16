define(class customSelectable extends ElementBase {
  constructor() {
    super();
  }
  get template() {
    return html`
<style>
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
  }
  .icon {
    display: block;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: var(--selectable-icon-color, #ddd);
  }
  .flex {
    flex: 1;
  }

</style>
<span class="icon"></span>
    `;
  }
});

define(class customSelectableItem extends ElementBase {
  constructor() {
    super();
  }
  get template() {
    return html`
<style>
  :host {
    display: flex;
    align-items: center;
    padding: 6px;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    pointer-events: auto;
  }
  :host(.custom-selected) {
    background: #1b5e20a6;
    color: #fff;
    --selectable-icon-color: #fff;
  }
  ::slotted(*), custom-selectable {
    pointer-events: none;
  }
</style>
<custom-selectable></custom-selectable>
<slot></slot>
    `;
  }
});
define(class customSelectableDate extends ElementBase {
  static get observedAttributes() {
    return ['value', 'day', 'open', 'lang'];
  }
  constructor() {
    super();
  }
  get _date() {
    return this.shadowRoot.querySelector('custom-date');
  }

  set value(value) {
    this._date.value = value;
    // this._date.next(this.day);
  }
  get value() {
    return this._date._value;
  }
  set lang(value) {
    this._date.lang = value;
  }
  get lang() {
    return this._date.lang;
  }
  set day(value) {
    this._day = value
  }
  get day() {
    return this._day
  }
  set open(value) {
    this.shadowRoot.querySelector('strong').innerHTML = value;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.rendered) this[name] = newValue;
  }
  get template() {
    return html`
<style>
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px 8px 0;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    pointer-events: auto;
  }
  .flex {
    flex: 1;
  }
  :host(.custom-selected) {
    background: #1b5e20a6;
    color: #fff;
    --selectable-icon-color: #fff;
  }
  ::slotted(*), custom-selectable, custom-date, span, strong {
    pointer-events: none;
  }


</style>
<custom-selectable></custom-selectable>
<custom-date></custom-date>
<span class="flex"></span>
<strong></strong>
    `;
  }
});
export default define(class CustomPrompt extends ElementBase {
  constructor() {
    super();
  }

  show() {
    this.setAttribute('shown', '');
  }
  
  hide() {
    this.removeAttribute('shown');
  }

  get template() {
    return html`
<style>
  :host {
    mixin(--css-hero)
    mixin(--css-column)
    background: #fff;
    pointer-events: none;
    opacity: 0;
    z-index: 100;
    padding: 36px 24px 16px 24px;
    box-sizing: border-box;
    pointer-events: none;
  }
  .selector-item {
    display: block;
    border: 1px solid #eee;
    border-radius: 50%;
    height: 12px;
    width: 12px;
  }
  .selector-item.custom-selected {
    background: #eee;
  }
  custom-selector {
    mixin(--css-row)
    mixin(--css-center)
    border-top: 1px solid #ddd;
  }
  :host([shown]) {
    opacity: 1;
    pointer-events: auto;
  }
  :host([shown]) custom-pages, :host([shown]) custom-selector {
    pointer-events: auto;
  }
  custom-pages, custom-selector {
    pointer-events: none;
  }
  slot[name="head"]::slotted(*) {
    margin: 0;
  }
  slot[name="subhead"]::slotted(*) {
    margin: 0;
    padding: 0.8em 0 1em 0;
  }
</style>
<slot name="head"></slot>
<slot name="subhead"></slot>
<slot></slot>
    `;
  }
});
