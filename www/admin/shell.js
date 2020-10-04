import{S as t,d as e,R as s,a as o,E as n}from"./base-49bd4703.js";import{t as i}from"./translated-string-211358df.js";((t=HTMLElement)=>{customElements.define("custom-svg-icon",class CustomSvgIcon extends t{static get observedAttributes(){return["icon"]}get iconset(){return window.svgIconset}set iconset(t){window.iconset=t}set icon(t){this.icon!==t&&(this._icon=t,this.__iconChanged__({value:t}))}get icon(){return this._icon}get template(){return"\n        <style>\n          :host {\n            width: var(--svg-icon-size, 24px);\n            height: var(--svg-icon-size, 24px);\n            display: inline-flex;\n            display: -ms-inline-flexbox;\n            display: -webkit-inline-flex;\n            display: inline-flex;\n            -ms-flex-align: center;\n            -webkit-align-items: center;\n            align-items: center;\n            -ms-flex-pack: center;\n            -webkit-justify-content: center;\n            justify-content: center;\n            position: relative;\n            vertical-align: middle;\n            fill: var(--svg-icon-color, #111);\n            stroke: var(--svg-icon-stroke, none);\n          }\n        </style>\n      "}constructor(){super(),this.attachShadow({mode:"open"}),this._onIconsetReady=this._onIconsetReady.bind(this)}render(){this.shadowRoot.innerHTML=this.template}connectedCallback(){this.icon=this.getAttribute("icon")||null,super.render||this.render()}_onIconsetReady(){window.removeEventListener("svg-iconset-added",this._onIconsetReady),this.__iconChanged__({value:this.icon})}__iconChanged__(t){if(this.iconset){if(t.value&&this.iconset){let e=t.value.split("::");1===e.length?this.iconset.icons.host.applyIcon(this,t.value):this.iconset[e[0]]&&this.iconset[e[0]].host.applyIcon(this,e[1])}else if(!t.value&&this.iconset&&this._icon){let t=this._icon.split("::");1===t.length?this.iconset.icons.host.removeIcon(this):this.iconset[t[0]].host.removeIcon(this)}this.iconset=this.iconset}else window.addEventListener("svg-iconset-added",this._onIconsetReady)}attributeChangedCallback(t,e,s){e!==s&&(this[t]=s)}})})();customElements.define("custom-pages",class CustomPages extends(t(HTMLElement)){constructor(){super(),this.slotchange=this.slotchange.bind(this),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n      <style>\n        :host {\n          flex: 1;\n          position: relative;\n          --primary-background-color: #ECEFF1;\n          overflow: hidden;\n        }\n        ::slotted(*) {\n          display: flex;\n          position: absolute;\n          opacity: 0;\n          pointer-events: none;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          transition: transform ease-out 160ms, opacity ease-out 60ms;\n          /*transform: scale(0.5);*/\n          transform-origin: left;\n        }\n        ::slotted(.animate-up) {\n          transform: translateY(-120%);\n        }\n        ::slotted(.animate-down) {\n          transform: translateY(120%);\n        }\n        ::slotted(.custom-selected) {\n          opacity: 1;\n          pointer-events: auto;\n          transform: translateY(0);\n          transition: transform ease-in 160ms, opacity ease-in 320ms;\n          max-height: 100%;\n          max-width: 100%;\n        }\n      </style>\n      \x3c!-- TODO: scale animation, ace doesn\'t resize that well ... --\x3e\n      <div class="wrapper">\n        <slot></slot>\n      </div>\n    '}connectedCallback(){super.connectedCallback(),this.shadowRoot.querySelector("slot").addEventListener("slotchange",this.slotchange)}isEvenNumber(t){return Boolean(t%2==0)}slotchange(){let t=0;for(const e of this.slotted.assignedNodes())e&&1===e.nodeType&&(e.style.zIndex=99-t,this.isEvenNumber(t++)?e.classList.add("animate-down"):e.classList.add("animate-up"),this.dispatchEvent(new CustomEvent("child-change",{detail:e})))}}),e(class CustomTabs extends(s(o(HTMLElement))){constructor(){super()}get template(){return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          /*align-items: flex-end;*/
          height: var(--custom-tabs-height, 48px);
        }
      </style>
      <slot></slot>
    `}}),e(class CustomTab extends(s(HTMLElement)){constructor(){super(),this._onMouseIn=this._onMouseIn.bind(this),this._onMouseOut=this._onMouseOut.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseover",this._onMouseIn),this.addEventListener("mouseout",this._onMouseOut)}disconnected(){this.removeEventListener("mouseover",this._onMouseIn),this.removeEventListener("mouseout",this._onMouseOut)}_onMouseIn(){this.classList.add("over")}_onMouseOut(){this.classList.remove("over")}get template(){return html`
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
    `}});(t=>customElements.define("custom-selector",t))(class CustomSelector extends(o(HTMLElement)){constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="<slot></slot>"}}),customElements.define("custom-drawer",class CustomDrawer extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=this.template}get template(){return'<style>\n      :host {\n        display: flex;\n        flex-direction: column;\n        width: var(--custom-drawer-width, 256px);\n        height: auto;\n        background: var(--custom-drawer-background, #FFF);\n        background-blend-mode: hue;\n        color: var(--custom-drawer-color, #333);\n        opacity: 0;\n        box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.14);\n      }\n      ::slotted([slot="header"]) {\n        display: block;\n        box-sizing: border-box;\n        min-height: 48px;\n        border-bottom: 1px solid rgba(0, 0, 0, 0.14);\n        color: var(--custom-header-color, #FFF);\n        background: var(--custom-header-background, #EEE);\n      }\n      ::slotted([slot="footer"]) {\n        display: block;\n        box-sizing: border-box;\n        min-height: 48px;\n        border-top: 1px solid rgba(0, 0, 0, 0.14);\n      }\n      ::slotted([slot="content"]) {\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n      }\n    </style>\n    <slot name="header"></slot>\n    <slot name="content"></slot>\n    <slot name="footer"></slot>'}});const a=(t,e="nl")=>{return i[e][t]||t};(()=>window.translate=a)();class Store{constructor(t="keyval-store",e="keyval"){this.storeName=e,this._dbp=new Promise((s,o)=>{const n=indexedDB.open(t,1);n.onerror=(()=>o(n.error)),n.onsuccess=(()=>s(n.result)),n.onupgradeneeded=(()=>{n.result.createObjectStore(e)})})}_withIDBStore(t,e){return this._dbp.then(s=>new Promise((o,n)=>{const i=s.transaction(this.storeName,t);i.oncomplete=(()=>o()),i.onabort=i.onerror=(()=>n(i.error)),e(i.objectStore(this.storeName))}))}}let r;function c(){return r||(r=new Store),r}var l=Object.freeze({Store:Store,get:function(t,e=c()){let s;return e._withIDBStore("readonly",e=>{s=e.get(t)}).then(()=>s.result)},set:function(t,e,s=c()){return s._withIDBStore("readwrite",s=>{s.put(e,t)})},del:function(t,e=c()){return e._withIDBStore("readwrite",e=>{e.delete(t)})},clear:function(t=c()){return t._withIDBStore("readwrite",t=>{t.clear()})},keys:function(t=c()){const e=[];return t._withIDBStore("readonly",t=>{(t.openKeyCursor||t.openCursor).call(t).onsuccess=function(){this.result&&(e.push(this.result.key),this.result.continue())}}).then(()=>e)}});const{Store:d,set:h,get:u,del:p,keys:m}=l;class OADB{constructor(t){this.sync=this.sync.bind(this),this.remove=this.remove.bind(this),this.name=t,window.addEventListener("online",function(t){console.log("online")},!1),window.addEventListener("offline",function(t){console.log("offline")},!1),this.isOnline()&&this.init()}isOnline(){return navigator.onLine}async init(){this.store=await new d(`odb-${this.name}`,this.name),this.localStore=await new d(`odb-local-${this.name}`,this.name),this.ref=firebase.database().ref(this.name),await this.sync(),this.ref.on("child_removed",this.remove),this.ref.on("child_changed",this.sync),this.ref.on("child_added",t=>{pubsub.publish(`${this.name}.added`,t.key)})}async remove(t){pubsub.publish(`${this.name}.remove`,t.key),await p(t.key,this.store)}async sync(t){if(this.ref&&this.isOnline())if(t=(t=await this.ref.once("value")).val()){for(const e of Object.keys(t)){const s=await u(e,this.store);s?t[e].timestamp>s.timestamp&&await h(e,t[e],this.store):await h(e,t[e],this.store)}const e=await m(this.store);if(e&&e.length>0)for(const s of e)t[s]||await p(s,this.store)}else{const t=await m(this.store);if(t&&t.length>0)for(const e of t)await p(e,this.store)}}async set(t,e){if(t)return await h(t,e,this.store);const s=[];for(const t of Object.keys(e))s.push(h(t,e[t],this.store));return Promise.all(s)}get(t){return new Promise(async(e,s)=>{const o=this.isOnline();let n={};if(t)n=await u(t,this.store);else{const t=await m(this.store);if(t&&t.length>0)for(const e of t)n[e]=await u(e,this.store)}if(n&&Object.keys(n).length>0&&e(n),o&&this.ref){let s;if(s=(s=t?await firebase.database().ref(`${this.name}/${t}`).once("value"):await this.ref.once("value")).val(),!n&&s||n&&0===Object.keys(n).length&&s)if(e(s),t)await h(t,s,this.store);else for(const t of Object.keys(s))await h(t,s[t],this.store);else if(s&&n&&n.timestamp<s.timestamp){if(t)await h(t,s,this.store);else for(const t of Object.keys(s))await h(t,s[t],this.store);document.dispatchEvent(new CustomEvent("storage-update",{detail:{child:t,snap:s}}))}}e()})}}const{Store:f,set:g,get:w,remove:b,keys:y}=l;console.log(l);class OADBSync{constructor(t){console.log(this.isOnline()),this.sync=this.sync.bind(this),this.name=t,window.addEventListener("online",function(t){console.log("online")},!1),window.addEventListener("offline",function(t){console.log("offline")},!1),this.isOnline()&&this.init()}isOnline(){return navigator.onLine}async init(){console.log(this.isOnline()),this.store=await new f(`odb-${this.name}`,this.name),this.ref=firebase.database().ref(this.name),await this.sync(),this.ref.on("child_changed",this.sync)}async sync(t){if(this.ref&&this.isOnline()){t=(t=await this.ref.once("value")).val();for(const e of Object.keys(t)){const s=await w(e,this.store);s?t[e].timestamp>s.timestamp&&await g(e,t[e],this.store):await g(e,t[e],this.store)}}}async set(t,e){if(t)return await g(t,e,this.store);const s=[];for(const t of Object.keys(e))s.push(g(t,e[t],this.store));return Promise.all(s)}get(t){return new Promise(async(e,s)=>{const o=this.isOnline();console.log({online:o});let n={};if(t)n=await w(t,this.store);else{const t=await y(this.store);if(t&&t.length>0)for(const e of t)n[e]=await w(e,this.store)}if(n&&Object.keys(n).length>0&&e(n),o&&this.ref){let s;if(s=(s=t?await firebase.database().ref(`${this.name}/${t}`).once("value"):await this.ref.once("value")).val(),!n&&s||n&&0===Object.keys(n).length&&s)if(e(s),t)await g(t,s,this.store);else for(const t of Object.keys(s))await g(t,s[t],this.store);else if(s&&n&&n.timestamp<s.timestamp){if(t)await g(t,s,this.store);else for(const t of Object.keys(s))await g(t,s[t],this.store);document.dispatchEvent(new CustomEvent("storage-update",{detail:{child:t,snap:s}}))}}e()})}}let v;class OADBManager{constructor(t=!0){v="boolean"!=typeof t||t?OADBSync:OADB,this.databases=new Map}init(t){this.databases.set(t,new v(t))}get(t){let e=this.databases.get(t);return e||(this.init(t),e=this.databases.get(t)),e}set(t){let e=this.databases.get(t);return e||(this.init(t),e=this.databases.get(t)),e||null}}var x=function(t,{className:e,symbolName:s}){const o=Symbol.for(s),n={[e]:class extends t{constructor(...t){super(...t),Object.defineProperty(this,o,{value:!0})}get[Symbol.toStringTag](){return e}}}[e];return n[`is${e}`]=(t=>!(!t||!t[o])),n},_=function(t,{className:e,symbolName:s,withoutNew:o}){const n=Symbol.for(s),i={[e]:function(...e){if(o&&!(this instanceof i))return new i(...e);const s=t.call(this,...e)||this;return s&&!s[n]&&Object.defineProperty(s,n,{value:!0}),s}}[e];return i.prototype=Object.create(t.prototype),i.prototype.constructor=i,Object.defineProperty(i.prototype,Symbol.toStringTag,{get:()=>e}),i[`is${e}`]=(t=>!(!t||!t[n])),i};x.proto=_;var k=x(class LittlePubSub{constructor(t=!0){this.subscribers={},this.verbose=t}subscribe(t,e,s){void 0===s&&(s=e),this.subscribers[t]=this.subscribers[t]||{handlers:[],value:null},this.subscribers[t].handlers.push(e.bind(s))}unsubscribe(t,e,s){if(void 0===s&&(s=e),this.subscribers[t]){const o=this.subscribers[t].handlers.indexOf(e.bind(s));this.subscribers[t].handlers.splice(o),0===this.subscribers[t].handlers.length&&delete this.subscribers[t]}}publish(t,e){this.subscribers[t]&&(this.verbose||this.subscribers[t].value!==e)&&(this.subscribers[t].handlers.forEach(s=>{s(e,this.subscribers[t].value)}),this.subscribers[t].value=e)}},{className:"LittlePubSub",symbolName:"little-pubsub/index"});globalThis.pubsub=new k;export default e(class AdminShell extends n{get pages(){return this.querySelector("custom-pages")}get selector(){return this.shadowRoot.querySelector("custom-selector")}get drawer(){return this.shadowRoot.querySelector("custom-drawer")}get translatedTitle(){return this.shadowRoot.querySelector('translated-string[name="title"]')}set drawerOpened(t){t?this.setAttribute("drawer-opened",""):this.removeAttribute("drawer-opened")}get drawerOpened(){return this.hasAttribute("drawer-opened")}get menuIcon(){return this.shadowRoot.querySelector(".menu")}constructor(){super(),this._selectorChange=this._selectorChange.bind(this),this._menuClick=this._menuClick.bind(this),this._onPopstate=this._onPopstate.bind(this),this.drawerOpened=!1,window.onpopstate=this._onPopstate,window.topstore=window.topstore||{},window.topstore.databases=window.topstore.databases||new OADBManager(!1),window.topstore.upgrade=(async t=>{let e=await firebase.database().ref("offers").once("value");e=e.val();for(const t of Object.keys(e)){let s=await firebase.database().ref(`offerDisplay/${t}`).once("value");s=s.val();const o={method:"POST",body:JSON.stringify({...s,...e[t]}),mode:"cors",headers:{"Content-Type":"application/json"}};await fetch("http://localhost:5000/topveldwinkel/us-central1/api/add/offer",o)}})}connectedCallback(){if(super.connectedCallback(),matchMedia("(min-width: 720px)").matches&&(this.drawerOpened=!0),document.addEventListener("mouseup",t=>{matchMedia("(max-width: 641px)").matches&&this.drawerOpened&&!t.path[0].hasAttribute("subber")&&(this.drawerOpened=!1)}),this.translatedTitle.value=this.selector.selected,this.selector.addEventListener("selected",this._selectorChange),this.menuIcon.addEventListener("click",this._menuClick),globalThis.adminGo=(async(t,e)=>{if(e&&"product"===t){await import("./top-product.js"),document.querySelector("top-product").value=e}else if(e&&"offer"===t){await import("./top-offer.js"),document.querySelector("top-offer").value=e}else if(e&&"order"===t){await import("./top-order.js"),document.querySelector("top-order").value=e}else if("add-product"===t||"add-offer"===t)await import(`./${t}.js`);else if("collection"===t){await import("./top-collection.js"),document.querySelector("top-collection").value=e}else if("settings"===t){await import("./settings-4de8d3cc.js");document.querySelector("settings-section")}history.pushState({selected:t},t,`#${t}`),this.pages.select(t)}),window.location.hash){let t=window.location.hash.split("#");if(t=t[1].split("?"),this.selector.select(t[0]),t[1]){const e=t[1].split("=");this.pages.querySelector(`[route="${t[0]}"]`).value=e[1],globalThis.adminGo(t[0],e[1])}else globalThis.adminGo(t[0])}else this.selector.select("orders");this._selectorChange(),this._preload()}async _preload(){console.log("loaded")}_onPopstate(){console.log("pop"),history.state&&this.selector.select(history.state.selected),this._selectorChange()}_menuClick(){this.drawerOpened=!this.drawerOpened}async _selectorChange(){const t=this.selector.selected;if(t){const e="./";if("products"===t&&await import(`${e}top-products.js`),"sheet"===t&&await import(`${e}top-sheet.js`),"offers"===t&&await import(`${e}top-offers.js`),"orders"===t&&await import(`${e}top-orders.js`),"collections"===t&&await import(`${e}top-collections.js`),"categories"===t&&await import(`${e}top-categories.js`),"catalog"===t||"offers"===t||"products"===t||"categories"===t){let e=Array.from(this.shadowRoot.querySelectorAll('[menu-item="catalog"]'));if(e=[...e,this.shadowRoot.querySelector('[data-route="catalog"]')],"catalog"===t)if(e[0].hasAttribute("shown"))for(const t of e)t.removeAttribute("shown");else for(const t of e)t.setAttribute("shown","");else for(const t of e)t.setAttribute("shown","")}"catalog"!==t&&(this.translatedTitle.value=t,this.pages.select(t),history.pushState({selected:t},t,`#${t}`))}}get template(){return html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;
        color: #eee;
        background: #445c68;
        --svg-icon-color: #eee;
      }
      custom-drawer {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        transform: translateX(-105%);
        background: #1a1f229e;
      }
      ::slotted(custom-pages) {
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        top: 56px;
        left: 0;
        background: #1a1f229e;
      }
      translated-string[name="title"] {
        padding-left: 12px;
        text-transform: uppercase;
      }
      header {
        display: flex;
        align-items: center;
        height: 56px;
        min-height: 56px;
        background: #38464e;
        position: absolute;
        box-sizing: border-box;
        right: 0;
        width: 100%;
        padding: 24px;
        color: #eee;
      }
      custom-drawer header {
        position: relative;
        justify-content: center;
      }
      :host([drawer-opened]) custom-drawer {
        opacity: 1;
        transform: translateX(0);
      }
      header h3 {
        margin: 0;
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
        color: #eee;
      }
      custom-drawer .custom-selected {
        background: #eee;
        color: #616161;
        --svg-icon-color: #616161;
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
      [menu-item] {
        transform: scale(0);
        height: 0px !important;
        padding: 0 !important;
      }
      [menu-item][shown] {
        height: auto !important;
        padding: 12px 12px 12px 36px !important;
        transform: scale(1);
      }
      [data-route="catalog"][shown] custom-svg-icon {
        transform: rotate(90deg)
      }
      @media (min-width: 720px) {
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
        :host([drawer-opened]) ::slotted(custom-pages) {
          left: var(--custom-drawer-width);
          width: calc(100% - 256px);
        }
        :host([drawer-opened]) .main {
          left: var(--custom-drawer-width);
          width: calc(100% - 256px) !important;
        }
      }
    </style>

    <header class="main">
      <custom-svg-icon icon="menu" class="menu"></custom-svg-icon>
      <translated-string name="title"></translated-string>
    </header>

    <custom-drawer>
      <header slot="header">
        <h3>Guldentop veldwinkel</h3>
      </header>
      <custom-selector slot="content" attr-for-selected="data-route" selected="">

        <span class="row selection" data-route="orders" >
          bestellingen
        </span>
        
        <span class="row selection" data-route="collections" >
          
          
          <translated-string>collections</translated-string>
        </span>
                
        <span class="row selection" data-route="catalog" subber>
          <custom-svg-icon icon="chevron-right"></custom-svg-icon>
          
          <translated-string>catalog</translated-string>
        </span>
        
        <span class="row selection" data-route="categories" menu-item="catalog">          
          <translated-string>categories</translated-string>
        </span>
        
        <span class="row selection" data-route="offers"  menu-item="catalog">
          <translated-string>offers</translated-string>
        </span>

        <span class="row selection" data-route="products" menu-item="catalog">
          <translated-string>products</translated-string>
        </span>

        <!-- <span class="row selection" data-route="sheet" >
          <custom-svg-icon icon="info"></custom-svg-icon>
          <span class="flex"></span>
          sheet
        </span> -->

        <span class="flex" style="pointer-events: none;"></span>

        <span class="row selection" data-route="settings" >
          <custom-svg-icon icon="settings"></custom-svg-icon>
          <span class="flex"></span>
          settings
        </span>

      </custom-selector>
    </custom-drawer>
    <slot></slot>
    `}});
