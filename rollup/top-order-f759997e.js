import { d as define, E as ElementBase } from './shell-6ca0d34f.js';

customElements.define('custom-date', class CustomDate extends HTMLElement {

  static get observedAttributes() {
    return ['day', 'month', 'year', 'date', 'value', 'lang'];
  }

  get months() {
    return  ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  }

  get days() {
    if (this.lang === 'nl') return ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag']
    return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  }
  set lang(value) {
    this._lang = value;
    this.render();
  }
  get lang() {
    return this._lang;
  }
  set value(value) {
    this._value = value;
    this.setAttribute('value', value);
    const date = new Date(Number(value));
    this.day = date.getDay();
    this.date = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  };

  set day(value) {
    this._day = value;
    this.setAttribute('day', value);
  }

  set month(value) {
    this._month = value;
    this.setAttribute('month', value);
  }

  set date(value) {
    this._date = value;
    this.setAttribute('date', value);
  }

  set year(value) {
    this._year = value;
    this.setAttribute('year', value);
  }

  get day() {
    return this._day;
  }

  get month() {
    return this._month;
  }

  get date() {
    return this._date;
  }

  get year() {
    return this._year;
  }

  attributeChangedCallback(name, oldValue, value) {
    if (oldValue !== value && value) {
      this[name] = value;

      this.observer();
    }

  }

  next(day) {
    if (typeof day === 'string') day = this.days.indexOf(day);
    const date = new Date(Number(this._value));
    if (day === date.getDay()) {
      this.value = date.setDate(date.getDate() - date.getDay() + 7 + day);
    } else {
      this.value = date.setDate(date.getDate() - date.getDay() + day);
    }

  }

  observer() {
    if (this.day && this.date && this.month && this.year) {
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: flex;
        width: 140px;
      }
      .flex {
        flex: 1;
      }
      :host div, :host span {
        pointer-events: none;
      }
    </style>
    <div>${this.days[this.day]}</div>
    <span class="flex"></span>
    <div>${this.date}</div>
    -
    <div>${Number(this.month) + 1}</div>
    -
    <div>${this.year}</div>
    `;
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    if (!this.getAttribute('value')) {
      this.value = new Date().getTime();
    }
  }
});

var topOrder = define(class TopOrder extends ElementBase {

  get offerDisplay() {
    return globalThis.topstore.databases.get('offerDisplay');
  }

  get offers() {
    return globalThis.topstore.databases.get('offers');
  }
  
  
  get orders() {
    return window.topstore.databases.get('orders');
  }

  set value({ user, uid }) {
    (async () => {
      console.log(uid, user);
      let order = await this.orders.get(user);
      console.log({order});
      order = order[uid];
      this.order = order;
      this.orderLength = order.products.length;
      this.user = user;
      this.uid = uid;
      const promises = [];
      (async () => {
        for (const item of order.products) {
          promises.push((async () => {
            const { key, count } = item;
            try {
              const { name } = await this.offerDisplay.get(key);
            } catch (error) {
              console.error(`product not found`);
            }
            return `<span class="row selection" name="${key}">${name}<span class="flex" style="pointer-events: none;"></span>${count}</span>`
          })());
        }
        const result = await Promise.all(promises);
        this.innerHTML = `
        <style>
          h4 {
            margin: 0;
          }
        </style>
        <span class="row center" slot="info">        
          <h4 class="name"><translated-string>name</translated-string>:</h4>
          
          <span class="flex"></span>
          <p class="name">${order.payer.name.surname} ${order.payer.name.given_name}</p>
        </span>
        
        <span class="row center" slot="info">        
          <h4 class="name">email:&nbsp;</h4>
          
          <span class="flex"></span>
          <a href="">${order.payer.email_address}</a>
        </span>
        <span class="row center" slot="info">
          <h4 class="name"><translated-string>payment</translated-string>:</h4>
          <span class="flex"></span>
          <p href="">${order.status}</p>
        </span>
        
        <span class="row center" slot="info">
          <h4 class="name"><translated-string>transaction id</translated-string>:</h4>
          <span class="flex"></span>
          <p href="">${order.id}</p>
        </span>
        <span class="row center" slot="info">
          
          
        
          <h4 class="name"><translated-string>collection time</translated-string>:</h4>
          <span class="flex"></span>
          <custom-date lang="nl" value="${order.collectionTime[1]}"></custom-date>
        </span>

        <custom-selector multi="true" selected="[]" attr-for-selected="name">
          ${result.join(' ')}
        </custom-selector>
        `;
        
        this.querySelector('a').href = `mailto:${order.payer.email_address}`;
      })();
    // }
    
      
  })();
  }

  constructor() {
    super();
  }
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    (async () => {
      await import('./top-button-4b86777b.js');
    })();

    this.addEventListener('click', async (event) => {
      const target = event.composedPath()[0];
      if (target.classList.contains('confirm')) {
        const selected = this.querySelector('custom-selector').selected;
        console.log(selected.length, this.orderLength);
        if (selected.length !== this.orderLength) {
          const answer = await confirm(`are you sure?\n it seem's you haven't selected all products,\n\nIf everyting is in stock press cancel\n\npress confirm if item is out of stock (users will see this in their order list)`);

          if (answer === true) {

            let missing;
            if (selected.length === 0) missing = this.order;
            else {
              missing = [];
              this.order.map(o => {
                if (selected.indexOf(o.product) === -1) missing.push(o.product);
              });
            }            firebase.database().ref(`orders/${this.user}/${this.uid}/missing`).set(missing);
            firebase.database().ref(`orders/${this.user}/${this.uid}/ready`).set('true');
            firebase.database().ref(`orderKeys/${this.uid}`).remove();
            firebase.database().ref(`collectionKeys/${this.uid}`).set(this.user);
            adminGo('orders');
          }
        } else {
          firebase.database().ref(`orders/${this.user}/${this.uid}/ready`).set('true');
          firebase.database().ref(`orderKeys/${this.uid}`).remove();
          firebase.database().ref(`collectionKeys/${this.uid}`).set(this.user);
          adminGo('orders');
        }
        
      }
      if (target.classList.contains('cancel')) adminGo('orders');
    });
  }
  get template() {
    return html`<style>
  :host {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  ::slotted(*) {
    user-select: none;
    pointer-events: none;
  }
  .toolbar {
    mixin(--css-row)
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    padding: 12px;
    align-items: center;
    height: 52px;
    border-top: 1px solid #0000004f;
  }
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  ::slotted(*.row) {
    mixin(--css-row)
  }
  ::slotted(*.center) {
    mixin(--css-center)
  }
  ::slotted(*.flex) {
    mixin(--css-flex)
  }
  ::slotted(* h4) {
    margin: 0;
  }
  ::slotted(*) {
    padding: 0 24px;
    box-sizing: border-box;
  }
  apply(--css-flex)
  @media (min-width: 640px) {
    :host {
      align-items: center;
    }
    .container {
      align-items: center;
      justify-content: center;
      max-width: 640px;
    }
    .wrapper {
      max-height: 640px;
    }
  }
</style>

<span class="container">
  <slot name="info"></slot>
  <span class="wrapper">
    <slot style="pointer-events: none;"></slot>
  </span>
</span>


<span class="toolbar">
  <top-button class="cancel">cancel</top-button>
  <span class="flex"></span>
  <top-button class="confirm">confirm</top-button>
</span>
`;
  }
});

export { topOrder as default };
