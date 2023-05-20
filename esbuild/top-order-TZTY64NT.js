import "./chunk-L354KD6H.js";
import {
  ElementBase,
  define_default
} from "./chunk-JGNXSNDS.js";
import {
  __async
} from "./chunk-DZ5PPEG7.js";

// src/admin/top-order.js
var top_order_default = define_default(class TopOrder extends ElementBase {
  get offerDisplay() {
    return globalThis.topstore.databases.get("offerDisplay");
  }
  get offers() {
    return globalThis.topstore.databases.get("offers");
  }
  get orders() {
    return window.topstore.databases.get("orders");
  }
  set value({ user, uid }) {
    (() => __async(this, null, function* () {
      console.log(uid, user);
      let order = yield this.orders.get(user);
      console.log({ order });
      order = order[uid];
      this.order = order;
      this.orderLength = order.products.length;
      this.user = user;
      this.uid = uid;
      const promises = [];
      (() => __async(this, null, function* () {
        for (const item of order.products) {
          promises.push((() => __async(this, null, function* () {
            const { key, count } = item;
            try {
              const { name: name2 } = yield this.offerDisplay.get(key);
            } catch (error) {
              console.error(`product not found`);
            }
            return `<span class="row selection" name="${key}">${name}<span class="flex" style="pointer-events: none;"></span>${count}</span>`;
          }))());
        }
        const result = yield Promise.all(promises);
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
          ${result.join(" ")}
        </custom-selector>
        `;
        this.querySelector("a").href = `mailto:${order.payer.email_address}`;
      }))();
    }))();
  }
  constructor() {
    super();
  }
  connectedCallback() {
    if (super.connectedCallback)
      super.connectedCallback();
    (() => __async(this, null, function* () {
      yield import("./top-button-ZB4PFNZN.js");
    }))();
    this.addEventListener("click", (event) => __async(this, null, function* () {
      const target = event.composedPath()[0];
      if (target.classList.contains("confirm")) {
        const selected = this.querySelector("custom-selector").selected;
        console.log(selected.length, this.orderLength);
        if (selected.length !== this.orderLength) {
          const answer = yield confirm(`are you sure?
 it seem's you haven't selected all products,

If everyting is in stock press cancel

press confirm if item is out of stock (users will see this in their order list)`);
          if (answer === true) {
            let missing;
            if (selected.length === 0)
              missing = this.order;
            else {
              missing = [];
              this.order.map((o) => {
                if (selected.indexOf(o.product) === -1)
                  missing.push(o.product);
              });
            }
            ;
            firebase.database().ref(`orders/${this.user}/${this.uid}/missing`).set(missing);
            firebase.database().ref(`orders/${this.user}/${this.uid}/ready`).set("true");
            firebase.database().ref(`orderKeys/${this.uid}`).remove();
            firebase.database().ref(`collectionKeys/${this.uid}`).set(this.user);
            adminGo("orders");
          }
        } else {
          firebase.database().ref(`orders/${this.user}/${this.uid}/ready`).set("true");
          firebase.database().ref(`orderKeys/${this.uid}`).remove();
          firebase.database().ref(`collectionKeys/${this.uid}`).set(this.user);
          adminGo("orders");
        }
      }
      if (target.classList.contains("cancel"))
        adminGo("orders");
    }));
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
export {
  top_order_default as default
};
