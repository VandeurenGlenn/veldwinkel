import"./custom-date-61d31a4f.js";define(class customSelectable extends ElementBase{constructor(){super()}get template(){return html`
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
    `}}),define(class customSelectableItem extends ElementBase{constructor(){super()}get template(){return html`
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
    `}}),define(class customSelectableDate extends ElementBase{static get observedAttributes(){return["value","day","open","lang"]}constructor(){super()}get _date(){return this.shadowRoot.querySelector("custom-date")}set value(e){this._date.value=e}get value(){return this._date._value}set lang(e){this._date.lang=e}get lang(){return this._date.lang}set day(e){this._day=e}get day(){return this._day}set open(e){this.shadowRoot.querySelector("strong").innerHTML=e}attributeChangedCallback(e,t,s){t!==s&&this.rendered&&(this[e]=s)}get template(){return html`
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
    `}}),define(class CustomPrompt extends ElementBase{constructor(){super()}show(){this.setAttribute("shown","")}get template(){return html`
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
    `}});export default define(class CheckoutPrompt extends ElementBase{constructor(){super()}connectedCallback(){super.connectedCallback(),this.dates=this.shadowRoot.querySelectorAll("custom-selectable-date"),this.selectors=this.shadowRoot.querySelectorAll("custom-selector")}get prompt(){return this.shadowRoot.querySelector("custom-prompt")}get template(){return html`
    <style>
      :host {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #33333355;
        z-index: 100;
      }

      custom-prompt {
        max-height: 100%;
        max-width: 100%;
      }
      [disabled] {
        color: #ddd;
        pointer-events: none;
      }
      apply(--css-flex)
      apply(--css-row)
      @media (min-width: 720px) {
        custom-prompt {
          max-height: 600px;
          max-width: 600px;
        }
      }
    </style>
    <custom-prompt>
      <h2 slot="head"><translated-string>checkout</translated-string></h2>
      <h3 slot="subhead"><translated-string>collection times</translated-string></h3>
      <custom-selector attr-for-selected="name" selected="tuesday">
        <custom-selectable-date name="tuesday"></custom-selectable-date>
        <custom-selectable-date name="friday"></custom-selectable-date>
      </custom-selector>
      <h3><translated-string>delivery times</translated-string></h3>
      <custom-selector attr-for-selected="name" selected="null">
        <custom-selectable-date name="tuesday" disabled></custom-selectable-date>
        <custom-selectable-date name="friday" disabled></custom-selectable-date>
      </custom-selector>
      <h3><translated-string>payment</translated-string></h3>
      <custom-selector attr-for-selected="name" selected="cash">
        <custom-selectable-item name="cash">cash</custom-selectable-item>
        <custom-selectable-item name="googlepay">Google Pay</custom-selectable-item>
      </custom-selector>

      <span class="flex"></span>

      <span class="row">
        <span class="flex"></span>
        <custom-svg-icon icon="done"></custom-svg-icon>
      </span>
    </custom-prompt>
    `}show(){return this.dates[0].setAttribute("lang","nl"),this.dates[1].setAttribute("lang","nl"),this.dates[0].setAttribute("day","dinsdag"),this.dates[1].setAttribute("day","vrijdag"),this.dates[0].setAttribute("open","16.00 - 16.30"),this.dates[1].setAttribute("open","17.00 - 18.00"),this.dates[0].setAttribute("value",(new Date).getTime()),this.dates[1].setAttribute("value",(new Date).getTime()),this.dates[0]._date.next("dinsdag"),this.dates[1]._date.next("vrijdag"),this.dates[2].setAttribute("lang","nl"),this.dates[3].setAttribute("lang","nl"),this.dates[2].setAttribute("day","dinsdag"),this.dates[3].setAttribute("day","vrijdag"),this.dates[2].setAttribute("open","17.00 - 18.00"),this.dates[3].setAttribute("open","18.00 - 19.00"),this.dates[2].setAttribute("value",(new Date).getTime()),this.dates[3].setAttribute("value",(new Date).getTime()),this.dates[2]._date.next("dinsdag"),this.dates[3]._date.next("vrijdag"),this.prompt.show(),new Promise((e,t)=>{this.shadowRoot.querySelector("custom-svg-icon").addEventListener("click",()=>{const t=[];for(const e of this.selectors)"null"!==e.selected&&("cash"!==e.selected&&"googlepay"!==e.selected?t.push([e.selected,this.shadowRoot.querySelector(`[name="${e.selected}"]`).value]):t.push(e.selected));console.log(t),e(t),document.body.removeChild(this)})})}});
