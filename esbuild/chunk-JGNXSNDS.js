// node_modules/backed/src/utils/un-camel-case.js
var un_camel_case_default = (string) => {
  string = string.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, "$1 $2");
  string = string.toLowerCase();
  return string;
};

// node_modules/backed/src/utils/replace-accents.js
var replace_accents_default = (string) => {
  if (string.search(/[\xC0-\xFF]/g) > -1) {
    string = string.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y");
  }
  return string;
};

// node_modules/backed/src/utils/remove-non-word.js
var remove_non_word_default = (string) => string.replace(/[^0-9a-zA-Z\xC0-\xFF \-]/g, "");

// node_modules/backed/src/utils/constants.js
var WHITE_SPACES = [
  " ",
  "\n",
  "\r",
  "	",
  "\f",
  "\v",
  "\xA0",
  "\u1680",
  "\u180E",
  "\u2000",
  "\u2001",
  "\u2002",
  "\u2003",
  "\u2004",
  "\u2005",
  "\u2006",
  "\u2007",
  "\u2008",
  "\u2009",
  "\u200A",
  "\u2028",
  "\u2029",
  "\u202F",
  "\u205F",
  "\u3000"
];

// node_modules/backed/src/utils/ltrim.js
var ltrim_default = (string, chars) => {
  chars = chars || WHITE_SPACES;
  let start = 0, len = string.length, charLen = chars.length, found = true, i, c;
  while (found && start < len) {
    found = false;
    i = -1;
    c = string.charAt(start);
    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        start++;
        break;
      }
    }
  }
  return start >= len ? "" : string.substr(start, len);
};

// node_modules/backed/src/utils/rtrim.js
var rtrim_default = (string, chars) => {
  chars = chars || WHITE_SPACES;
  var end = string.length - 1, charLen = chars.length, found = true, i, c;
  while (found && end >= 0) {
    found = false;
    i = -1;
    c = string.charAt(end);
    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        end--;
        break;
      }
    }
  }
  return end >= 0 ? string.substring(0, end + 1) : "";
};

// node_modules/backed/src/utils/trim.js
var trim_default = (string, chars) => {
  chars = chars || WHITE_SPACES;
  return ltrim_default(rtrim_default(string, chars), chars);
};

// node_modules/backed/src/utils/slugify.js
var slugify_default = (string, delimeter) => {
  if (delimeter == null) {
    delimeter = "-";
  }
  string = replace_accents_default(string);
  string = remove_non_word_default(string);
  string = trim_default(string).replace(/ +/g, delimeter).toLowerCase();
  return string;
};

// node_modules/backed/src/utils/hyphenate.js
var hyphenate_default = (string) => {
  string = un_camel_case_default(string);
  return slugify_default(string, "-");
};

// node_modules/backed/src/utils/should-register.js
var shouldRegister = (name) => {
  return customElements.get(name) ? false : true;
};
var should_register_default = shouldRegister;

// node_modules/backed/src/utils/define.js
var define_default = (klass) => {
  const name = hyphenate_default(klass.name);
  return should_register_default(name) ? customElements.define(name, klass) : "";
};

// node_modules/custom-renderer/src/render.js
var render_default = (element, { changes, template }) => {
  if (!changes && !template)
    return console.warn("changes or template expected");
  if (element.shadowRoot)
    element = element.shadowRoot;
  if (!element.innerHTML)
    element.innerHTML = template;
  for (const key of Object.keys(changes)) {
    const els = Array.from(element.querySelectorAll(`[render-mixin-id="${key}"]`));
    for (const el of els) {
      el.innerHTML = changes[key];
    }
  }
  return;
};

// node_modules/custom-html-tag/src/html.js
var html2 = (strings, ...keys) => {
  return (...values) => {
    return { strings, keys, values };
  };
};
var html_default = html2;

// node_modules/custom-renderer-mixin/src/render-mixin.js
window.html = window.html || html_default;
var render_mixin_default = (base = HTMLElement) => class RenderMixin extends base {
  constructor() {
    super();
    this.set = [];
    this.renderer = this.renderer.bind(this);
    this.render = this.renderer;
  }
  beforeRender({ values, strings, keys }) {
    const dict = values[values.length - 1] || {};
    const changes = {};
    let template = null;
    if (!this.rendered)
      template = strings[0];
    if (values[0] !== void 0) {
      keys.forEach((key, i) => {
        const string = strings[i + 1];
        let value = Number.isInteger(key) ? values[key] : dict[key];
        if (value === void 0 && Array.isArray(key)) {
          value = key.join("");
        } else if (value === void 0 && !Array.isArray(key) && this.set[i]) {
          value = this.set[i].value;
        } else if (value === void 0 && !Array.isArray(key) && !this.set[i]) {
          value = "";
        }
        if (!this.rendered) {
          if (string.charAt(0) === '"' && string.charAt(string.length - 1 === ">")) {
            template += `${value}" render-mixin-property="${key}${string}`;
          } else {
            template = template.replace(/(>)[^>]*$/g, ` render-mixin-id="${key}">`);
            template += `${value}${string}`;
          }
        }
        if (this.set[key] && this.set[key] !== value) {
          changes[key] = value;
          this.set[key] = value;
        } else if (!this.set[key]) {
          this.set[key] = value;
          changes[key] = value;
        }
      });
    } else {
      template += strings[0];
    }
    return {
      template,
      changes
    };
  }
  renderer(properties = this.properties, template = this.template) {
    if (!properties)
      properties = {};
    else if (!this.isFlat(properties)) {
      const object = {};
      for (const key of Object.keys(properties)) {
        let value;
        if (this[key] !== void 0)
          value = this[key];
        else if (properties[key] && properties[key].value !== void 0) {
          value = properties[key].value;
        } else {
          value = "";
        }
        object[key] = value;
      }
      ;
      properties = object;
    }
    render_default(this, this.beforeRender(template(properties)));
  }
  /**
   * wether or not properties is just an object or indexed object (like {prop: {value: 'value'}})
   */
  isFlat(object) {
    const firstObject = object[Object.keys(object)[0]];
    if (firstObject)
      if (firstObject.hasOwnProperty("value") || firstObject.hasOwnProperty("reflect") || firstObject.hasOwnProperty("observer") || firstObject.hasOwnProperty("render"))
        return false;
      else
        return true;
  }
  connectedCallback() {
    if (super.connectedCallback)
      super.connectedCallback();
    if (this.render) {
      this.render();
      this.rendered = true;
    }
    ;
  }
};

// node_modules/backed/src/mixins/css-mixin.js
var mixins = {
  "mixin(--css-row)": `display: flex;
        flex-direction: row;
  `,
  "mixin(--css-column)": `display: flex;
        flex-direction: column;
  `,
  "mixin(--css-center)": `align-items: center;`,
  "mixin(--css-header)": `height: 128px;
        width: 100%;
        background: var(--primary-color);
        color: var(--text-color);
        mixin(--css-column)`,
  "mixin(--css-flex)": `flex: 1;`,
  "mixin(--css-flex-2)": `flex: 2;`,
  "mixin(--css-flex-3)": `flex: 3;`,
  "mixin(--css-flex-4)": `flex: 4;`,
  "mixin(--material-palette)": `--dark-primary-color: #00796B;
        --light-primary-color: #B2DFDB;
        --primary-color: #009688;
        --text-color: #FFF;
        --primary-text-color: #212121;
        --secondary-text-color: #757575;
        --divider-color: #BDBDBD;
        --accent-color: #4CAF50;
        --disabled-text-color: #BDBDBD;
        --primary-background-color: #f9ffff;
        --dialog-background-color: #FFFFFF;`,
  "mixin(--css-hero)": `display: flex;
        max-width: 600px;
        max-height: 340px;
        height: 100%;
        width: 100%;
        box-shadow: 3px 2px 4px 2px rgba(0,0,0, 0.15),
                    -2px 0px 4px 2px rgba(0,0,0, 0.15);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 2px;
  `,
  "mixin(--css-elevation-2dp)": `
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);`,
  "mixin(--css-elevation-3dp)": `
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                0 1px 8px 0 rgba(0, 0, 0, 0.12),
                0 3px 3px -2px rgba(0, 0, 0, 0.4);`,
  "mixin(--css-elevation-4dp)": `
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                0 1px 10px 0 rgba(0, 0, 0, 0.12),
                0 2px 4px -1px rgba(0, 0, 0, 0.4);`,
  "mixin(--css-elevation-6dp)": `
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                0 1px 18px 0 rgba(0, 0, 0, 0.12),
                0 3px 5px -1px rgba(0, 0, 0, 0.4);`,
  "mixin(--css-elevation-8dp)": `
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                0 3px 14px 2px rgba(0, 0, 0, 0.12),
                0 5px 5px -3px rgba(0, 0, 0, 0.4);`,
  "mixin(--css-elevation-12dp)": `
    box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                0 4px 22px 3px rgba(0, 0, 0, 0.12),
                0 6px 7px -4px rgba(0, 0, 0, 0.4);`,
  "mixin(--css-elevation-16dp)": `
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                0  6px 30px 5px rgba(0, 0, 0, 0.12),
                0  8px 10px -5px rgba(0, 0, 0, 0.4);`,
  "mixin(--css-elevation-24dp)": `
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                0 9px 46px 8px rgba(0, 0, 0, 0.12),
                0 11px 15px -7px rgba(0, 0, 0, 0.4);`
};
var classes = {
  "apply(--css-row)": `.row {
        mixin(--css-row)
      }
   `,
  "apply(--css-column)": `.column {
        mixin(--css-column)
      }
   `,
  "apply(--css-flex)": `.flex {
        mixin(--css-flex)
      }
   `,
  "apply(--css-flex-2)": `.flex-2 {
     mixin(--css-flex-2)
   }`,
  "apply(--css-flex-3)": `.flex-3 {
     mixin(--css-flex-3)
   }`,
  "apply(--css-flex-4)": `.flex-4 {
     mixin(--css-flex-4)
   }`,
  "apply(--css-center)": `.center {
        align-items: center;
      }
   `,
  "apply(--css-center-center)": `.center-center {
        align-items: center;
        justify-content: center;
      }
   `,
  "apply(--css-header)": `header, .header {
     mixin(--css-header)
   }`,
  "apply(--css-hero)": `.hero {
      mixin(--css-hero)
   }`,
  "apply(--css-elevation-2dp)": `.elevation-2dp {
      mixin(--css-elevation-2dp)
   }`,
  "apply(--css-elevation-3dp)": `.elevation-3dp {
      mixin(--css-elevation-3dp)
   }`,
  "apply(--css-elevation-4dp)": `.elevation-4dp {
      mixin(--css-elevation-4dp)
   }`,
  "apply(--css-elevation-6dp)": `.elevation-6dp {
      mixin(--css-elevation-6dp)
   }`,
  "apply(--css-elevation-8dp)": `.elevation-8dp {
      mixin(--css-elevation-8dp)
   }`,
  "apply(--css-elevation-12dp)": `.elevation-12dp {
      mixin(--css-elevation-12dp)
   }`,
  "apply(--css-elevation-16dp)": `.elevation-16dp {
      mixin(--css-elevation-16dp)
   }`,
  "apply(--css-elevation-18dp)": `.elevation-18dp {
      mixin(--css-elevation-18dp)
   }`
};
var css_mixin_default = (base) => {
  return class CSSMixin extends base {
    get __style() {
      return this.shadowRoot.querySelector("style");
    }
    constructor() {
      super();
    }
    connectedCallback() {
      if (super.connectedCallback)
        super.connectedCallback();
      if (this.render)
        this.hasRenderer = true;
      else if (this.template)
        console.log(`Render method undefined ${this.localname}`);
      this._init();
    }
    _init() {
      if (this.hasRenderer) {
        if (!this.rendered) {
          return requestAnimationFrame(() => {
            this._init();
          });
        }
      }
      const styles = this.shadowRoot ? this.shadowRoot.querySelectorAll("style") : this.querySelectorAll("style");
      styles.forEach((style) => {
        this._applyClasses(style.innerHTML).then((innerHTML) => {
          if (innerHTML)
            this.__style.innerHTML = innerHTML;
          this._applyMixins(style.innerHTML).then((innerHTML2) => {
            if (innerHTML2)
              this.__style.innerHTML = innerHTML2;
          });
        }).catch((error) => {
          console.error(error);
        });
      });
    }
    _applyMixins(string) {
      const mixinInMixin = (string2) => {
        if (!string2)
          return console.warn(`Nothing found for ${string2}`);
        const matches = string2.match(/mixin((.*))/g);
        if (matches) {
          for (const match of matches) {
            const mixin = mixins[match];
            string2 = string2.replace(match, mixin);
          }
        }
        return string2;
      };
      return new Promise((resolve, reject) => {
        const matches = string.match(/mixin((.*))/g);
        if (matches)
          for (const match of matches) {
            const mixin = mixinInMixin(mixins[match]);
            string = string.replace(match, mixin);
          }
        ;
        resolve(string);
      });
    }
    _applyClasses(string) {
      return new Promise((resolve, reject) => {
        const matches = string.match(/apply((.*))/g);
        if (matches)
          for (const match of matches) {
            string = string.replace(match, classes[match]);
          }
        resolve(string);
      });
    }
  };
};

// node_modules/backed/src/utils/load-script.js
var load_script_default = (src, method = "async", type) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.setAttribute(method, "");
    if (type)
      script.setAttribute("type", type);
    script.onload = (result) => {
      resolve(result);
    };
    script.onerror = (error) => {
      reject(error);
    };
    script.src = src;
    document.body.appendChild(script);
  });
};

// node_modules/backed/src/utils/merge.js
var merge_default = (object = {}, source = {}) => {
  for (const key of Object.keys(object)) {
    if (source[key]) {
      Object.assign(object[key], source[key]);
    }
  }
  for (const key of Object.keys(source)) {
    if (!object[key]) {
      object[key] = source[key];
    }
  }
  return object;
};

// node_modules/backed/src/mixins/property-mixin.js
window.Backed = window.Backed || {};
window.Backed.PropertyStore = window.Backed.PropertyStore || /* @__PURE__ */ new Map();
var property_mixin_default = (base) => {
  return class PropertyMixin extends base {
    static get observedAttributes() {
      return Object.entries(this.properties).map((entry) => {
        if (entry[1].reflect) {
          return entry[0];
        } else
          return null;
      });
    }
    get properties() {
      return customElements.get(this.localName).properties;
    }
    constructor() {
      super();
      if (this.properties) {
        for (const entry of Object.entries(this.properties)) {
          const { observer, reflect, renderer } = entry[1];
          this.defineProperty(entry[0], entry[1]);
        }
      }
    }
    connectedCallback() {
      if (super.connectedCallback)
        super.connectedCallback();
      if (this.attributes)
        for (const attribute of this.attributes) {
          if (String(attribute.name).includes("on-")) {
            const fn = attribute.value;
            const name = attribute.name.replace("on-", "");
            this.addEventListener(String(name), (event) => {
              let target = event.path[0];
              while (!target.host) {
                target = target.parentNode;
              }
              if (target.host[fn]) {
                target.host[fn](event);
              }
            });
          }
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
      this[name] = newValue;
    }
    /**
     * @param {function} options.observer callback function returns {instance, property, value}
     * @param {boolean} options.reflect when true, reflects value to attribute
     * @param {function} options.render callback function for renderer (example: usage with lit-html, {render: render(html, shadowRoot)})
     */
    defineProperty(property = null, { strict = false, observer, reflect = false, renderer, value }) {
      Object.defineProperty(this, property, {
        set(value2) {
          if (value2 === this[`___${property}`])
            return;
          this[`___${property}`] = value2;
          if (reflect) {
            if (value2)
              this.setAttribute(property, String(value2));
            else
              this.removeAttribute(property);
          }
          if (observer) {
            if (observer in this)
              this[observer]();
            else
              console.warn(`observer::${observer} undefined`);
          }
          if (renderer) {
            const obj = {};
            obj[property] = value2;
            if (renderer in this)
              this.render(obj, this[renderer]);
            else
              console.warn(`renderer::${renderer} undefined`);
          }
        },
        get() {
          return this[`___${property}`];
        },
        configurable: strict ? false : true
      });
      const attr = this.getAttribute(property);
      this[property] = attr || this.hasAttribute(property) || value;
    }
  };
};

// node_modules/custom-select-mixins/src/select-mixin.js
var select_mixin_default = (base) => {
  return class SelectMixin extends property_mixin_default(base) {
    static get properties() {
      return merge_default(super.properties, {
        selected: {
          value: 0,
          observer: "__selectedObserver__"
        }
      });
    }
    constructor() {
      super();
    }
    get slotted() {
      return this.shadowRoot ? this.shadowRoot.querySelector("slot") : this;
    }
    get _assignedNodes() {
      const nodes = "assignedNodes" in this.slotted ? this.slotted.assignedNodes() : this.children;
      const arr = [];
      for (var i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.nodeType === 1)
          arr.push(node);
      }
      return arr;
    }
    /**
    * @return {String}
    */
    get attrForSelected() {
      return this.getAttribute("attr-for-selected") || "name";
    }
    set attrForSelected(value) {
      this.setAttribute("attr-for-selected", value);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (!isNaN(newValue)) {
          newValue = Number(newValue);
        }
        this[name] = newValue;
      }
    }
    /**
     * @param {string|number|HTMLElement} selected
     */
    select(selected) {
      if (selected)
        this.selected = selected;
      if (this.multi)
        this.__selectedObserver__();
    }
    next(string) {
      const index = this.getIndexFor(this.currentSelected);
      if (index !== -1 && index >= 0 && this._assignedNodes.length > index && index + 1 <= this._assignedNodes.length - 1) {
        this.selected = this._assignedNodes[index + 1];
      }
    }
    previous() {
      const index = this.getIndexFor(this.currentSelected);
      if (index !== -1 && index >= 0 && this._assignedNodes.length > index && index - 1 >= 0) {
        this.selected = this._assignedNodes[index - 1];
      }
    }
    getIndexFor(element) {
      if (element && element instanceof HTMLElement === false)
        return console.error(`${element} is not an instanceof HTMLElement`);
      return this._assignedNodes.indexOf(element || this.selected);
    }
    _updateSelected(selected) {
      selected.classList.add("custom-selected");
      if (this.currentSelected && this.currentSelected !== selected) {
        this.currentSelected.classList.remove("custom-selected");
      }
      this.currentSelected = selected;
    }
    /**
     * @param {string|number|HTMLElement} change.value
     */
    __selectedObserver__(value) {
      const type = typeof this.selected;
      if (Array.isArray(this.selected)) {
        for (const child of this._assignedNodes) {
          if (child.nodeType === 1) {
            if (this.selected.indexOf(child.getAttribute(this.attrForSelected)) !== -1) {
              child.classList.add("custom-selected");
            } else {
              child.classList.remove("custom-selected");
            }
          }
        }
        return;
      } else if (type === "object")
        return this._updateSelected(this.selected);
      else if (type === "string") {
        for (const child of this._assignedNodes) {
          if (child.nodeType === 1) {
            if (child.getAttribute(this.attrForSelected) === this.selected) {
              return this._updateSelected(child);
            }
          }
        }
      } else {
        const child = this._assignedNodes[this.selected];
        if (child && child.nodeType === 1)
          this._updateSelected(child);
      }
    }
  };
};

// node_modules/custom-select-mixins/src/selector-mixin.js
var selector_mixin_default = (base) => {
  return class SelectorMixin extends select_mixin_default(base) {
    static get properties() {
      return merge_default(super.properties, {
        selected: {
          value: 0,
          observer: "__selectedObserver__"
        },
        multi: {
          value: false,
          reflect: true
        }
      });
    }
    constructor() {
      super();
    }
    connectedCallback() {
      super.connectedCallback();
      this._onClick = this._onClick.bind(this);
      this.addEventListener("click", this._onClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this._onClick);
    }
    _onClick(event) {
      const target = event.path ? event.path[0] : event.composedPath()[0];
      const attr = target.getAttribute(this.attrForSelected);
      let selected;
      if (target.localName !== this.localName) {
        selected = attr ? attr : target;
      } else {
        selected = attr;
      }
      if (this.multi) {
        if (!Array.isArray(this.selected))
          this.selected = [];
        const index = this.selected.indexOf(selected);
        if (index === -1)
          this.selected.push(selected);
        else
          this.selected.splice(index, 1);
        this.select(this.selected);
      } else
        this.selected = selected;
      this.dispatchEvent(new CustomEvent("selected", { detail: selected }));
    }
  };
};

// src/base.js
var ElementBase = class extends css_mixin_default(render_mixin_default(HTMLElement)) {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    if (super.connectedCallback)
      super.connectedCallback();
  }
  disconnectedCallback() {
    if (super.disconnectedCallback)
      super.disconnectedCallback();
  }
  get template() {
    return html`<style>:host { pointer-events: none; }</style><slot></slot>`;
  }
};
window.readAsDataURL = (input) => new Promise((resolve, reject) => {
  console.log(input);
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    resolve(reader.result);
  }, false);
  reader.readAsDataURL(input);
});
window.importScript = load_script_default;
window.ElementBase = ElementBase;
window.define = define_default;
window.SelectorMixin = selector_mixin_default;
window.RenderMixin = render_mixin_default;

export {
  define_default,
  render_mixin_default,
  select_mixin_default,
  selector_mixin_default,
  ElementBase
};
