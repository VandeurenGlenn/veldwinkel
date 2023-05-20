import {
  translations_default
} from "./chunk-CZLPY5RY.js";
import {
  ElementBase,
  define_default,
  render_mixin_default,
  select_mixin_default,
  selector_mixin_default
} from "./chunk-JGNXSNDS.js";
import {
  __async,
  __export,
  __spreadValues
} from "./chunk-DZ5PPEG7.js";

// node_modules/custom-svg-icon/src/custom-svg-icon.js
var custom_svg_icon_default = ((base = HTMLElement) => {
  customElements.define("custom-svg-icon", class CustomSvgIcon extends base {
    /**
     * Attributes observer
     * @return {Array} ['icon']
     */
    static get observedAttributes() {
      return ["icon"];
    }
    /**
     * Iconset
     * @return {object} window.svgIconset
     * [checkout](svg-iconset.html) for more info.
     */
    get iconset() {
      return window.svgIconset;
    }
    set iconset(value) {
      window.iconset = value;
    }
    /**
     * icon
     * @param {string} value icon to display.
     * optional: you can create multiple iconsets
     * by setting a different name on svg-iconset.
     *
     * **example:** ```html
     * <svg-iconset name="my-icons">
     *   <g id="menu">....</g>
     * </svg-iconset>
     * ```
     * This means we can ask for the icon using a prefix
     * **example:** ```html
     * <reef-icon-button icon="my-icons::menu"></reef-icon-button>
     * ```
     */
    set icon(value) {
      if (this.icon !== value) {
        this._icon = value;
        this.__iconChanged__({ value });
      }
    }
    get icon() {
      return this._icon;
    }
    get template() {
      return `
        <style>
          :host {
            width: var(--svg-icon-size, 24px);
            height: var(--svg-icon-size, 24px);
            display: inline-flex;
            display: -ms-inline-flexbox;
            display: -webkit-inline-flex;
            display: inline-flex;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            position: relative;
            vertical-align: middle;
            fill: var(--svg-icon-color, #111);
            stroke: var(--svg-icon-stroke, none);
          }
        </style>
      `;
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._onIconsetReady = this._onIconsetReady.bind(this);
    }
    /**
     * Basic render template, can be called from host using super.render() or extended
     *
     * @example ```js
     * const iconTempl = super.template();
     * ```
     */
    render() {
      this.shadowRoot.innerHTML = this.template;
    }
    connectedCallback() {
      this.icon = this.getAttribute("icon") || null;
      if (!super.render)
        this.render();
    }
    _onIconsetReady() {
      window.removeEventListener("svg-iconset-added", this._onIconsetReady);
      this.__iconChanged__({ value: this.icon });
    }
    __iconChanged__(change) {
      if (!this.iconset) {
        window.addEventListener("svg-iconset-added", this._onIconsetReady);
        return;
      }
      if (change.value && this.iconset) {
        let parts = change.value.split("::");
        if (parts.length === 1) {
          this.iconset["icons"].host.applyIcon(this, change.value);
        } else if (this.iconset[parts[0]]) {
          this.iconset[parts[0]].host.applyIcon(this, parts[1]);
        }
      } else if (!change.value && this.iconset && this._icon) {
        let parts = this._icon.split("::");
        if (parts.length === 1) {
          this.iconset["icons"].host.removeIcon(this);
        } else {
          this.iconset[parts[0]].host.removeIcon(this);
        }
      }
      this.iconset = this.iconset;
    }
    /**
     * Runs when attribute changes.
     * @param {string} name The name of the attribute that changed.
     * @param {string|object|array} oldValue
     * @param {string|object|array} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue)
        this[name] = newValue;
    }
  });
})();

// node_modules/custom-pages/src/custom-pages.js
var CustomPages = class extends select_mixin_default(HTMLElement) {
  constructor() {
    super();
    this.slotchange = this.slotchange.bind(this);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          flex: 1;
          position: relative;
          --primary-background-color: #ECEFF1;
          overflow: hidden;
        }
        ::slotted(*) {
          display: flex;
          position: absolute;
          opacity: 0;
          pointer-events: none;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transition: transform ease-out 160ms, opacity ease-out 60ms;
          /*transform: scale(0.5);*/
          transform-origin: left;
        }
        ::slotted(.animate-up) {
          transform: translateY(-120%);
        }
        ::slotted(.animate-down) {
          transform: translateY(120%);
        }
        ::slotted(.custom-selected) {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
          transition: transform ease-in 160ms, opacity ease-in 320ms;
          max-height: 100%;
          max-width: 100%;
        }
      </style>
      <!-- TODO: scale animation, ace doesn't resize that well ... -->
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector("slot").addEventListener("slotchange", this.slotchange);
  }
  isEvenNumber(number) {
    return Boolean(number % 2 === 0);
  }
  /**
   * set animation class when slot changes
   */
  slotchange() {
    let call = 0;
    for (const child of this.slotted.assignedNodes()) {
      if (child && child.nodeType === 1) {
        child.style.zIndex = 99 - call;
        if (this.isEvenNumber(call++)) {
          child.classList.add("animate-down");
        } else {
          child.classList.add("animate-up");
        }
        this.dispatchEvent(new CustomEvent("child-change", { detail: child }));
      }
    }
  }
};
var custom_pages_default = customElements.define("custom-pages", CustomPages);

// node_modules/custom-tabs/src/custom-tabs.js
define_default(class CustomTabs extends render_mixin_default(selector_mixin_default(HTMLElement)) {
  constructor() {
    super();
  }
  // TODO: make scrollable
  get template() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          /*align-items: flex-end;*/
          height: var(--custom-tabs-height, 48px);
        }
      </style>
      <slot></slot>
    `;
  }
});

// node_modules/custom-tabs/src/custom-tab.js
var custom_tab_default = define_default(class CustomTab extends render_mixin_default(HTMLElement) {
  constructor() {
    super();
    this._onMouseIn = this._onMouseIn.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mouseover", this._onMouseIn);
    this.addEventListener("mouseout", this._onMouseOut);
  }
  disconnected() {
    this.removeEventListener("mouseover", this._onMouseIn);
    this.removeEventListener("mouseout", this._onMouseOut);
  }
  _onMouseIn() {
    this.classList.add("over");
  }
  _onMouseOut() {
    this.classList.remove("over");
  }
  get template() {
    return html`
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
    `;
  }
});

// node_modules/custom-selector/src/index.js
var define = (klass) => customElements.define("custom-selector", klass);
var src_default = define(class CustomSelector extends selector_mixin_default(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "<slot></slot>";
  }
});

// node_modules/custom-drawer/custom-drawer.js
var custom_drawer_default = customElements.define("custom-drawer", class CustomDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        width: var(--custom-drawer-width, 256px);
        height: auto;
        background: var(--custom-drawer-background, #FFF);
        background-blend-mode: hue;
        color: var(--custom-drawer-color, #333);
        opacity: 0;
        box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.14);
      }
      ::slotted([slot="header"]) {
        display: block;
        box-sizing: border-box;
        min-height: 48px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.14);
        color: var(--custom-header-color, #FFF);
        background: var(--custom-header-background, #EEE);
      }
      ::slotted([slot="footer"]) {
        display: block;
        box-sizing: border-box;
        min-height: 48px;
        border-top: 1px solid rgba(0, 0, 0, 0.14);
      }
      ::slotted([slot="content"]) {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    </style>
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>`;
  }
});

// src/translator.js
var translate = (string, language = "nl") => {
  const translation = translations_default[language][string];
  return translation || string;
};
var translator_default = (() => window.translate = translate)();

// node_modules/idb-keyval/dist/idb-keyval.mjs
var idb_keyval_exports = {};
__export(idb_keyval_exports, {
  Store: () => Store,
  clear: () => clear,
  del: () => del,
  get: () => get,
  keys: () => keys,
  set: () => set
});
var Store = class {
  constructor(dbName = "keyval-store", storeName = "keyval") {
    this.storeName = storeName;
    this._dbp = new Promise((resolve, reject) => {
      const openreq = indexedDB.open(dbName, 1);
      openreq.onerror = () => reject(openreq.error);
      openreq.onsuccess = () => resolve(openreq.result);
      openreq.onupgradeneeded = () => {
        openreq.result.createObjectStore(storeName);
      };
    });
  }
  _withIDBStore(type, callback) {
    return this._dbp.then((db) => new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, type);
      transaction.oncomplete = () => resolve();
      transaction.onabort = transaction.onerror = () => reject(transaction.error);
      callback(transaction.objectStore(this.storeName));
    }));
  }
};
var store;
function getDefaultStore() {
  if (!store)
    store = new Store();
  return store;
}
function get(key, store2 = getDefaultStore()) {
  let req;
  return store2._withIDBStore("readonly", (store3) => {
    req = store3.get(key);
  }).then(() => req.result);
}
function set(key, value, store2 = getDefaultStore()) {
  return store2._withIDBStore("readwrite", (store3) => {
    store3.put(value, key);
  });
}
function del(key, store2 = getDefaultStore()) {
  return store2._withIDBStore("readwrite", (store3) => {
    store3.delete(key);
  });
}
function clear(store2 = getDefaultStore()) {
  return store2._withIDBStore("readwrite", (store3) => {
    store3.clear();
  });
}
function keys(store2 = getDefaultStore()) {
  const keys4 = [];
  return store2._withIDBStore("readonly", (store3) => {
    (store3.openKeyCursor || store3.openCursor).call(store3).onsuccess = function() {
      if (!this.result)
        return;
      keys4.push(this.result.key);
      this.result.continue();
    };
  }).then(() => keys4);
}

// src/oadb.js
var { Store: Store2, set: set2, get: get2, del: del2, keys: keys2 } = idb_keyval_exports;
var OADB = class {
  constructor(ref) {
    this.sync = this.sync.bind(this);
    this.remove = this.remove.bind(this);
    this.name = ref;
    window.addEventListener("online", function(e) {
      console.log("online");
    }, false);
    window.addEventListener("offline", function(e) {
      console.log("offline");
    }, false);
    if (this.isOnline()) {
      this.init();
    }
  }
  isOnline() {
    return navigator.onLine;
  }
  init() {
    return __async(this, null, function* () {
      this.store = yield new Store2(`odb-${this.name}`, this.name);
      this.localStore = yield new Store2(`odb-local-${this.name}`, this.name);
      this.ref = firebase.database().ref(this.name);
      yield this.sync();
      this.ref.on("child_removed", this.remove);
      this.ref.on("child_changed", this.sync);
      this.ref.on("child_added", (snap) => {
        pubsub.publish(`${this.name}.added`, snap.key);
      });
    });
  }
  remove(snap) {
    return __async(this, null, function* () {
      pubsub.publish(`${this.name}.remove`, snap.key);
      yield del2(snap.key, this.store);
    });
  }
  sync(data) {
    return __async(this, null, function* () {
      if (this.ref && this.isOnline()) {
        data = yield this.ref.once("value");
        data = data.val();
        if (data) {
          for (const key of Object.keys(data)) {
            const current = yield get2(key, this.store);
            if (!current)
              yield set2(key, data[key], this.store);
            else if (data[key].timestamp > current.timestamp) {
              yield set2(key, data[key], this.store);
            }
          }
          const dataKeys = yield keys2(this.store);
          if (dataKeys && dataKeys.length > 0)
            for (const key of dataKeys) {
              if (!data[key])
                yield del2(key, this.store);
            }
        } else {
          const dataKeys = yield keys2(this.store);
          if (dataKeys && dataKeys.length > 0)
            for (const key of dataKeys) {
              yield del2(key, this.store);
            }
        }
      }
    });
  }
  // set('foo', 'bar', customStore);
  // await this.localStorage.set(data);
  // async set(child, value) {
  //   const online = this.isOnline();
  //   if (online) {
  //     if (child) return firebase.database().ref(`${this.name}/${child}`).set(value);
  //     else return firebase.database().ref(`${this.name}`).set(value);
  //   }
  //   if (!online && child) {
  //     return await set(child, value, this.localStore);
  //   }
  //   const promises = [];
  // 
  //   for (const key of Object.keys(value)) {
  //     promises.push(set(key, value[key], this.localStore))
  //   }
  //   return Promise.all(promises);
  // }
  set(child, value) {
    return __async(this, null, function* () {
      if (child) {
        return yield set2(child, value, this.store);
      }
      const promises = [];
      for (const key of Object.keys(value)) {
        promises.push(set2(key, value[key], this.store));
      }
      return Promise.all(promises);
    });
  }
  get(child) {
    return new Promise((resolve, reject) => __async(this, null, function* () {
      const online = this.isOnline();
      let data = {};
      if (child)
        data = yield get2(child, this.store);
      else {
        const dataKeys = yield keys2(this.store);
        if (dataKeys && dataKeys.length > 0)
          for (const key of dataKeys) {
            data[key] = yield get2(key, this.store);
          }
      }
      if (data && Object.keys(data).length > 0)
        resolve(data);
      if (online && this.ref) {
        let snap;
        if (child)
          snap = yield firebase.database().ref(`${this.name}/${child}`).once("value");
        else
          snap = yield this.ref.once("value");
        snap = snap.val();
        if (!data && snap || data && Object.keys(data).length === 0 && snap) {
          resolve(snap);
          if (child) {
            yield set2(child, snap, this.store);
          } else {
            for (const key of Object.keys(snap)) {
              yield set2(key, snap[key], this.store);
            }
          }
        } else if (snap && data && data.timestamp < snap.timestamp) {
          if (child)
            yield set2(child, snap, this.store);
          else {
            for (const key of Object.keys(snap)) {
              yield set2(key, snap[key], this.store);
            }
          }
          document.dispatchEvent(new CustomEvent("storage-update", { detail: { child, snap } }));
        }
      }
      resolve();
    }));
  }
};

// src/oadb-sync.js
var { Store: Store3, set: set3, get: get3, remove, keys: keys3 } = idb_keyval_exports;
console.log(idb_keyval_exports);
var OADBSync = class {
  constructor(ref) {
    console.log(this.isOnline());
    this.sync = this.sync.bind(this);
    this.name = ref;
    window.addEventListener("online", function(e) {
      console.log("online");
    }, false);
    window.addEventListener("offline", function(e) {
      console.log("offline");
    }, false);
    if (this.isOnline()) {
      this.init();
    }
  }
  isOnline() {
    return navigator.onLine;
  }
  init() {
    return __async(this, null, function* () {
      console.log(this.isOnline());
      this.store = yield new Store3(`odb-${this.name}`, this.name);
      this.ref = firebase.database().ref(this.name);
      yield this.sync();
      this.ref.on("child_changed", this.sync);
    });
  }
  sync(data) {
    return __async(this, null, function* () {
      if (this.ref && this.isOnline()) {
        data = yield this.ref.once("value");
        data = data.val();
        for (const key of Object.keys(data)) {
          const current = yield get3(key, this.store);
          if (!current)
            yield set3(key, data[key], this.store);
          else if (data[key].timestamp > current.timestamp) {
            yield set3(key, data[key], this.store);
          }
        }
      }
    });
  }
  // set('foo', 'bar', customStore);
  // await this.localStorage.set(data);
  set(child, value) {
    return __async(this, null, function* () {
      if (child) {
        return yield set3(child, value, this.store);
      }
      const promises = [];
      for (const key of Object.keys(value)) {
        promises.push(set3(key, value[key], this.store));
      }
      return Promise.all(promises);
    });
  }
  get(child) {
    return new Promise((resolve, reject) => __async(this, null, function* () {
      const online = this.isOnline();
      console.log({ online });
      let data = {};
      if (child)
        data = yield get3(child, this.store);
      else {
        const dataKeys = yield keys3(this.store);
        if (dataKeys && dataKeys.length > 0)
          for (const key of dataKeys) {
            data[key] = yield get3(key, this.store);
          }
      }
      if (data && Object.keys(data).length > 0)
        resolve(data);
      if (online && this.ref) {
        let snap;
        if (child)
          snap = yield firebase.database().ref(`${this.name}/${child}`).once("value");
        else
          snap = yield this.ref.once("value");
        snap = snap.val();
        if (!data && snap || data && Object.keys(data).length === 0 && snap) {
          resolve(snap);
          if (child)
            yield set3(child, snap, this.store);
          else {
            for (const key of Object.keys(snap)) {
              yield set3(key, snap[key], this.store);
            }
          }
        } else if (snap && data && data.timestamp < snap.timestamp) {
          if (child)
            yield set3(child, snap, this.store);
          else {
            for (const key of Object.keys(snap)) {
              yield set3(key, snap[key], this.store);
            }
          }
          document.dispatchEvent(new CustomEvent("storage-update", { detail: { child, snap } }));
        }
      }
      resolve();
    }));
  }
};

// src/oadb-manager.js
var DB;
var OADBManager = class {
  /**
   * @param {boolean} sync - when false, pushes updates to server, otherwise just saves to local
   */
  constructor(sync = true) {
    if (typeof sync === "boolean" && !sync)
      DB = OADB;
    else
      DB = OADBSync;
    this.databases = /* @__PURE__ */ new Map();
  }
  init(database) {
    this.databases.set(database, new DB(database));
  }
  /**
   * @param {string} database - name
   * @returns {OADB} - database
   */
  get(database) {
    let db = this.databases.get(database);
    if (!db) {
      this.init(database);
      db = this.databases.get(database);
    }
    return db;
  }
  /**
   * @returns {OADB} - database
   */
  set(database) {
    let db = this.databases.get(database);
    if (!db) {
      this.init(database);
      db = this.databases.get(database);
    }
    if (db)
      return db;
    return null;
  }
};

// node_modules/@vandeurenglenn/little-pubsub/index.js
var LittlePubSub = class {
  subscribers = {};
  verbose;
  constructor(verbose) {
    this.verbose = verbose;
  }
  _handleContext(handler, context) {
    if (typeof context === "undefined") {
      context = handler;
    }
    return context;
  }
  hasSubscribers(event) {
    return this.subscribers[event] ? true : false;
  }
  subscribe(event, handler, context) {
    if (!this.hasSubscribers(event))
      this.subscribers[event] = { handlers: [], value: void 0 };
    context = this._handleContext(handler, context);
    this.subscribers[event].handlers.push(handler.bind(context));
  }
  unsubscribe(event, handler, context) {
    if (!this.hasSubscribers(event))
      return;
    context = this._handleContext(handler, context);
    const index = this.subscribers[event].handlers.indexOf(handler.bind(context));
    this.subscribers[event].handlers.splice(index);
    if (this.subscribers[event].handlers.length === 0)
      delete this.subscribers[event];
  }
  publish(event, change) {
    if (!this.hasSubscribers(event))
      return;
    if (this.verbose || this.subscribers[event]?.value !== change) {
      this.subscribers[event].value = change;
      this.subscribers[event].handlers.forEach((handler) => {
        handler(change, this.subscribers[event].value);
      });
    }
  }
  once(event) {
    return new Promise((resolve) => {
      const cb = (value) => {
        this.unsubscribe(event, cb);
        resolve(value);
      };
      this.subscribe(event, cb);
    });
  }
};

// node_modules/@vandeurenglenn/flex-elements/src/flex-column.js
var flex_column_default = customElements.define("flex-column", class FlexColumn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
      }      
    </style>
    <slot></slot>
    `;
  }
});

// node_modules/@vandeurenglenn/flex-elements/src/flex-row.js
var flex_row_default = customElements.define("flex-row", class FlexRow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
      }      
    </style>
    <slot></slot>
    `;
  }
});

// node_modules/@vandeurenglenn/flex-elements/src/flex-one.js
var flex_one_default = customElements.define("flex-one", class FlexOne extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 1;
      }
    </style>
    
    <slot></slot>`;
  }
});

// node_modules/@vandeurenglenn/flex-elements/src/flex-two.js
var flex_two_default = customElements.define("flex-two", class FlexTwo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 2;
      }
    </style>
    
    <slot></slot>`;
  }
});

// node_modules/@vandeurenglenn/flex-elements/src/flex-three.js
var flex_three_default = customElements.define("flex-three", class FlexThree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 3;
      }
    </style>
    
    <slot></slot>`;
  }
});

// node_modules/@vandeurenglenn/flex-elements/src/flex-four.js
var flex_four_default = customElements.define("flex-four", class FlexFour extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 4;
      }
    </style>
    
    <slot></slot>`;
  }
});

// node_modules/@vandeurenglenn/flex-elements/src/flex-wrap-around.js
var flex_wrap_around_default = customElements.define("flex-wrap-around", class FlexWrapAround extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
      }      
    </style>
    <slot></slot>
    `;
  }
});

// node_modules/@vandeurenglenn/flex-elements/src/flex-wrap-evenly.js
var flex_wrap_evenly_default = customElements.define("flex-wrap-evenly", class FlexWrapEvenly extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
      }      
    </style>
    <slot></slot>
    `;
  }
});

// node_modules/@vandeurenglenn/flex-elements/src/flex-wrap-between.js
var flex_wrap_between_default = customElements.define("flex-wrap-between", class FlexWrapBetween extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
      }      
    </style>
    <slot></slot>
    `;
  }
});

// node_modules/@vandeurenglenn/flex-elements/src/flex-container.js
var flex_container_default = customElements.define("flex-container", class FlexContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.maxWidth = this.getAttribute("max-width") || 640;
    this.minWidth = this.getAttribute("min-width") || 320;
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        max-width: ${this.maxWidth}px;
        min-width: ${this.minWidth}px;
        width: 100%;
      }
      :host([row]) {
        flex-direction: row;
      }
    </style>
    <slot></slot>
    `;
  }
});

// src/admin/shell.ts
globalThis.pubsub = new LittlePubSub();
globalThis.migrate = () => __async(void 0, null, function* () {
  let offers = yield firebase.database().ref("offers").once("value");
  const newOffers = {};
  let i = 0;
  for (const offer of offers) {
    newOffers[i] = offer;
    i++;
  }
});
var shell_default = define_default(class AdminShell extends ElementBase {
  get pages() {
    return this.querySelector("custom-pages");
  }
  get selector() {
    return this.shadowRoot.querySelector("custom-selector");
  }
  get drawer() {
    return this.shadowRoot.querySelector("custom-drawer");
  }
  get translatedTitle() {
    return this.shadowRoot.querySelector('translated-string[name="title"]');
  }
  set drawerOpened(value) {
    if (value)
      this.setAttribute("drawer-opened", "");
    else
      this.removeAttribute("drawer-opened");
  }
  get drawerOpened() {
    return this.hasAttribute("drawer-opened");
  }
  get menuIcon() {
    return this.shadowRoot.querySelector(".menu");
  }
  constructor() {
    super();
    this._selectorChange = this._selectorChange.bind(this);
    this._menuClick = this._menuClick.bind(this);
    this._onPopstate = this._onPopstate.bind(this);
    this.drawerOpened = false;
    window.onpopstate = this._onPopstate;
    window.topstore = window.topstore || {};
    window.topstore.databases = window.topstore.databases || new OADBManager(false);
    window.topstore.upgrade = (target) => __async(this, null, function* () {
      const url = "http://localhost:5000/topveldwinkel/us-central1/api/add/offer";
      let offers = yield firebase.database().ref("offers").once("value");
      offers = offers.val();
      for (const o of Object.keys(offers)) {
        let value = yield firebase.database().ref(`offerDisplay/${o}`).once("value");
        value = value.val();
        const body = JSON.stringify(__spreadValues(__spreadValues({}, value), offers[o]));
        const options = {
          method: "POST",
          body,
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        };
        yield fetch(url, options);
      }
    });
  }
  connectedCallback() {
    super.connectedCallback();
    if (matchMedia("(min-width: 720px)").matches)
      this.drawerOpened = true;
    document.addEventListener("mouseup", (e) => {
      if (matchMedia("(max-width: 641px)").matches && this.drawerOpened && !e.path[0].hasAttribute("subber"))
        this.drawerOpened = false;
    });
    this.translatedTitle.value = this.selector.selected;
    this.selector.addEventListener("selected", this._selectorChange);
    this.menuIcon.addEventListener("click", this._menuClick);
    globalThis.adminGo = (view, selection) => __async(this, null, function* () {
      console.log(selection, view);
      if (selection && view === "product") {
        yield import("./top-product-CJ5RICRZ.js");
        const product = document.querySelector("top-product");
        product.value = selection;
      } else if (selection && view === "offer") {
        yield import("./top-offer-VN5RL5SA.js");
        const offer = document.querySelector("top-offer");
        offer.value = selection;
      } else if (selection && view === "order") {
        yield import("./top-order-TZTY64NT.js");
        const order = document.querySelector("top-order");
        order.value = selection;
      } else if (view === "add-product" || view === "add-offer") {
        yield import(`./${view}.js`);
      } else if (view === "collection") {
        yield import("./top-collection-VR3SRA2K.js");
        const collection = document.querySelector("top-collection");
        collection.value = selection;
      } else if (view === "settings") {
        yield import("./settings-3SY5QWHU.js");
        const settings = document.querySelector("settings-section");
      }
      history.pushState({ selected: view }, view, `#${view}`);
      this.pages.select(view);
    });
    if (window.location.hash) {
      let route = window.location.hash.split("#");
      route = route[1].split("?");
      this.selector.select(route[0]);
      if (route[1]) {
        const parts = route[1].split("=");
        this.pages.querySelector(`[route="${route[0]}"]`).value = parts[1];
        globalThis.adminGo(route[0], parts[1]);
      } else {
        globalThis.adminGo(route[0]);
      }
    } else {
      this.selector.select("orders");
    }
    this._selectorChange();
    this._preload();
  }
  _preload() {
    return __async(this, null, function* () {
      console.log("loaded");
      try {
      } catch (e) {
        console.log(e);
      } finally {
      }
    });
  }
  _onPopstate() {
    console.log("pop");
    if (history.state)
      this.selector.select(history.state.selected);
    this._selectorChange();
  }
  _menuClick() {
    this.drawerOpened = !this.drawerOpened;
  }
  _selectorChange() {
    return __async(this, null, function* () {
      const selected = this.selector.selected;
      if (selected) {
        const prefix = "./";
        if (selected === "products")
          yield import(`${prefix}top-products.js`);
        if (selected === "sheet")
          yield import(`${prefix}top-sheet.js`);
        if (selected === "offers")
          yield import(`${prefix}top-offers.js`);
        if (selected === "orders")
          yield import(`${prefix}top-orders.js`);
        if (selected === "collections")
          yield import(`${prefix}top-collections.js`);
        if (selected === "categories")
          yield import(`${prefix}top-categories.js`);
        if (selected === "catalog" || selected === "offers" || selected === "products" || selected === "categories") {
          let items = Array.from(this.shadowRoot.querySelectorAll('[menu-item="catalog"]'));
          items = [...items, this.shadowRoot.querySelector('[data-route="catalog"]')];
          if (selected === "catalog") {
            if (items[0].hasAttribute("shown")) {
              for (const item of items) {
                item.removeAttribute("shown");
              }
            } else {
              for (const item of items) {
                item.setAttribute("shown", "");
              }
            }
          } else {
            for (const item of items) {
              item.setAttribute("shown", "");
            }
          }
        }
        if (selected !== "catalog") {
          this.translatedTitle.value = selected;
          this.pages.select(selected);
          history.pushState({ selected }, selected, `#${selected}`);
        }
      }
    });
  }
  get template() {
    return html`
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
    `;
  }
});
export {
  shell_default as default
};
