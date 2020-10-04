import{d as e,E as s}from"./base-49bd4703.js";export default e(class TopCollection extends s{set value({user:e,uid:s}){if(console.log(e,{uid:s}),e&&s){const n=collections[s];console.log(n),this.order=n,this.orderLength=n.length,this.user=e,this.uid=s,console.log({info:info}),this.innerHTML=`\n      <span class="row">\n        <h4 class="name">name</h4>\n        <span class="flex"></span>\n        <h4 class="name" slot="info">${n.payer.name.surname} ${n.payer.name.given_name}</h4>\n      </span>\n      <span class="row">\n        <h4 class="name">email</h4>\n        <span class="flex"></span>\n        <h4 class="name">${n.payer.email_address}</h4>\n      </span>\n        ${n.products.map(e=>`<span class="row" name="${e.key}">${e.key}<span class="flex" style="pointer-events: none;"></span>${e.count}</span>`).join(" ")}\n      `}}constructor(){super(),this._onClick=this._onClick.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),(async()=>{await import("./top-button.js")})(),this.addEventListener("click",this._onClick)}async _onClick({path:e}){if(e[0].classList.contains("confirm")){await firebase.database().ref(`orders/${this.user}/${this.uid}/shipped`).set("true"),await firebase.database().ref(`collectionKeys/${this.uid}`).remove();let e=await firebase.database().ref(`orders/${this.user}`).once("value");e=e.val(),0===Object.keys(e).reduce((s,n)=>(console.log(n),e[n].shipped||(s+=1),s),0)&&await firebase.database().ref(`orderKeys/${this.user}`).set(null),adminGo("collections")}e[0].classList.contains("cancel")&&adminGo("collections")}get template(){return html`<style>
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
  apply(--css-flex)
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

    <span class="toolbar">
      <top-button class="cancel">cancel</top-button>
      <span class="flex"></span>
      <top-button class="confirm">confirm</top-button>
    </span>
  </span>
</span>`}});
