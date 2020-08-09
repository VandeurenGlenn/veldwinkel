import{d as e,E as s}from"./base-49bd4703.js";import"./custom-date-61d31a4f.js";export default e(class TopOrder extends s{get offerDisplay(){return globalThis.topstore.databases.get("offerDisplay")}get offers(){return globalThis.topstore.databases.get("offers")}set value({user:e,uid:s}){if(console.log(e,s),e&&s){const t=[...orders[e][s]],n=t.shift();this.order=t,this.orderLength=Number(t.length),this.user=e,this.uid=s;const a=[];(async()=>{for(const e of t)a.push((async()=>{const{product:s,aantal:t}=e,{name:n}=await this.offerDisplay.get(s);return`<span class="row selection" name="${s}">${n}<span class="flex" style="pointer-events: none;"></span>${t}</span>`})());const e=await Promise.all(a);this.innerHTML=`\n        <style>\n          h4 {\n            margin: 0;\n          }\n        </style>\n        <span class="row center" slot="info">        \n          <h4 class="name"><translated-string>name</translated-string>:</h4>\n          \n          <p class="name">${n.displayName}</p>           \n        </span>\n        \n        <span class="row center" slot="info">        \n          <h4 class="name">email:&nbsp;</h4>\n          \n          <p class="name">${n.email}</p>\n        </span>\n        \n        \n        <span class="row center" slot="info">\n          <h4 class="name"><translated-string>collection time</translated-string>:</h4>\n          <custom-date lang="nl" value="${n.collectionTime[1]}"></custom-date>\n        </span>\n\n        <custom-selector multi="true" selected="[]" attr-for-selected="name">\n          ${e.join(" ")}\n        </custom-selector>\n        `})()}}constructor(){super()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),(async()=>{await import("./top-button.js")})(),this.addEventListener("click",async({path:e})=>{if(e[0].classList.contains("confirm")){const e=this.querySelector("custom-selector").selected;if(console.log(e.length,this.orderLength),e.length!==this.orderLength){if(!0===await confirm("are you sure?\n it seem's you haven't selected all products,\n\nIf everyting is in stock press cancel\n\npress confirm if item is out of stock (users will see this in their order list)")){let s;0===e.length?s=this.order:(s=[],this.order.map(t=>{-1===e.indexOf(t.product)&&s.push(t.product)})),firebase.database().ref(`orders/${this.user}/${this.uid}/0/missing`).set(s),firebase.database().ref(`orders/${this.user}/${this.uid}/0/ready`).set("true"),firebase.database().ref(`orderKeys/${this.uid}`).remove(),firebase.database().ref(`collectionKeys/${this.uid}`).set(this.user),adminGo("orders")}}else firebase.database().ref(`orders/${this.user}/${this.uid}/0/ready`).set("true"),firebase.database().ref(`orderKeys/${this.uid}`).remove(),firebase.database().ref(`collectionKeys/${this.uid}`).set(this.user),adminGo("orders")}e[0].classList.contains("cancel")&&adminGo("orders")})}get template(){return html`<style>
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
`}});
