import './../../node_modules/@vandeurenglenn/custom-date/custom-date.js';
import './../custom-prompt.js';

export default define(class CheckoutPrompt extends ElementBase {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.dates = this.shadowRoot.querySelectorAll('custom-selectable-date');
    this.selectors = this.shadowRoot.querySelectorAll('custom-selector');
  }

  get prompt() {
    return this.shadowRoot.querySelector('custom-prompt');
  }

  get template() {
    return html`
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
    `;
  }

  show() {
    this.dates[0].setAttribute('lang', 'nl');
    this.dates[1].setAttribute('lang', 'nl');
    this.dates[0].setAttribute('day', 'dinsdag');
    this.dates[1].setAttribute('day', 'vrijdag');
    this.dates[0].setAttribute('open', '16.00 - 16.30');
    this.dates[1].setAttribute('open', '17.00 - 18.00');
    this.dates[0].setAttribute('value', new Date().getTime());
    this.dates[1].setAttribute('value', new Date().getTime());
    this.dates[0]._date.next('dinsdag')
    this.dates[1]._date.next('vrijdag')

    this.dates[2].setAttribute('lang', 'nl');
    this.dates[3].setAttribute('lang', 'nl');
    this.dates[2].setAttribute('day', 'dinsdag');
    this.dates[3].setAttribute('day', 'vrijdag');
    this.dates[2].setAttribute('open', '17.00 - 18.00');
    this.dates[3].setAttribute('open', '18.00 - 19.00');
    this.dates[2].setAttribute('value', new Date().getTime());
    this.dates[3].setAttribute('value', new Date().getTime());
    this.dates[2]._date.next('dinsdag')
    this.dates[3]._date.next('vrijdag')

    this.prompt.show();
    return new Promise((resolve, reject) => {
      this.shadowRoot.querySelector('custom-svg-icon').addEventListener('click', () => {
        const selected = [];
        for (const selector of this.selectors) {
          if (selector.selected !== 'null')
           if (selector.selected !== 'cash' && selector.selected !== 'googlepay') selected.push([selector.selected, this.shadowRoot.querySelector(`[name="${selector.selected}"]`).value]);
           else selected.push(selector.selected)
        }
        console.log(selected);
        resolve(selected);
        document.body.removeChild(this);
      });
    });
  }
});
