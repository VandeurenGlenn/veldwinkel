import{d as t}from"./selector-mixin-86543087.js";import{E as e}from"./base-76fe9a2c.js";import"./select-mixin-bf4ecf3c.js";import"./custom-svg-icon-6e670944.js";import"./top-icon-button.js";import"./top-button.js";import"./custom-pages-576d78fe.js";import"./index-c2ef2383.js";import"./custom-tabs-b77323f4.js";import"./custom-container-baf539bd.js";import"./translated-tab-2af6293b.js";import{t as s}from"./translated-string-a9e05c4f.js";import"./custom-date-61d31a4f.js";import"./custom-prompt-d99439b2.js";import"./checkout-prompt-89248f29.js";customElements.define("custom-drawer",class CustomDrawer extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.template}get template(){return'<style>\n      :host {\n        display: flex;\n        flex-direction: column;\n        width: var(--custom-drawer-width, 256px);\n        height: auto;\n        background: var(--custom-drawer-background, #FFF);\n        background-blend-mode: hue;\n        color: var(--custom-drawer-color, #333);\n        opacity: 0;\n        box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.14);\n      }\n      ::slotted([slot="header"]) {\n        display: block;\n        box-sizing: border-box;\n        min-height: 48px;\n        border-bottom: 1px solid rgba(0, 0, 0, 0.14);\n        color: var(--custom-header-color, #FFF);\n        background: var(--custom-header-background, #EEE);\n      }\n      ::slotted([slot="footer"]) {\n        display: block;\n        box-sizing: border-box;\n        min-height: 48px;\n        border-top: 1px solid rgba(0, 0, 0, 0.14);\n      }\n      ::slotted([slot="content"]) {\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n      }\n    </style>\n    <slot name="header"></slot>\n    <slot name="content"></slot>\n    <slot name="footer"></slot>'}});const o=(t,e="nl")=>{return s[e][t]||t};(()=>window.translate=o)();class Store{constructor(t="keyval-store",e="keyval"){this.storeName=e,this._dbp=new Promise((s,o)=>{const i=indexedDB.open(t,1);i.onerror=(()=>o(i.error)),i.onsuccess=(()=>s(i.result)),i.onupgradeneeded=(()=>{i.result.createObjectStore(e)})})}_withIDBStore(t,e){return this._dbp.then(s=>new Promise((o,i)=>{const n=s.transaction(this.storeName,t);n.oncomplete=(()=>o()),n.onabort=n.onerror=(()=>i(n.error)),e(n.objectStore(this.storeName))}))}}let i;function n(){return i||(i=new Store),i}var a=Object.freeze({Store:Store,get:function(t,e=n()){let s;return e._withIDBStore("readonly",e=>{s=e.get(t)}).then(()=>s.result)},set:function(t,e,s=n()){return s._withIDBStore("readwrite",s=>{s.put(e,t)})},del:function(t,e=n()){return e._withIDBStore("readwrite",e=>{e.delete(t)})},clear:function(t=n()){return t._withIDBStore("readwrite",t=>{t.clear()})},keys:function(t=n()){const e=[];return t._withIDBStore("readonly",t=>{(t.openKeyCursor||t.openCursor).call(t).onsuccess=function(){this.result&&(e.push(this.result.key),this.result.continue())}}).then(()=>e)}});const{Store:r,set:c,get:l,del:h,keys:d}=a;class OADB{constructor(t){this.sync=this.sync.bind(this),this.remove=this.remove.bind(this),this.name=t,window.addEventListener("online",function(t){console.log("online")},!1),window.addEventListener("offline",function(t){console.log("offline")},!1),this.isOnline()&&this.init()}isOnline(){return navigator.onLine}async init(){this.store=await new r(`odb-${this.name}`,this.name),this.localStore=await new r(`odb-local-${this.name}`,this.name),this.ref=firebase.database().ref(this.name),await this.sync(),this.ref.on("child_removed",this.remove),this.ref.on("child_changed",this.sync),this.ref.on("child_added",t=>{pubsub.publish(`${this.name}.added`,t.key)})}async remove(t){pubsub.publish(`${this.name}.remove`,t.key),await h(t.key,this.store)}async sync(t){if(this.ref&&this.isOnline())if(t=(t=await this.ref.once("value")).val()){for(const e of Object.keys(t)){const s=await l(e,this.store);s?t[e].timestamp>s.timestamp&&await c(e,t[e],this.store):await c(e,t[e],this.store)}const e=await d(this.store);if(e&&e.length>0)for(const s of e)t[s]||await h(s,this.store)}else{const t=await d(this.store);if(t&&t.length>0)for(const e of t)await h(e,this.store)}}async set(t,e){if(t)return await c(t,e,this.store);const s=[];for(const t of Object.keys(e))s.push(c(t,e[t],this.store));return Promise.all(s)}get(t){return new Promise(async(e,s)=>{const o=this.isOnline();let i={};if(t)i=await l(t,this.store);else{const t=await d(this.store);if(t&&t.length>0)for(const e of t)i[e]=await l(e,this.store)}if(i&&Object.keys(i).length>0&&e(i),o&&this.ref){let s;if(s=(s=t?await firebase.database().ref(`${this.name}/${t}`).once("value"):await this.ref.once("value")).val(),!i&&s||i&&0===Object.keys(i).length&&s)if(e(s),t)await c(t,s,this.store);else for(const t of Object.keys(s))await c(t,s[t],this.store);else if(s&&i&&i.timestamp<s.timestamp){if(t)await c(t,s,this.store);else for(const t of Object.keys(s))await c(t,s[t],this.store);document.dispatchEvent(new CustomEvent("storage-update",{detail:{child:t,snap:s}}))}}e()})}}const{Store:p,set:u,get:m,remove:w,keys:g}=a;console.log(a);class OADBSync{constructor(t){console.log(this.isOnline()),this.sync=this.sync.bind(this),this.name=t,window.addEventListener("online",function(t){console.log("online")},!1),window.addEventListener("offline",function(t){console.log("offline")},!1),this.isOnline()&&this.init()}isOnline(){return navigator.onLine}async init(){console.log(this.isOnline()),this.store=await new p(`odb-${this.name}`,this.name),this.ref=firebase.database().ref(this.name),await this.sync(),this.ref.on("child_changed",this.sync)}async sync(t){if(this.ref&&this.isOnline()){t=(t=await this.ref.once("value")).val();for(const e of Object.keys(t)){const s=await m(e,this.store);s?t[e].timestamp>s.timestamp&&await u(e,t[e],this.store):await u(e,t[e],this.store)}}}async set(t,e){if(t)return await u(t,e,this.store);const s=[];for(const t of Object.keys(e))s.push(u(t,e[t],this.store));return Promise.all(s)}get(t){return new Promise(async(e,s)=>{const o=this.isOnline();console.log({online:o});let i={};if(t)i=await m(t,this.store);else{const t=await g(this.store);if(t&&t.length>0)for(const e of t)i[e]=await m(e,this.store)}if(i&&Object.keys(i).length>0&&e(i),o&&this.ref){let s;if(s=(s=t?await firebase.database().ref(`${this.name}/${t}`).once("value"):await this.ref.once("value")).val(),!i&&s||i&&0===Object.keys(i).length&&s)if(e(s),t)await u(t,s,this.store);else for(const t of Object.keys(s))await u(t,s[t],this.store);else if(s&&i&&i.timestamp<s.timestamp){if(t)await u(t,s,this.store);else for(const t of Object.keys(s))await u(t,s[t],this.store);document.dispatchEvent(new CustomEvent("storage-update",{detail:{child:t,snap:s}}))}}e()})}}let f;class OADBManager{constructor(t=!0){f="boolean"!=typeof t||t?OADBSync:OADB,this.databases=new Map}init(t){this.databases.set(t,new f(t))}get(t){let e=this.databases.get(t);return e||(this.init(t),e=this.databases.get(t)),e}set(t){let e=this.databases.get(t);return e||(this.init(t),e=this.databases.get(t)),e||null}}customElements.define("custom-fab",class CustomFab extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="\n<style>\n  :host {\n    display: block;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n    height: 56px;\n    width: var(--custom-fab-width, 56px);\n  }\n</style>\n\n<slot></slot>"}});class ShopCartController{constructor(t,e,s){console.log(t),this.cart=t,this.cartAction=e,this.items=s||{},window.shoppingCart=window.shoppingCart||{},window.shoppingCart.add=window.shoppingCart.add||this.add.bind(this),window.shoppingCart.change=window.shoppingCart.change||this.change.bind(this),window.shoppingCart.remove=window.shoppingCart.remove||this.remove.bind(this),window.shoppingCart.submit=window.shoppingCart.submit||this.submit.bind(this),window.shoppingCart.items=window.shoppingCart.items||this.items}add(t){this.items[t.uid]?(this.items[t.uid].count+=t.count,this.cart.change(this.items[t.uid])):(t.count||(t.count=1),this.items[t.uid]=t,this.cart.add(t),this.cartAction.add(t))}change(t){this.items[t.uid]&&(this.items[t.uid]=t,this.cart.change(t))}remove(t){this.cart.remove(t),this.items[t]&&(delete this.items[t],this.cartAction.remove(t))}async checkout(t){const e=await firebase.database().ref(`orders/${user.uid}`).push(t);await firebase.database().ref(`orderKeys/${e.key}`).set(user.uid),console.log(e.key),"granted"===await Notification.requestPermission()&&navigator.serviceWorker.ready.then(t=>{t.showNotification("Guldentop Veldwinkel",{body:`order geplaatst\nu kan deze afhalen met: ${e.key}`,link:"https://guldentopveldwinkel.be",data:e.key,actions:[{action:"location",title:"afhaallocatie"},{action:"checkOrder",title:"bekijk bestelling"}]})}),Object.keys(this.items).forEach(t=>this.remove(t)),go("order",e.key)}async submit(){window.user||await window.signin(),await import("./checkout-prompt-89248f29.js");let t=document.createElement("checkout-prompt");document.body.appendChild(t);const e=await t.show();if("googlepay"===e[1]){await import("./shop-checkout-be83e64c.js");const t=document.createElement("shop-checkout");document.body.appendChild(t),t.paymentRequest([],50)}else if("paypal"===e[1]){await import("./paypal-checkout-0ad934c2.js");const t=document.createElement("paypal-checkout");document.body.appendChild(t),await t.show(this.items)}const s=[{collectionTime:e[0],payment:e[1],referentie:null,displayName:user.displayName,email:user.email,phoneNumber:user.phoneNumber}];Object.keys(this.items).forEach(t=>{console.log(this.items[t]),console.log(t),console.log(this.cart.querySelector(`[uid="${t}"]`).count),s.push({product:t,aantal:Number(this.items[t].count)})}),s.length>1&&this.checkout(s)}}export default t(class AppShell extends e{get badge(){return this.selector.querySelector(".badge")}get cart(){return this.shadowRoot.querySelector("shop-cart")}get cartAction(){return this.shadowRoot.querySelector("shop-cart-action")}get pages(){return this.shadowRoot.querySelector("custom-pages")}get map(){return this.shadowRoot.querySelector("iframe")}get selector(){return this.shadowRoot.querySelector("custom-selector")}get drawer(){return this.shadowRoot.querySelector("custom-drawer")}get translatedTitle(){return this.querySelector("translated-string")}set drawerOpened(t){t?(this.setAttribute("drawer-opened",""),this.map.width-=256):this.removeAttribute("drawer-opened")}get drawerOpened(){return this.hasAttribute("drawer-opened")}get routeInfo(){return this.shadowRoot.querySelector(".route-info")}constructor(){super(),this._selectorChange=this._selectorChange.bind(this),this._menuClick=this._menuClick.bind(this),this._onPopstate=this._onPopstate.bind(this),this._onCounterChange=this._onCounterChange.bind(this),this.select=this.select.bind(this),window.onpopstate=this._onPopstate,this.drawerOpened=!1,window.topstore=window.topstore||{},window.topstore.databases=window.topstore.databases||new OADBManager(!0),this._onResize=this._onResize.bind(this)}connectedCallback(){super.connectedCallback(),this.selector.addEventListener("selected",this._selectorChange),window.addEventListener("resize",this._onResize),this.querySelector('custom-svg-icon[icon="menu"]').addEventListener("click",this._menuClick),(async()=>{if(window.location.hash){let t=window.location.hash.split("#");if((t=t[1].split("?"))[1]&&this.selector.select(t[0]),console.log(t[1]),t[1]){const e=t[1].split("=");this.pages.querySelector(`[route="${t[0]}"]`).value=e[1],this.select(t[0],e[1])}else this.select(t[0])}else this.selector.select("products"),await this._selectorChange();const t=this.querySelector(".login-button");this._onResize(),firebase.auth().onAuthStateChanged(async e=>{if(console.log(e),e){if("admin@veldwinkel.be"===e.email)return logout();window.ref=firebase.database().ref(`${e.uid}`),window.user=e,e.photoURL&&(t.innerHTML=`<img src="${e.photoURL}"></img>`)}else t.innerHTML="login",t.addEventListener("click",async()=>{window.signin()})}),await import("./shop-cart-action-18360e24.js"),await import("./shop-cart-724bd5a3.js"),new ShopCartController(this.cart,this.cartAction)})(),document.addEventListener("counter-change",this._onCounterChange),window.go=this.select}_onResize(){const{height:t,width:e}=this.pages.getClientRects()[0];e>960&&!this.drawerOpened&&(this.drawerOpened=!0),requestAnimationFrame(()=>{this.drawerOpened?this.map.width=e-256:this.map.width=e,this.map.height=t})}_onPopstate(){history.state&&(this.selector.selected=history.state.selected),this._selectorChange()}_menuClick(){this.drawerOpened=!this.drawerOpened}hideShopCartAction(){this.shadowRoot.querySelector("shop-cart-action").classList.add("hide"),this.pages.style.bottom=0}showShopCartAction(){this.shadowRoot.querySelector("shop-cart-action").classList.remove("hide"),this.pages.style.bottom="56px"}_onCounterChange({detail:t}){0===t?this.badge.classList.remove("active"):this.badge.classList.contains("active")||this.badge.classList.add("active")}async select(t,e){if(console.log(t),t){this.selector.select(t),this.pages.select(t),this.pages.setAttribute("selected",t);const s=e?`#${t}?uid=${e}`:`#${t}`;history.pushState({selected:t},t,s),"home"===t&&(this.hideShopCartAction(),await import("./home.js")),"contact"===t&&(this.hideShopCartAction(),await import("./contact-aa9be504.js")),"orders"===t&&(this.hideShopCartAction(),await import("./order-list.js")),"cart"===t&&(this.hideShopCartAction(),this.pages.querySelector("shop-cart")||await import("./shop-cart-724bd5a3.js")),"order"===t&&(this.hideShopCartAction(),this.pages.querySelector("client-order").shadowRoot||await import("./client-order.js"),console.log(e),this.pages.querySelector("client-order").value=e,this.pages.querySelector("client-order")._stamp(),console.log(this.pages.querySelector("client-order"))),"products"===t&&(this.showShopCartAction(),await import("./client-products-6d246474.js")),"product"===t&&(this.showShopCartAction(),this.pages.querySelector("client-product").shadowRoot||await import("./client-product.js"),this.pages.querySelector("client-product").key=e),"info"===t&&(this.routeInfo.src="https://maps.google.com/maps?q=guldentopveldwinkel&t=&z=17&ie=UTF8&iwloc=&output=embed")}}_selectorChange(){return this.select(this.selector.selected)}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    
    --svg-icon-color: #535353;
  }
  custom-drawer {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-105%);
  }
  custom-pages {
    position: absolute;
    right: 0;
    bottom: 56px;
    top: 56px;
    left: 0;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    background: transparent;
  }
  ::slotted(header) {
    position: absolute;
    right: 0;
  }
  :host([drawer-opened]) custom-drawer {
    opacity: 1;
    transform: translateX(0);
  }

  header h3 {
    margin: 0;
    color: #616161;
    font-size: 20px;
  }
  custom-drawer .selection {
    height: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 24px;
    text-transform: uppercase;
    cursor: pointer;
    color: #fff;
    --svg-icon-color: #fff;
    opacity: 0.88;
  }
  custom-drawer .custom-selected {
    background: #6a913d;
  }
  custom-drawer custom-svg-icon {
    pointer-events: none;
  }
  custom-drawer {
    position: fixed;
    z-index: 100;
  }
  
  custom-drawer custom-selector {
    background: #ffffff linear-gradient(167deg, #48480d, #423e21 40rem);
  }
  .flex {
    flex: 1;
  }
  
  .row {
    display: flex;
  }

  .column {
    display: flex;
    flex-direction: column;
  }
  custom-selector {
    height: 100%;
  }
  section {
    display: flex;
    flex-direction: column;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  shop-cart-action {
    position: fixed;
    bottom: 0;
    right: 0;
  }
  .hide {
    
    height: 0;
    overflow: hidden;
    width: 0;
    opacity: 0;
    pointer-events: none;
  }
  
  .badge {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2f6c12c9;
    margin-left: 4px;
  }
  .badge.active {
    height: 14px;
    width: 14px;
  }
  translated-string {
    text-transform: uppercase;
  }
  @media (min-width: 960px) {
    section {
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 640px;
    }
    custom-drawer {
      position: absolute;
    }
    :host([drawer-opened]) custom-pages,
    :host([drawer-opened]) ::slotted(header),
    :host([drawer-opened]) gesture-action-bar {
      left: var(--custom-drawer-width);
      width: calc(100% - 256px);
    }
  }
  /* custom-pages[selected="home"] {
    top: 0;
  } */
</style>

<slot></slot>
<custom-drawer>

  <custom-selector slot="content" attr-for-selected="data-route" selected="order">
    <span class="row selection" data-route="home" >
      <custom-svg-icon icon="home"></custom-svg-icon>
      <span class="flex"></span>
      home
    </span>
    
    <span class="row selection" data-route="products" >
      <custom-svg-icon icon="shopping-basket"></custom-svg-icon>
      <span class="flex"></span>
      producten
    </span>

    <!-- <span class="row selection" data-route="stock" >
      <custom-svg-icon icon="dashboard"></custom-svg-icon>
      <span class="flex"></span>
      veld overzicht
    </span> -->
    
    <!-- <span class="row selection" data-route="quick-order" >
      <custom-svg-icon icon="shopping-cart"></custom-svg-icon>
      <span class="flex"></span>
      snelle bestelling
    </span> -->

    <span class="row selection" data-route="info" >
      <custom-svg-icon icon="map"></custom-svg-icon>
      <span class="flex"></span>      
      <translated-string>location information</translated-string>
    </span>

    <span class="row selection" data-route="contact" >
      <custom-svg-icon icon="info"></custom-svg-icon>
      <span class="flex"></span>
      <translated-string>contact</translated-string>
    </span>
    
    <span class="flex" style="pointer-events: none;"></span>

    <!-- <span class="row selection" data-route="about" >
      <custom-svg-icon icon="info"></custom-svg-icon>
      <span class="flex"></span>
      about
    </span> -->
    
    <span class="row selection" data-route="cart" >
      <custom-svg-icon icon="shopping-cart"></custom-svg-icon>
      <span class="badge"></span>
      <span class="flex"></span>
      <translated-string>shopping cart</translated-string>
    </span>    

    <span class="row selection" data-route="orders" >
      <custom-svg-icon icon="orders"></custom-svg-icon>
      <span class="flex"></span>
      bestellingen
    </span>

  </custom-selector>
</custom-drawer>
<custom-pages attr-for-selected="route">
  <home-section route="home"></home-section>
  <contact-section route="contact"></contact-section>
  <shop-cart route="cart"></shop-cart>
  <top-client-order route="quick-order"></top-client-order>
  <client-products route="products"></client-products>
  <client-product route="product"></client-product>
  <!-- <item-list route="stock" type="stock"></item-list> -->
  <order-list route="orders" type="orders"></order-list>
  <client-order route="order" type="order"></client-order>
  <section route="info">
    <iframe class="route-info" width="600" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    <h4 style="padding: 12px 16px;
    box-sizing: border-box;
    text-align: center;">Opgelet: gelieve niet te parkeren bij nr 33, onze parking bevind zich verder door langs de zij/veld(weg), vlak naast het veld.</h4>
  </section>
</custom-pages>
<shop-cart-action>
  <top-icon-button slot="fab" icon="shopping-cart">shoplist</top-icon-button>
</shop-cart-action>`}});
