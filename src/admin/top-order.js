import { define, ElementBase } from './../base.js';

export default define(class TopOrder extends ElementBase {

  get offerDisplay() {
    return window.topstore.databases.get('offerDisplay');
  }

  get offers() {
    return window.topstore.databases.get('offers');
  }

  set value({ user, uid }) {
    if (user && uid) {
      const order = [...orders[user][uid]];
      const info = order.shift();
      this.order = order;
      this.orderLength = order.length;
      this.user = user;
      this.uid = uid;
      const promises = [];
      (async () => {
        for (const item of order) {
          promises.push((async () => {
            const { product, aantal } = item;
            const { name } = await this.offerDisplay.get(product);
            return `<span class="row selection" name="${product}">${name}<span class="flex" style="pointer-events: none;"></span>${aantal}</span>`
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
          
          <p class="name">${info.displayName}</p>           
        </span>
        
        <span class="row center" slot="info">        
          <h4 class="name">email:&nbsp;</h4>
          
          <p class="name">${info.email}</p>
        </span>
        
        
        <span class="row center" slot="info">
          <h4 class="name"><translated-string>collection time</translated-string>:</h4>
          <translated-string>${info.collectionTime}</translated-string>
        </span>

        <custom-selector multi="true" selected="[]" attr-for-selected="name">
          ${result.join(' ')}
        </custom-selector>
        `;
      })()
    }
  }

  constructor() {
    super();
  }
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    (async () => {
      await import('./../top-button.js')
    })();

    this.addEventListener('click', async ({path}) => {
      if (path[0].classList.contains('confirm')) {
        const selected = this.querySelector('custom-selector').selected;
        console.log(selected);
        if (selected.length !== this.orderLength) {
          const answer = await confirm(`are you sure?\n it seem's you haven't selected all products,\n\nIf everyting is in stock press cancel\n\npress confirm if item is out of stock (users will see this in their order list)`)

          if (answer === true) {

            let missing;
            if (selected.length === 0) missing = this.order;
            else {
              missing = [];
              this.order.map(o => {
                if (selected.indexOf(o.product) === -1) missing.push(o.product);
              })
            };
            firebase.database().ref(`orders/${this.user}/${this.uid}/0/missing`).set(missing);
            firebase.database().ref(`orders/${this.user}/${this.uid}/0/ready`).set('true');
            adminGo('orders')
          }
        } else {
          firebase.database().ref(`orders/${this.user}/${this.uid}/0/ready`).set('true');
          adminGo('orders')
        }
      }
      if (path[0].classList.contains('cancel')) adminGo('orders');
    })
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
})
