export default define(class OrderList extends ElementBase{constructor(){super(),this._stampOrders=this._stampOrders.bind(this),this._onClick=this._onClick.bind(this)}connectedCallback(){super.connectedCallback(),(async()=>{firebase.auth().onAuthStateChanged(async e=>{if(await import("./order-list-item-5b704387.js"),e){firebase.database().ref(`orders/${e.uid}`).on("child_changed",this._stampOrders);const t=await firebase.database().ref(`orders/${e.uid}`).once("value");window.orders=t.val(),await this._stampOrders(),this.addEventListener("click",this._onClick,!0)}})})()}_onClick(e){"order-list-item"===e.path[0].localName&&(console.log(e.path[0].dataset.key),go("order",e.path[0].dataset.key))}async _stampOrders(){if(console.log(orders),orders)for(const e of Object.keys(orders)){let t;(t=this.querySelector(`[data-key="${e}"]`))||(t=document.createElement("order-list-item"),this.appendChild(t)),t.value=e}}get template(){return html`
<style>
  * {
    pointer-events: none;
    user-select: none;
  }
  :host {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .container {
    width: 100%;
  }
  ::slotted(span) {
    mixin(--css-column)

    min-height: 56px;
    height: 56px;
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  @media (min-width: 640px) {
    :host {
      align-items: center;
    }
    .container {
      max-width: 640px;
    }
  }
</style>
<span class="container"><slot></slot></span>`}});
