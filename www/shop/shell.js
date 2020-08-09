import{S as t,a as e,d as s,R as o,E as n}from"./base-8131728b.js";import"./custom-svg-icon-6e670944.js";import"./custom-container-df0870f4.js";import{t as i}from"./translated-string-8d4db03f.js";import"./custom-date-61d31a4f.js";import"./checkout-prompt-606f194b.js";customElements.define("custom-pages",class CustomPages extends(t(HTMLElement)){constructor(){super(),this.slotchange=this.slotchange.bind(this),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n      <style>\n        :host {\n          flex: 1;\n          position: relative;\n          --primary-background-color: #ECEFF1;\n          overflow: hidden;\n        }\n        ::slotted(*) {\n          display: flex;\n          position: absolute;\n          opacity: 0;\n          pointer-events: none;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          transition: transform ease-out 160ms, opacity ease-out 60ms;\n          /*transform: scale(0.5);*/\n          transform-origin: left;\n        }\n        ::slotted(.animate-up) {\n          transform: translateY(-120%);\n        }\n        ::slotted(.animate-down) {\n          transform: translateY(120%);\n        }\n        ::slotted(.custom-selected) {\n          opacity: 1;\n          pointer-events: auto;\n          transform: translateY(0);\n          transition: transform ease-in 160ms, opacity ease-in 320ms;\n          max-height: 100%;\n          max-width: 100%;\n        }\n      </style>\n      \x3c!-- TODO: scale animation, ace doesn\'t resize that well ... --\x3e\n      <div class="wrapper">\n        <slot></slot>\n      </div>\n    '}connectedCallback(){super.connectedCallback(),this.shadowRoot.querySelector("slot").addEventListener("slotchange",this.slotchange)}isEvenNumber(t){return Boolean(t%2==0)}slotchange(){let t=0;for(const e of this.slotted.assignedNodes())e&&1===e.nodeType&&(e.style.zIndex=99-t,this.isEvenNumber(t++)?e.classList.add("animate-down"):e.classList.add("animate-up"),this.dispatchEvent(new CustomEvent("child-change",{detail:e})))}});(t=>customElements.define("custom-selector",t))(class CustomSelector extends(e(HTMLElement)){constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="<slot></slot>"}}),s(class CustomTabs extends(o(e(HTMLElement))){constructor(){super()}get template(){return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          /*align-items: flex-end;*/
          height: var(--custom-tabs-height, 48px);
        }
      </style>
      <slot></slot>
    `}}),customElements.define("custom-drawer",class CustomDrawer extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.template}get template(){return'<style>\n      :host {\n        display: flex;\n        flex-direction: column;\n        width: var(--custom-drawer-width, 256px);\n        height: auto;\n        background: var(--custom-drawer-background, #FFF);\n        background-blend-mode: hue;\n        color: var(--custom-drawer-color, #333);\n        opacity: 0;\n        box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.14);\n      }\n      ::slotted([slot="header"]) {\n        display: block;\n        box-sizing: border-box;\n        min-height: 48px;\n        border-bottom: 1px solid rgba(0, 0, 0, 0.14);\n        color: var(--custom-header-color, #FFF);\n        background: var(--custom-header-background, #EEE);\n      }\n      ::slotted([slot="footer"]) {\n        display: block;\n        box-sizing: border-box;\n        min-height: 48px;\n        border-top: 1px solid rgba(0, 0, 0, 0.14);\n      }\n      ::slotted([slot="content"]) {\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n      }\n    </style>\n    <slot name="header"></slot>\n    <slot name="content"></slot>\n    <slot name="footer"></slot>'}}),s(class TopIconButton extends n{get icon(){return this._icon}set icon(t){t!==this._icon&&(this._icon=t,this.setAttribute("icon",t),this.shadowRoot.querySelector("custom-svg-icon").setAttribute("icon",t))}constructor(){super()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.icon=this.getAttribute("icon")}get template(){return html`
    <style>
      :host {
        --top-icon-button-height: 54px;
        display: flex;
        flex-direction: row;
        height: var(--top-icon-button-height);
        user-select: none;
        border-radius: 30px;
        --svg-icon-color: #1B5E20;
        border-radius: 30px;
        border-bottom-left-radius: var(--top-icon-button-border-radius-left, 30px);
        border-bottom-right-radius: var(--top-icon-button-border-radius-right, 30px);
        overflow: hidden;
        pointer-events: auto;
        cursor: pointer;
      }
      button {
        display: flex;
        flex-direction: row;
        border-radius: 30px;
        border-bottom-left-radius: var(--top-icon-button-border-radius-left, 30px);
        border-bottom-right-radius: var(--top-icon-button-border-radius-right, 30px);
        padding: 10px 14px;
        width: 100%;
        background: transparent;
        align-items: center;
        box-sizing: border-box;
        outline: none;
        cursor: pointer;
        border-color: #8BC34A;
        color: var(--svg-icon-color);
        text-transform: uppercase;
        overflow: hidden;
        pointer-events: none;
      }
      custom-svg-icon {
        padding-right: 10px;
        width: calc(var(--top-icon-button-height) - 28px);
        height: calc(var(--top-icon-button-height) - 28px);
      }
    </style>


    <button>
      <custom-svg-icon></custom-svg-icon>
      <span style="flex: 1;"></span>
      <slot></slot>
    </button>
    `}}),s(class TopButton extends n{constructor(){super()}get template(){return html`
    <style>
      :host {
        --top-button-height: 54px;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: var(--top-button-height);
        user-select: none;
        pointer-events: auto;
        cursor: pointer;
      }
      button {
        display: flex;
        flex-direction: row;
        padding: 10px 14px;
        width: 100%;
        background: transparent;
        align-items: center;
        box-sizing: border-box;
        outline: none;
        cursor: pointer;
        border: none;
        pointer-events: none;
        cursor: pointer;
        text-transform: uppercase;
      }
      custom-svg-icon {
        padding-right: 10px;
        width: calc(var(--top-button-height) - 28px);
        height: calc(var(--top-button-height) - 28px);
        pointer-events: none;
      }
      slot {
        font-size: 18px;
        pointer-events: none;
      }
    </style>


    <button>
      <slot></slot>
    </button>`}}),s(class CustomTab extends(o(HTMLElement)){constructor(){super(),this._onMouseIn=this._onMouseIn.bind(this),this._onMouseOut=this._onMouseOut.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseover",this._onMouseIn),this.addEventListener("mouseout",this._onMouseOut)}disconnected(){this.removeEventListener("mouseover",this._onMouseIn),this.removeEventListener("mouseout",this._onMouseOut)}_onMouseIn(){this.classList.add("over")}_onMouseOut(){this.classList.remove("over")}get template(){return html`
    <style>
      :host {
        position: relative;
        display: inline-flex;
        width: 148px;
        height: 48px;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        box-sizing: border-box;
        cursor: pointer;

        --svg-icon-size: 16px;
        --svg-icon-color: #EEE;
      }

      :host(.custom-selected) {
        border-bottom: 2px solid #00B8D4;
      }
    </style>
    <slot></slot>
    `}}),s(class TranslatedTab extends n{set text(t){this.render({text:t})}constructor(){super()}connectedCallback(){super.connectedCallback(),this.text=this.innerHTML}get template(){return html`
    <style>
      :host {
        position: relative;
        display: inline-flex;
        width: 118px;
        height: 48px;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        box-sizing: border-box;
        cursor: pointer;
        --svg-icon-size: 16px;
        --svg-icon-color: #EEE;
        user-select: none;
      }
      :host(.custom-selected) {
        border-bottom: 2px solid #00B8D4;
      }
      custom-tab {
        pointer-events: none;
        text-transform: uppercase;
      }
    </style>
<custom-tab>
  ${"text"}
</custom-tab>
    `}});const r=(t,e="nl")=>{return i[e][t]||t};(()=>window.translate=r)();class Store{constructor(t="keyval-store",e="keyval"){this.storeName=e,this._dbp=new Promise((s,o)=>{const n=indexedDB.open(t,1);n.onerror=(()=>o(n.error)),n.onsuccess=(()=>s(n.result)),n.onupgradeneeded=(()=>{n.result.createObjectStore(e)})})}_withIDBStore(t,e){return this._dbp.then(s=>new Promise((o,n)=>{const i=s.transaction(this.storeName,t);i.oncomplete=(()=>o()),i.onabort=i.onerror=(()=>n(i.error)),e(i.objectStore(this.storeName))}))}}let a;function c(){return a||(a=new Store),a}var l=Object.freeze({Store:Store,get:function(t,e=c()){let s;return e._withIDBStore("readonly",e=>{s=e.get(t)}).then(()=>s.result)},set:function(t,e,s=c()){return s._withIDBStore("readwrite",s=>{s.put(e,t)})},del:function(t,e=c()){return e._withIDBStore("readwrite",e=>{e.delete(t)})},clear:function(t=c()){return t._withIDBStore("readwrite",t=>{t.clear()})},keys:function(t=c()){const e=[];return t._withIDBStore("readonly",t=>{(t.openKeyCursor||t.openCursor).call(t).onsuccess=function(){this.result&&(e.push(this.result.key),this.result.continue())}}).then(()=>e)}});const{Store:d,set:h,get:u,del:p,keys:m}=l;class OADB{constructor(t){this.sync=this.sync.bind(this),this.remove=this.remove.bind(this),this.name=t,window.addEventListener("online",function(t){console.log("online")},!1),window.addEventListener("offline",function(t){console.log("offline")},!1),this.isOnline()&&this.init()}isOnline(){return navigator.onLine}async init(){this.store=await new d(`odb-${this.name}`,this.name),this.localStore=await new d(`odb-local-${this.name}`,this.name),this.ref=firebase.database().ref(this.name),await this.sync(),this.ref.on("child_removed",this.remove),this.ref.on("child_changed",this.sync),this.ref.on("child_added",t=>{pubsub.publish(`${this.name}.added`,t.key)})}async remove(t){pubsub.publish(`${this.name}.remove`,t.key),await p(t.key,this.store)}async sync(t){if(this.ref&&this.isOnline())if(t=(t=await this.ref.once("value")).val()){for(const e of Object.keys(t)){const s=await u(e,this.store);s?t[e].timestamp>s.timestamp&&await h(e,t[e],this.store):await h(e,t[e],this.store)}const e=await m(this.store);if(e&&e.length>0)for(const s of e)t[s]||await p(s,this.store)}else{const t=await m(this.store);if(t&&t.length>0)for(const e of t)await p(e,this.store)}}async set(t,e){if(t)return await h(t,e,this.store);const s=[];for(const t of Object.keys(e))s.push(h(t,e[t],this.store));return Promise.all(s)}get(t){return new Promise(async(e,s)=>{const o=this.isOnline();console.log(t);let n={};if(t)n=await u(t,this.store);else{const t=await m(this.store);if(t&&t.length>0)for(const e of t)n[e]=await u(e,this.store)}if(console.log({data:n}),n&&Object.keys(n).length>0&&e(n),o&&this.ref){let s;if(s=(s=t?await firebase.database().ref(`${this.name}/${t}`).once("value"):await this.ref.once("value")).val(),!n&&s||n&&0===Object.keys(n).length&&s)if(e(s),t)await h(t,s,this.store);else for(const t of Object.keys(s))await h(t,s[t],this.store);else if(s&&n&&n.timestamp<s.timestamp){if(t)await h(t,s,this.store);else for(const t of Object.keys(s))await h(t,s[t],this.store);document.dispatchEvent(new CustomEvent("storage-update",{detail:{child:t,snap:s}}))}}e()})}}const{Store:g,set:w,get:b,remove:f,keys:y}=l;console.log(l);class OADBSync{constructor(t){console.log(this.isOnline()),this.sync=this.sync.bind(this),this.name=t,window.addEventListener("online",function(t){console.log("online")},!1),window.addEventListener("offline",function(t){console.log("offline")},!1),this.isOnline()&&this.init()}isOnline(){return navigator.onLine}async init(){console.log(this.isOnline()),this.store=await new g(`odb-${this.name}`,this.name),this.ref=firebase.database().ref(this.name),await this.sync(),this.ref.on("child_changed",this.sync)}async sync(t){if(this.ref&&this.isOnline()){t=(t=await this.ref.once("value")).val();for(const e of Object.keys(t)){const s=await b(e,this.store);s?t[e].timestamp>s.timestamp&&await w(e,t[e],this.store):await w(e,t[e],this.store)}}}async set(t,e){if(t)return await w(t,e,this.store);const s=[];for(const t of Object.keys(e))s.push(w(t,e[t],this.store));return Promise.all(s)}get(t){return new Promise(async(e,s)=>{const o=this.isOnline();console.log({online:o});let n={};if(t)n=await b(t,this.store);else{const t=await y(this.store);if(t&&t.length>0)for(const e of t)n[e]=await b(e,this.store)}if(n&&Object.keys(n).length>0&&e(n),o&&this.ref){let s;if(s=(s=t?await firebase.database().ref(`${this.name}/${t}`).once("value"):await this.ref.once("value")).val(),!n&&s||n&&0===Object.keys(n).length&&s)if(e(s),t)await w(t,s,this.store);else for(const t of Object.keys(s))await w(t,s[t],this.store);else if(s&&n&&n.timestamp<s.timestamp){if(t)await w(t,s,this.store);else for(const t of Object.keys(s))await w(t,s[t],this.store);document.dispatchEvent(new CustomEvent("storage-update",{detail:{child:t,snap:s}}))}}e()})}}let v;class OADBManager{constructor(t=!0){v="boolean"!=typeof t||t?OADBSync:OADB,this.databases=new Map}init(t){this.databases.set(t,new v(t))}get(t){let e=this.databases.get(t);return e||(this.init(t),e=this.databases.get(t)),e}set(t){let e=this.databases.get(t);return e||(this.init(t),e=this.databases.get(t)),e||null}}customElements.define("custom-fab",class CustomFab extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="\n<style>\n  :host {\n    display: block;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n    height: 56px;\n    width: var(--custom-fab-width, 56px);\n  }\n</style>\n\n<slot></slot>"}});class ShopCartController{constructor(t,e,s){this.cart=t,this.cartAction=e,this.items=s||{},window.shoppingCart=window.shoppingCart||{},window.shoppingCart.add=window.shoppingCart.add||this.add.bind(this),window.shoppingCart.change=window.shoppingCart.change||this.change.bind(this),window.shoppingCart.remove=window.shoppingCart.remove||this.remove.bind(this),window.shoppingCart.submit=window.shoppingCart.submit||this.submit.bind(this)}add(t){this.items[t.uid]?(this.items[t.uid].count+=t.count,this.cart.change(this.items[t.uid])):(t.count||(t.count=1),this.items[t.uid]=t,this.cart.add(t),this.cartAction.add(t))}change(t){this.items[t.uid]&&(this.items[t.uid]=t,this.cart.change(t))}remove(t){this.items[t]&&(delete this.items[t],this.cart.remove(t),this.cartAction.remove(t))}async checkout(t){const e=await firebase.database().ref(`orders/${user.uid}`).push(t);await firebase.database().ref(`orderKeys/${e.key}`).set(user.uid),console.log(e.key),"granted"===await Notification.requestPermission()&&navigator.serviceWorker.ready.then(t=>{t.showNotification("Guldentop Veldwinkel",{body:`order geplaatst\nu kan deze afhalen met: ${e.key}`,link:"https://guldentopveldwinkel.be",data:e.key,actions:[{action:"location",title:"afhaallocatie"},{action:"checkOrder",title:"bekijk bestelling"}]})}),Object.keys(this.items).forEach(t=>this.remove(t)),go("order",e.key)}async submit(){window.user||await window.signin(),await import("./checkout-prompt-606f194b.js");let t=document.createElement("checkout-prompt");document.body.appendChild(t);const e=await t.show();if("googlepay"===e[1]){await import("./shop-checkout-be83e64c.js");const t=document.createElement("shop-checkout");document.body.appendChild(t),t.paymentRequest([],50)}const s=[{collectionTime:e[0],payment:e[1],referentie:null,displayName:user.displayName,email:user.email,phoneNumber:user.phoneNumber}];Object.keys(this.items).forEach(t=>{console.log(this.items[t]),console.log(t),console.log(this.cart.querySelector(`[uid="${t}"]`).count),s.push({product:t,aantal:Number(this.items[t].count)})}),s.length>1&&this.checkout(s)}}export default s(class AppShell extends n{get badge(){return this.selector.querySelector(".badge")}get cart(){return this.shadowRoot.querySelector("shop-cart")}get cartAction(){return this.shadowRoot.querySelector("shop-cart-action")}get pages(){return this.shadowRoot.querySelector("custom-pages")}get map(){return this.shadowRoot.querySelector("iframe")}get selector(){return this.shadowRoot.querySelector("custom-selector")}get drawer(){return this.shadowRoot.querySelector("custom-drawer")}get translatedTitle(){return this.querySelector("translated-string")}set drawerOpened(t){t?(this.setAttribute("drawer-opened",""),this.map.width-=256):this.removeAttribute("drawer-opened")}get drawerOpened(){return this.hasAttribute("drawer-opened")}get routeInfo(){return this.shadowRoot.querySelector(".route-info")}constructor(){super(),this._selectorChange=this._selectorChange.bind(this),this._menuClick=this._menuClick.bind(this),this._onPopstate=this._onPopstate.bind(this),this._onCounterChange=this._onCounterChange.bind(this),this.select=this.select.bind(this),window.onpopstate=this._onPopstate,this.drawerOpened=!1,window.topstore=window.topstore||{},window.topstore.databases=window.topstore.databases||new OADBManager(!0),this._onResize=this._onResize.bind(this)}connectedCallback(){super.connectedCallback(),this.selector.addEventListener("selected",this._selectorChange),window.addEventListener("resize",this._onResize),this.querySelector('custom-svg-icon[icon="menu"]').addEventListener("click",this._menuClick),(async()=>{if(window.location.hash){let t=window.location.hash.split("#");if((t=t[1].split("?"))[1]&&this.selector.select(t[0]),console.log(t[1]),t[1]){const e=t[1].split("=");this.pages.querySelector(`[route="${t[0]}"]`).value=e[1],this.select(t[0],e[1])}else this.select(t[0])}else this.selector.select("products"),await this._selectorChange();this.translatedTitle.value=this.selector.selected;const t=this.querySelector(".login-button");this._onResize(),firebase.auth().onAuthStateChanged(async e=>{console.log(e),e?(window.ref=firebase.database().ref(`${e.uid}`),window.user=e,e.photoURL&&(t.innerHTML=`<img src="${e.photoURL}"></img>`)):(t.innerHTML="login",t.addEventListener("click",async()=>{window.signin()}))}),await import("./shop-cart-action-18360e24.js"),await import("./shop-cart-cb229b40.js"),new ShopCartController(this.cart,this.cartAction)})(),document.addEventListener("counter-change",this._onCounterChange),window.go=this.select}_onResize(){const{height:t,width:e}=this.pages.getClientRects()[0];e>720&&!this.drawerOpened&&(this.drawerOpened=!0),requestAnimationFrame(()=>{this.drawerOpened?this.map.width=e-256:this.map.width=e,this.map.height=t})}_onPopstate(){history.state&&(this.selector.selected=history.state.selected),this._selectorChange()}_menuClick(){this.drawerOpened=!this.drawerOpened}hideShopCartAction(){this.shadowRoot.querySelector("shop-cart-action").classList.add("hide"),this.pages.style.bottom=0}showShopCartAction(){this.shadowRoot.querySelector("shop-cart-action").classList.remove("hide"),this.pages.style.bottom="56px"}_onCounterChange({detail:t}){0===t?this.badge.classList.remove("active"):this.badge.classList.contains("active")||this.badge.classList.add("active")}async select(t,e){if(console.log(t),t){this.selector.select(t),this.translatedTitle.value=t,this.pages.select(t);const s=e?`#${t}?uid=${e}`:`#${t}`;if(history.pushState({selected:t},t,s),"orders"===t&&(this.hideShopCartAction(),await import("./order-list.js")),"stock"===t&&(this.hideShopCartAction(),await import("./item-list.js")),"cart"===t&&(this.hideShopCartAction(),this.pages.querySelector("shop-cart")||await import("./shop-cart-cb229b40.js")),"order"===t&&(this.hideShopCartAction(),this.pages.querySelector("client-order").shadowRoot||await import("./client-order.js"),console.log(e),this.pages.querySelector("client-order").value=e,this.pages.querySelector("client-order")._stamp(),console.log(this.pages.querySelector("client-order"))),"products"===t&&(this.showShopCartAction(),await import("./client-products-84cffd9f.js")),"product"===t&&(this.showShopCartAction(),this.pages.querySelector("client-product").shadowRoot||await import("./client-product.js"),this.pages.querySelector("client-product").key=e),"directions"===t)return this.selector.select(this.selector.previousSelected),void window.open("https://www.google.com/maps/dir//Guldentop+Veldwinkel+Veldlocatie,+Laakweg,+3118+Werchter.+Parkeren+langs+de+grote+serre+op+het+veld+of+Guldentop+23.+Dit+is+een+zijwegje+van+de+Varentstraat+tussen+Geetsvondelweg+en,+Preterstraat,+3118+Werchter/@50.9785324,4.7525245,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47c15d4466cd3215:0xfe59ae34b619fab4!2m2!1d4.7488689!2d50.9798556");"info"===t&&(this.routeInfo.src="https://maps.google.com/maps?q=guldentopveldwinkel&t=&z=17&ie=UTF8&iwloc=&output=embed")}}_selectorChange(){return this.select(this.selector.selected)}get template(){return html`
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
    padding: 12px;
    text-transform: uppercase;
    cursor: pointer;
  }
  custom-drawer .custom-selected {
    background: #eee;
  }
  custom-drawer custom-svg-icon {
    pointer-events: none;
  }
  custom-drawer {
    position: fixed;
    z-index: 100;
  }
  .flex {
    flex: 1;
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
  @media (min-device-width: 720px) {
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
</style>

<slot></slot>
<custom-drawer>
  <header slot="header">
    <h3>Guldentop veldwinkel</h3>
  </header>

  <custom-selector slot="content" attr-for-selected="data-route" selected="order">

    <span class="row selection" data-route="products" >
      <custom-svg-icon icon="shopping-basket"></custom-svg-icon>
      <span class="flex"></span>
      producten
    </span>

    <span class="row selection" data-route="stock" >
      <custom-svg-icon icon="dashboard"></custom-svg-icon>
      <span class="flex"></span>
      veld overzicht
    </span>
    
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

    <span class="row selection" data-route="directions" >
      <custom-svg-icon icon="directions"></custom-svg-icon>
      <span class="flex"></span>
      <translated-string>directions</translated-string>
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
  <shop-cart route="cart"></shop-cart>
  <top-client-order route="quick-order"></top-client-order>
  <client-products route="products"></client-products>
  <client-product route="product"></client-product>
  <item-list route="stock" type="stock"></item-list>
  <order-list route="orders" type="orders"></order-list>
  <client-order route="order" type="order"></client-order>
  <section route="info">
    <iframe class="route-info" width="600" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
  </section>
</custom-pages>
<shop-cart-action>
  <top-icon-button slot="fab" icon="shopping-cart">shoplist</top-icon-button>
</shop-cart-action>`}});
