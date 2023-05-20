/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * Add space between camelCase text.
 */
var unCamelCase = (string) => {
  string = string.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');
  string = string.toLowerCase();
  return string;
};

/**
* Replaces all accented chars with regular ones
*/
var replaceAccents = (string) => {
  // verifies if the String has accents and replace them
  if (string.search(/[\xC0-\xFF]/g) > -1) {
      string = string
              .replace(/[\xC0-\xC5]/g, 'A')
              .replace(/[\xC6]/g, 'AE')
              .replace(/[\xC7]/g, 'C')
              .replace(/[\xC8-\xCB]/g, 'E')
              .replace(/[\xCC-\xCF]/g, 'I')
              .replace(/[\xD0]/g, 'D')
              .replace(/[\xD1]/g, 'N')
              .replace(/[\xD2-\xD6\xD8]/g, 'O')
              .replace(/[\xD9-\xDC]/g, 'U')
              .replace(/[\xDD]/g, 'Y')
              .replace(/[\xDE]/g, 'P')
              .replace(/[\xE0-\xE5]/g, 'a')
              .replace(/[\xE6]/g, 'ae')
              .replace(/[\xE7]/g, 'c')
              .replace(/[\xE8-\xEB]/g, 'e')
              .replace(/[\xEC-\xEF]/g, 'i')
              .replace(/[\xF1]/g, 'n')
              .replace(/[\xF2-\xF6\xF8]/g, 'o')
              .replace(/[\xF9-\xFC]/g, 'u')
              .replace(/[\xFE]/g, 'p')
              .replace(/[\xFD\xFF]/g, 'y');
  }

  return string;
};

var removeNonWord = (string) => string.replace(/[^0-9a-zA-Z\xC0-\xFF \-]/g, '');

const WHITE_SPACES = [
    ' ', '\n', '\r', '\t', '\f', '\v', '\u00A0', '\u1680', '\u180E',
    '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006',
    '\u2007', '\u2008', '\u2009', '\u200A', '\u2028', '\u2029', '\u202F',
    '\u205F', '\u3000'
];

/**
* Remove chars from beginning of string.
*/
var ltrim = (string, chars) => {
  chars = chars || WHITE_SPACES;

  let start = 0,
      len = string.length,
      charLen = chars.length,
      found = true,
      i, c;

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

  return (start >= len) ? '' : string.substr(start, len);
};

/**
* Remove chars from end of string.
*/
var rtrim = (string, chars) => {
  chars = chars || WHITE_SPACES;

  var end = string.length - 1,
      charLen = chars.length,
      found = true,
      i, c;

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

  return (end >= 0) ? string.substring(0, end + 1) : '';
};

/**
 * Remove white-spaces from beginning and end of string.
 */
var trim = (string, chars) => {
  chars = chars || WHITE_SPACES;
  return ltrim(rtrim(string, chars), chars);
};

/**
 * Convert to lower case, remove accents, remove non-word chars and
 * replace spaces with the specified delimeter.
 * Does not split camelCase text.
 */
var slugify = (string, delimeter) => {
  if (delimeter == null) {
      delimeter = "-";
  }

  string = replaceAccents(string);
  string = removeNonWord(string);
  string = trim(string) //should come after removeNonWord
          .replace(/ +/g, delimeter) //replace spaces with delimeter
          .toLowerCase();
  return string;
};

/**
* Replaces spaces with hyphens, split camelCase text, remove non-word chars, remove accents and convert to lower case.
*/
var hyphenate = string => {
  string = unCamelCase(string);
  return slugify(string, "-");
};

const shouldRegister = name => {
  return customElements.get(name) ? false : true;
};

var define$1 = klass => {
  const name = hyphenate(klass.name);
  return shouldRegister(name) ? customElements.define(name, klass) : '';
};

/**
 * @param {object} element HTMLElement
 * @param {function} tagResult custom-renderer-mixin {changes: [], template: ''}
 */
var render = (element, {changes, template}) => {
  if (!changes && !template) return console.warn('changes or template expected');
  if (element.shadowRoot) element = element.shadowRoot;
  if (!element.innerHTML) element.innerHTML = template;
  for (const key of Object.keys(changes)) {
    const els = Array.from(element.querySelectorAll(`[render-mixin-id="${key}"]`));
    for (const el of els) {
      el.innerHTML = changes[key];
    }
  }
  return;
};

/**
 *
 * @example
 ```js
  const template = html`<h1>${'name'}</h1>`;
  let templateResult = template({name: 'Olivia'});

  templateResult.values // property values 'Olivia'
  templateResult.keys // property keys 'name'
  templateResult.strings // raw template array '["<h1>", "</h1>"]'
 ```
 */
const html$1 = (strings, ...keys) => {
  return ((...values) => {
    return {strings, keys, values};
  });
};

window.html = window.html || html$1;

var RenderMixin = (base = HTMLElement) =>
class RenderMixin extends base {

  constructor() {
    super();
    this.set = [];
    this.renderer = this.renderer.bind(this);
    this.render = this.renderer;
  }

  beforeRender({values, strings, keys}) {
    const dict = values[values.length - 1] || {};
    const changes = {};
    let template = null;
    if (!this.rendered) template = strings[0];

    if (values[0] !== undefined) {
      keys.forEach((key, i) => {
        const string = strings[i + 1];
        let value = Number.isInteger(key) ? values[key] : dict[key];
        if (value === undefined && Array.isArray(key)) {
          value = key.join('');
        } else if (value === undefined && !Array.isArray(key) && this.set[i]) {
          value = this.set[i].value; // set previous value, doesn't require developer to pass all properties
        } else if (value === undefined && !Array.isArray(key) && !this.set[i]) {
          value = '';
        }
        if (!this.rendered) {
          if (string.charAt(0) === '"' && string.charAt(string.length - 1 === '>')) {
            template += `${value}" render-mixin-property="${key}${string}`;
          } else {
            template = template.replace(/(>)[^>]*$/g,  ` render-mixin-id="${key}">`);
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
    if (!properties) properties = {};
    else if (!this.isFlat(properties)) {
      // check if we are dealing with an flat or indexed object
      // create flat object getting the values from super if there is one
      // default to given properties set properties[key].value
      // this implementation is meant to work with 'property-mixin'
      // checkout https://github.com/vandeurenglenn/backed/src/mixin/property-mixin
      // while I did not test, I believe it should be compatible with PolymerElements
      const object = {};
      // try getting value from this.property
      // try getting value from properties.property.value
      // try getting value from property.property
      // fallback to property
      for (const key of Object.keys(properties)) {
        let value;
        if (this[key] !== undefined) value = this[key];
        else if (properties[key] && properties[key].value !== undefined) {
          value = properties[key].value;
        } else {
          value = '';
        }
        object[key] = value;
      }      properties = object;
    }
    render(this, this.beforeRender(template(properties)));
  }

  /**
   * wether or not properties is just an object or indexed object (like {prop: {value: 'value'}})
   */
  isFlat(object) {
    const firstObject = object[Object.keys(object)[0]];
    if (firstObject)
      if (firstObject.hasOwnProperty('value') ||
          firstObject.hasOwnProperty('reflect') ||
          firstObject.hasOwnProperty('observer') ||
          firstObject.hasOwnProperty('render'))
        return false;
    else return true;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (this.render) {
      this.render();
      this.rendered = true;
    }  }
};

/**
 * @module CSSMixin
 * @mixin Backed
 * @param {class} base class to extend from
 */
 const mixins = {
  'mixin(--css-row)': `display: flex;
        flex-direction: row;
  `,
  'mixin(--css-column)': `display: flex;
        flex-direction: column;
  `,
  'mixin(--css-center)': `align-items: center;`,
  'mixin(--css-header)': `height: 128px;
        width: 100%;
        background: var(--primary-color);
        color: var(--text-color);
        mixin(--css-column)`,
  'mixin(--css-flex)': `flex: 1;`,
  'mixin(--css-flex-2)': `flex: 2;`,
  'mixin(--css-flex-3)': `flex: 3;`,
  'mixin(--css-flex-4)': `flex: 4;`,
  'mixin(--material-palette)': `--dark-primary-color: #00796B;
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
  'mixin(--css-hero)': `display: flex;
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
  'mixin(--css-elevation-2dp)': `
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);`,

  'mixin(--css-elevation-3dp)': `
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                0 1px 8px 0 rgba(0, 0, 0, 0.12),
                0 3px 3px -2px rgba(0, 0, 0, 0.4);`,
  'mixin(--css-elevation-4dp)': `
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                0 1px 10px 0 rgba(0, 0, 0, 0.12),
                0 2px 4px -1px rgba(0, 0, 0, 0.4);`,
  'mixin(--css-elevation-6dp)': `
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                0 1px 18px 0 rgba(0, 0, 0, 0.12),
                0 3px 5px -1px rgba(0, 0, 0, 0.4);`,
  'mixin(--css-elevation-8dp)': `
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                0 3px 14px 2px rgba(0, 0, 0, 0.12),
                0 5px 5px -3px rgba(0, 0, 0, 0.4);`,
  'mixin(--css-elevation-12dp)': `
    box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                0 4px 22px 3px rgba(0, 0, 0, 0.12),
                0 6px 7px -4px rgba(0, 0, 0, 0.4);`,
  'mixin(--css-elevation-16dp)': `
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                0  6px 30px 5px rgba(0, 0, 0, 0.12),
                0  8px 10px -5px rgba(0, 0, 0, 0.4);`,
  'mixin(--css-elevation-24dp)': `
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                0 9px 46px 8px rgba(0, 0, 0, 0.12),
                0 11px 15px -7px rgba(0, 0, 0, 0.4);`
 };

 const classes = {
   'apply(--css-row)': `.row {
        mixin(--css-row)
      }
   `,
   'apply(--css-column)': `.column {
        mixin(--css-column)
      }
   `,
   'apply(--css-flex)': `.flex {
        mixin(--css-flex)
      }
   `,
   'apply(--css-flex-2)': `.flex-2 {
     mixin(--css-flex-2)
   }`,
   'apply(--css-flex-3)': `.flex-3 {
     mixin(--css-flex-3)
   }`,
   'apply(--css-flex-4)': `.flex-4 {
     mixin(--css-flex-4)
   }`,
   'apply(--css-center)': `.center {
        align-items: center;
      }
   `,
   'apply(--css-center-center)': `.center-center {
        align-items: center;
        justify-content: center;
      }
   `,
   'apply(--css-header)': `header, .header {
     mixin(--css-header)
   }`,
   'apply(--css-hero)': `.hero {
      mixin(--css-hero)
   }`,
   'apply(--css-elevation-2dp)': `.elevation-2dp {
      mixin(--css-elevation-2dp)
   }`,
   'apply(--css-elevation-3dp)': `.elevation-3dp {
      mixin(--css-elevation-3dp)
   }`,
   'apply(--css-elevation-4dp)': `.elevation-4dp {
      mixin(--css-elevation-4dp)
   }`,
   'apply(--css-elevation-6dp)': `.elevation-6dp {
      mixin(--css-elevation-6dp)
   }`,
   'apply(--css-elevation-8dp)': `.elevation-8dp {
      mixin(--css-elevation-8dp)
   }`,
   'apply(--css-elevation-12dp)': `.elevation-12dp {
      mixin(--css-elevation-12dp)
   }`,
   'apply(--css-elevation-16dp)': `.elevation-16dp {
      mixin(--css-elevation-16dp)
   }`,
   'apply(--css-elevation-18dp)': `.elevation-18dp {
      mixin(--css-elevation-18dp)
   }`
 };
var CSS = base => {
  return class CSSMixin extends base {

    get __style() {
      return this.shadowRoot.querySelector('style');
    }
    constructor() {
      super();
    }
    connectedCallback() {
      // TODO: test
      if (super.connectedCallback) super.connectedCallback();
      // TODO: Implement better way to check if a renderer is used
      if (this.render) this.hasRenderer = true;
      else if(this.template) console.log(`Render method undefined ${this.localname}`);

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
      const styles = this.shadowRoot ? this.shadowRoot.querySelectorAll('style') : this.querySelectorAll('style');
      // const matches = style.innerHTML.match(/apply((.*))/g);
      styles.forEach(style => {
        this._applyClasses(style.innerHTML).then(innerHTML => {
          if (innerHTML) this.__style.innerHTML = innerHTML;
          this._applyMixins(style.innerHTML).then(innerHTML => {
            if (innerHTML) this.__style.innerHTML = innerHTML;
          });
        }).catch(error => {
          console.error(error);
        });
      });
      // this._applyVariables(matches, style);
    }

    _applyMixins(string) {
      const mixinInMixin = string => {
        if (!string) return console.warn(`Nothing found for ${string}`);
        const matches = string.match(/mixin((.*))/g);
        if (matches) {
          for (const match of matches) {
            const mixin = mixins[match];
            string = string.replace(match, mixin);
          }
        }
        return string;
      };
      return new Promise((resolve, reject) => {
        const matches = string.match(/mixin((.*))/g);
        if (matches) for (const match of matches) {
          const mixin = mixinInMixin(mixins[match]);
          string = string.replace(match, mixin);
          // return [
          //   match, mixins[match]
          // ]

        }        resolve(string);
      });
    }

    _applyClasses(string) {
      return new Promise((resolve, reject) => {
        const matches = string.match(/apply((.*))/g);
        if (matches) for (const match of matches) {
          // this._applyMixins(classes[match]).then(klass => {
            string = string.replace(match, classes[match]);
          // });
        }
        // this.style.innerHTML = string;
        resolve(string);
      });
    }
  }
};

/**
 * @mixin Backed
 * @module utils
 * @export loadScript
 *
 * defer handles loading after the document is parsed, async loads while parsing
 *
 * @param {string} src link/path to the script to load
 * @param {string} method default: 'async',  options: `defer, async, ''`
 * @param {string} type default: undefined,  options: `module, utf-8, ...`
 * @return {object} merge result
 */
 var importScript = (src, method = 'async', type) => {
   return new Promise((resolve, reject) => {
     let script = document.createElement('script');
     script.setAttribute(method, '');
     if (type) script.setAttribute('type', type);
     script.onload = result => {
       resolve(result);
     };
     script.onerror = error => {
       reject(error);
     };
     script.src = src;
     document.body.appendChild(script);
   });
 };

/**
 * @mixin Backed
 * @module utils
 * @export merge
 *
 * some-prop -> someProp
 *
 * @param {object} object The object to merge with
 * @param {object} source The object to merge
 * @return {object} merge result
 */
var merge = (object = {}, source = {}) => {
  // deep assign
  for (const key of Object.keys(object)) {
    if (source[key]) {
      Object.assign(object[key], source[key]);
    }
  }
  // assign the rest
  for (const key of Object.keys(source)) {
    if (!object[key]) {
      object[key] = source[key];
    }
  }
  return object;
};

window.Backed = window.Backed || {};
// binding does it's magic using the propertyStore ...
window.Backed.PropertyStore = window.Backed.PropertyStore || new Map();

// TODO: Create & add global observer
var PropertyMixin = base => {
  return class PropertyMixin extends base {
    static get observedAttributes() {
      return Object.entries(this.properties).map(entry => {if (entry[1].reflect) {return entry[0]} else return null});
    }

    get properties() {
      return customElements.get(this.localName).properties;
    }

    constructor() {
      super();
      if (this.properties) {
        for (const entry of Object.entries(this.properties)) {
          entry[1];
          // allways define property even when renderer is not found.
          this.defineProperty(entry[0], entry[1]);
        }
      }
    }

    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
      if (this.attributes)
        for (const attribute of this.attributes) {
          if (String(attribute.name).includes('on-')) {
            const fn = attribute.value;
            const name = attribute.name.replace('on-', '');
            this.addEventListener(String(name), event => {
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
    defineProperty(property = null, {strict = false, observer, reflect = false, renderer, value}) {
      Object.defineProperty(this, property, {
        set(value) {
          if (value === this[`___${property}`]) return;
          this[`___${property}`] = value;

          if (reflect) {
            if (value) this.setAttribute(property, String(value));
            else this.removeAttribute(property);
          }

          if (observer) {
            if (observer in this) this[observer]();
            else console.warn(`observer::${observer} undefined`);
          }

          if (renderer) {
            const obj = {};
            obj[property] = value;
            if (renderer in this) this.render(obj, this[renderer]);
            else console.warn(`renderer::${renderer} undefined`);
          }

        },
        get() {
          return this[`___${property}`];
        },
        configurable: strict ? false : true
      });
      // check if attribute is defined and update property with it's value
      // else fallback to it's default value (if any)
      const attr = this.getAttribute(property);
      this[property] = attr || this.hasAttribute(property) || value;
    }
  }
};

var SelectMixin = base => {
  return class SelectMixin extends PropertyMixin(base) {

    static get properties() {
      return merge(super.properties, {
        selected: {
          value: 0,
          observer: '__selectedObserver__'
        }
      });
    }

    constructor() {
      super();
    }

    get slotted() {
      return this.shadowRoot ? this.shadowRoot.querySelector('slot') : this;
    }

    get _assignedNodes() {
      const nodes = 'assignedNodes' in this.slotted ? this.slotted.assignedNodes() : this.children;
      const arr = [];
      for (var i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.nodeType === 1) arr.push(node);
      }
      return arr;
    }

    /**
    * @return {String}
    */
    get attrForSelected() {
      return this.getAttribute('attr-for-selected') || 'name';
    }

    set attrForSelected(value) {
      this.setAttribute('attr-for-selected', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        // check if value is number
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
      if (selected) this.selected = selected;
      // TODO: fix selectedobservers
      if (this.multi) this.__selectedObserver__();
    }

    next(string) {
      const index = this.getIndexFor(this.currentSelected);
      if (index !== -1 && index >= 0 && this._assignedNodes.length > index &&
          (index + 1) <= this._assignedNodes.length - 1) {
        this.selected = this._assignedNodes[index + 1];
      }
    }

    previous() {
      const index = this.getIndexFor(this.currentSelected);
      if (index !== -1 && index >= 0 && this._assignedNodes.length > index &&
          (index - 1) >= 0) {
        this.selected = this._assignedNodes[index - 1];
      }
    }

    getIndexFor(element) {
      if (element && element instanceof HTMLElement === false)
        return console.error(`${element} is not an instanceof HTMLElement`);

      return this._assignedNodes.indexOf(element || this.selected);
    }

    _updateSelected(selected) {
      selected.classList.add('custom-selected');
      if (this.currentSelected && this.currentSelected !== selected) {
        this.currentSelected.classList.remove('custom-selected');
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
              child.classList.add('custom-selected');
            } else {
              child.classList.remove('custom-selected');
            }
          }
        }
        return;
      } else if (type === 'object') return this._updateSelected(this.selected);
      else if (type === 'string') {
        for (const child of this._assignedNodes) {
          if (child.nodeType === 1) {
            if (child.getAttribute(this.attrForSelected) === this.selected) {
              return this._updateSelected(child);
            }
          }
        }
      } else {
        // set selected by index
        const child = this._assignedNodes[this.selected];
        if (child && child.nodeType === 1) this._updateSelected(child);
        // remove selected even when nothing found, better to return nothing
      }
    }
  }
};

var SelectorMixin = base => {
  return class SelectorMixin extends SelectMixin(base) {

  static get properties() {
      return merge(super.properties, {
        selected: {
          value: 0,
          observer: '__selectedObserver__'
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
      this.addEventListener('click', this._onClick);
    }
    disconnectedCallback() {
      this.removeEventListener('click', this._onClick);
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
        if (!Array.isArray(this.selected)) this.selected = [];
        const index = this.selected.indexOf(selected);
        if (index === -1) this.selected.push(selected);
        else this.selected.splice(index, 1);
        // trigger observer
        this.select(this.selected);

      } else this.selected = selected;

      this.dispatchEvent(new CustomEvent('selected', { detail: selected }));
    }
  }
};

class ElementBase extends CSS(RenderMixin(HTMLElement)) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
  }

  get template() {
    return html`<style>:host { pointer-events: none; }</style><slot></slot>`;
  }
}
/**
 * @param {blob|file} input
 */
window.readAsDataURL = (input) => new Promise((resolve, reject) => {
  console.log(input);
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    resolve(reader.result);
  }, false);
  reader.readAsDataURL(input);
});
window.importScript = importScript;
window.ElementBase = ElementBase;
window.define = define$1;
window.SelectorMixin = SelectorMixin;
window.RenderMixin = RenderMixin;

((base = HTMLElement) => {
  customElements.define('custom-svg-icon', class CustomSvgIcon extends base {

    /**
     * Attributes observer
     * @return {Array} ['icon']
     */
    static get observedAttributes() {
      return ['icon'];
    }

    /**
     * Iconset
     * @return {object} window.svgIconset
     * [checkout](svg-iconset.html) for more info.
     */
    get iconset() {
      return window.svgIconset
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
        this.__iconChanged__({value: value});
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
      this.attachShadow({mode: 'open'});
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
      this.icon = this.getAttribute('icon') || null;
      if (!super.render) this.render();
    }

    _onIconsetReady() {
      window.removeEventListener('svg-iconset-added', this._onIconsetReady);
      this.__iconChanged__({value: this.icon});
    }

    __iconChanged__(change) {
      if (!this.iconset) {
        window.addEventListener('svg-iconset-added', this._onIconsetReady);
        return;
      }
      if (change.value && this.iconset) {
        let parts = change.value.split('::');
        if (parts.length === 1) {
          this.iconset['icons'].host.applyIcon(this, change.value);
        } else if (this.iconset[parts[0]]) {
          this.iconset[parts[0]].host.applyIcon(this, parts[1]);
        }
      } else if(!change.value && this.iconset && this._icon) {
        let parts = this._icon.split('::');
        if (parts.length === 1) {
          this.iconset['icons'].host.removeIcon(this);
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
      if (oldValue !== newValue) this[name] = newValue;
    }
  });
})();

/**
 * @extends HTMLElement
 */
class CustomPages extends SelectMixin(HTMLElement) {
  constructor() {
    super();
    this.slotchange = this.slotchange.bind(this);
    this.attachShadow({mode: 'open'});
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
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.slotchange);
  }

  isEvenNumber(number) {
    return Boolean(number % 2 === 0)
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
          child.classList.add('animate-down');
        } else {
          child.classList.add('animate-up');
        }
        this.dispatchEvent(new CustomEvent('child-change', {detail: child}));
      }
    }
  }
}customElements.define('custom-pages', CustomPages);

define$1(class CustomTabs extends RenderMixin(SelectorMixin(HTMLElement)) {
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

define$1(class CustomTab extends RenderMixin(HTMLElement) {
  constructor() {
    super();
    this._onMouseIn = this._onMouseIn.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseover', this._onMouseIn);
    this.addEventListener('mouseout', this._onMouseOut);
  }

  disconnected() {
    this.removeEventListener('mouseover', this._onMouseIn);
    this.removeEventListener('mouseout', this._onMouseOut);
  }

  _onMouseIn() {
    this.classList.add('over');
  }

  _onMouseOut() {
    this.classList.remove('over');
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

const define  = klass => customElements.define('custom-selector', klass);
define(class CustomSelector extends SelectorMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = '<slot></slot>';
  }
});

customElements.define('custom-drawer', class CustomDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
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

var nl = {
	between: "tussen",
	content: "inhoud",
	description: "omschrijving",
	products: "producten",
	name: "naam",
	order: "bestelling",
	orders: "bestellingen",
	stock: "veldoverzicht",
	stockCount: "voorraad",
	payment: "betaling",
	price: "prijs",
	packageCount: "in pakketten",
	info: "info",
	collections: "afhalingen",
	collection: "afhaling",
	portion: "portie",
	image: "afbeelding",
	"collection times": "afhaalmomenten",
	"collection time": "afhaalmoment",
	"delivery times": "leveringmomenten",
	tuesday: "dinsdag",
	friday: "vrijdag",
	"quick-order": "snelle bestelling",
	directions: "routebeschrijving",
	"location information": "locatie informatie",
	"last edit": "laatst gewijzigd",
	ago: "geleden",
	catalog: "catalogus",
	categories: "categorieën",
	offers: "aanbiedingen",
	"payment method": "betalingswijze",
	selfservice: "zelfbediening",
	completed: "voltooid",
	transaction: "transactie",
	total: "totaal"
};
var translations = {
	nl: nl
};

const translate = (string, language = 'nl') => {
  const translation = translations[language][string];
  return translation || string;
};

(() => window.translate = translate)();

define$1(class TranslatedString extends ElementBase {
  static get attributeChangedCallback() {
    return ['value'];
  }
  set value(value) {
    this.setAttribute('value', value);
    this.innerHTML = this.translate(this.value);
  }
  get value() {
    return this.getAttribute('value');
  }
  constructor() {
    super();
  }
  attributeChangedCallback(name, old, value) {
    if (old !== value) this[name] = value;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.value && this.innerHTML) this.value = this.innerHTML;
  }
  translate(string) {
    return window.translate(string.toLowerCase());
  }
});

let Store$2 = class Store {
    constructor(dbName = 'keyval-store', storeName = 'keyval') {
        this.storeName = storeName;
        this._dbp = new Promise((resolve, reject) => {
            const openreq = indexedDB.open(dbName, 1);
            openreq.onerror = () => reject(openreq.error);
            openreq.onsuccess = () => resolve(openreq.result);
            // First time setup: create an empty object store
            openreq.onupgradeneeded = () => {
                openreq.result.createObjectStore(storeName);
            };
        });
    }
    _withIDBStore(type, callback) {
        return this._dbp.then(db => new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, type);
            transaction.oncomplete = () => resolve();
            transaction.onabort = transaction.onerror = () => reject(transaction.error);
            callback(transaction.objectStore(this.storeName));
        }));
    }
};
let store;
function getDefaultStore() {
    if (!store)
        store = new Store$2();
    return store;
}
function get$2(key, store = getDefaultStore()) {
    let req;
    return store._withIDBStore('readonly', store => {
        req = store.get(key);
    }).then(() => req.result);
}
function set$2(key, value, store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.put(value, key);
    });
}
function del$1(key, store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.delete(key);
    });
}
function clear(store = getDefaultStore()) {
    return store._withIDBStore('readwrite', store => {
        store.clear();
    });
}
function keys$2(store = getDefaultStore()) {
    const keys = [];
    return store._withIDBStore('readonly', store => {
        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // And openKeyCursor isn't supported by Safari.
        (store.openKeyCursor || store.openCursor).call(store).onsuccess = function () {
            if (!this.result)
                return;
            keys.push(this.result.key);
            this.result.continue();
        };
    }).then(() => keys);
}

var idb = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Store: Store$2,
    clear: clear,
    del: del$1,
    get: get$2,
    keys: keys$2,
    set: set$2
});

const { Store: Store$1, set: set$1, get: get$1, del, keys: keys$1 } = idb;

class OADB {
  constructor(ref) {
    this.sync = this.sync.bind(this);
    this.remove = this.remove.bind(this);
    
    this.name = ref;   
    window.addEventListener('online', function(e) {
      console.log('online');
      // Re-sync data with server.
    }, false);

    window.addEventListener('offline', function(e) {
      console.log('offline');
      // Queue up events for server.
    }, false);

    if (this.isOnline()) {
      this.init();
    }

    // listen onlinse
    // if (!this.ref) this.init()
    // this.sync()
  }

  isOnline() {
    return navigator.onLine;
  }

  async init() {
    this.store = await new Store$1(`odb-${this.name}`, this.name);
    this.localStore = await new Store$1(`odb-local-${this.name}`, this.name);
    this.ref = firebase.database().ref(this.name);
    
    
    await this.sync();
    this.ref.on('child_removed', this.remove);
    this.ref.on('child_changed', this.sync);
    this.ref.on('child_added', (snap) => {      
      pubsub.publish(`${this.name}.added`, snap.key);
    });
    
  }
  
  async remove(snap) {
    pubsub.publish(`${this.name}.remove`, snap.key);
    await del(snap.key, this.store);
  }

  async sync(data) {    
    // if (this.ref && this.isOnline()) {
    //   const localKeys = await keys(this.localStore)
    //   data = await this.ref.once('value');
    //   data = data.val();
    // 
    //   if (data) for (const key of Object.keys(data)) {
    //     console.log(key);
    //     const local = await get(key, this.localStore);
    //     console.log({local});
    //     if (!local && data[key].timestamp) {
    //       const current = await get(key, this.store);
    //       if (!current) await set(key, data[key], this.store);
    //       else {
    //         // if (data[key].timestamp !== current.timestamp) {
    //         //   if (data[key].timestamp > current.timestamp) {
    //             await set(key, data[key], this.store)
    //         //   }
    //         // }              
    //       }
    //     }  
    //     if (local && local.timestamp > data[key].timestamp) {
    //       await firebase.database().ref(`${this.name}/${key}`).set(local);
    //       await remove(key, this.localStore);
    //     }
    //   }
    // }
    if (this.ref && this.isOnline()) {
      data = await this.ref.once('value');
      data = data.val();
      if (data) {
        for (const key of Object.keys(data)) {
          const current = await get$1(key, this.store);
          if (!current) await set$1(key, data[key], this.store);
          else if (data[key].timestamp > current.timestamp) {
            await set$1(key, data[key], this.store);
          }
        }
        
        
        const dataKeys = await keys$1(this.store);
        if (dataKeys && dataKeys.length > 0) for (const key of dataKeys) {
          if (!data[key]) await del(key, this.store);
        }
      } else {
        const dataKeys = await keys$1(this.store);
        if (dataKeys && dataKeys.length > 0) for (const key of dataKeys) {
          await del(key, this.store);
        }
      }      
    }
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

  async set(child, value) {
    if (child) {
      return await set$1(child, value, this.store);
    }
    const promises = [];
    
    for (const key of Object.keys(value)) {
      promises.push(set$1(key, value[key], this.store));
    }
    return Promise.all(promises);
  }

  get(child) {
    return new Promise(async (resolve, reject) => {
      const online = this.isOnline();
      let data = {};
      if (child) data = await get$1(child, this.store);
      else {
        const dataKeys = await keys$1(this.store);
        if (dataKeys && dataKeys.length > 0) for (const key of dataKeys) {
          data[key] = await get$1(key, this.store);
        }
      }
      if (data && Object.keys(data).length > 0) resolve(data);
      if (online && this.ref) {
        let snap;
        if (child) snap = await firebase.database().ref(`${this.name}/${child}`).once('value');
        else snap = await this.ref.once('value');
        snap = snap.val();
        if (!data && snap || data && Object.keys(data).length === 0 && snap) {
          resolve(snap);
          if (child) {
            await set$1(child, snap, this.store);
          }
          else {
            for (const key of Object.keys(snap)) {              
              await set$1(key, snap[key], this.store);
            }
          }
        } else if (snap && data && data.timestamp < snap.timestamp) {
            if (child) await set$1(child, snap, this.store);
            else {
              for (const key of Object.keys(snap)) {              
                await set$1(key, snap[key], this.store);
              }
            }
          
            document.dispatchEvent(new CustomEvent('storage-update', { detail: { child, snap } }));
          }
        }
        resolve();
    });
  }
}

const { Store, set, get, remove, keys } = idb;
console.log(idb);
/**
 * a trimmed version of OADB, only syncs the database to local.
 */
class OADBSync {
  constructor(ref) {
    console.log(this.isOnline());
    this.sync = this.sync.bind(this);
    this.name = ref;
    window.addEventListener('online', function(e) {
      console.log('online');
      // Re-sync data with server.
    }, false);

    window.addEventListener('offline', function(e) {
      console.log('offline');
      // Queue up events for server.
    }, false);

    if (this.isOnline()) {
      this.init();
    }

    // listen onlinse
    // if (!this.ref) this.init()
    // this.sync()
  }

  isOnline() {
    return navigator.onLine;
  }

  async init() {
    console.log(this.isOnline());
    this.store = await new Store(`odb-${this.name}`, this.name);
    this.ref = firebase.database().ref(this.name);
    
    
    await this.sync();
    this.ref.on('child_changed', this.sync);
  }

  async sync(data) { 
    if (this.ref && this.isOnline()) {
      data = await this.ref.once('value');
      data = data.val();
      for (const key of Object.keys(data)) {
        const current = await get(key, this.store);
        if (!current) await set(key, data[key], this.store);
        else if (data[key].timestamp > current.timestamp) {
          await set(key, data[key], this.store);
        }
      }
    }
  }
    
    
    // set('foo', 'bar', customStore);
    // await this.localStorage.set(data);
  

  async set(child, value) {
    if (child) {
      return await set(child, value, this.store);
    }
    const promises = [];
    
    for (const key of Object.keys(value)) {
      promises.push(set(key, value[key], this.store));
    }
    return Promise.all(promises);
  }

  get(child) {
    return new Promise(async (resolve, reject) => {
      const online = this.isOnline();
      console.log({online});
      let data = {};
      if (child) data = await get(child, this.store);
      else {
        const dataKeys = await keys(this.store);
        if (dataKeys && dataKeys.length > 0) for (const key of dataKeys) {
          data[key] = await get(key, this.store);
        }
      }
      if (data && Object.keys(data).length > 0) resolve(data);
      if (online && this.ref) {
        let snap;
        if (child) snap = await firebase.database().ref(`${this.name}/${child}`).once('value');
        else snap = await this.ref.once('value');
        snap = snap.val();
        if (!data && snap || data && Object.keys(data).length === 0 && snap) {
          resolve(snap);
          if (child) await set(child, snap, this.store);
          else {
            for (const key of Object.keys(snap)) {              
              await set(key, snap[key], this.store);
            }
          }
        } else if (snap && data && data.timestamp < snap.timestamp) {
            if (child) await set(child, snap, this.store);
            else {
              for (const key of Object.keys(snap)) {              
                await set(key, snap[key], this.store);
              }
            }
            document.dispatchEvent(new CustomEvent('storage-update', { detail: { child, snap } }));
          }
        }
      
      resolve();
    });
  }
}

let DB;
class OADBManager {
  /**
   * @param {boolean} sync - when false, pushes updates to server, otherwise just saves to local
   */
  constructor(sync = true) {
    if (typeof sync === 'boolean' && !sync) DB = OADB;
    else DB = OADBSync;
    /**
     * databases map
     */
    this.databases = new Map();
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
    if (db) return db;
    return null;
  }
}

class LittlePubSub {
    subscribers = {};
    verbose;
    constructor(verbose) {
        this.verbose = verbose;
    }
    _handleContext(handler, context) {
        if (typeof context === 'undefined') {
            context = handler;
        }
        return context;
    }
    hasSubscribers(event) {
        return this.subscribers[event] ? true : false;
    }
    subscribe(event, handler, context) {
        if (!this.hasSubscribers(event))
            this.subscribers[event] = { handlers: [], value: undefined };
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
}

customElements.define('flex-column', class FlexColumn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
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
    `
  }
});

customElements.define('flex-row', class FlexRow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
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
    `
  }
});

customElements.define('flex-one', class FlexOne extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 1;
      }
    </style>
    
    <slot></slot>`
  }
});

customElements.define('flex-two', class FlexTwo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 2;
      }
    </style>
    
    <slot></slot>`
  }
});

customElements.define('flex-three', class FlexThree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 3;
      }
    </style>
    
    <slot></slot>`
  }
});

customElements.define('flex-four', class FlexFour extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = this.template;
  }
  get template() {
    return `<style>
      :host {
        flex: 4;
      }
    </style>
    
    <slot></slot>`
  }
});

customElements.define('flex-wrap-around', class FlexWrapAround extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
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
    `
  }
});

customElements.define('flex-wrap-evenly', class FlexWrapEvenly extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
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
    `
  }
});

customElements.define('flex-wrap-between', class FlexWrapBetween extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
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
    `
  }
});

customElements.define('flex-container', class FlexContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.maxWidth = this.getAttribute('max-width') || 640;
    this.minWidth = this.getAttribute('min-width') || 320;
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
    `
  }
});

globalThis.pubsub = new LittlePubSub();
// import './top-products.js';
// import './top-orders.js';
// import './input-fields.js';
globalThis.migrate = () => __awaiter(void 0, void 0, void 0, function* () {
    let offers = yield firebase.database().ref('offers').once('value');
    const newOffers = {};
    let i = 0;
    for (const offer of offers) {
        newOffers[i] = offer;
        i++;
    }
});
var shell = define$1(class AdminShell extends ElementBase {
    get pages() {
        return this.querySelector('custom-pages');
    }
    get selector() {
        return this.shadowRoot.querySelector('custom-selector');
    }
    get drawer() {
        return this.shadowRoot.querySelector('custom-drawer');
    }
    get translatedTitle() {
        return this.shadowRoot.querySelector('translated-string[name="title"]');
    }
    set drawerOpened(value) {
        if (value)
            this.setAttribute('drawer-opened', '');
        else
            this.removeAttribute('drawer-opened');
    }
    get drawerOpened() {
        return this.hasAttribute('drawer-opened');
    }
    get menuIcon() {
        return this.shadowRoot.querySelector('.menu');
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
        window.topstore.upgrade = (target) => __awaiter(this, void 0, void 0, function* () {
            const url = 'http://localhost:5000/topveldwinkel/us-central1/api/add/offer';
            let offers = yield firebase.database().ref('offers').once('value');
            offers = offers.val();
            for (const o of Object.keys(offers)) {
                let value = yield firebase.database().ref(`offerDisplay/${o}`).once('value');
                value = value.val();
                const body = JSON.stringify(Object.assign(Object.assign({}, value), offers[o]));
                const options = {
                    method: 'POST',
                    body,
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' }
                };
                yield fetch(url, options);
            }
        });
    }
    connectedCallback() {
        super.connectedCallback();
        if (matchMedia('(min-width: 720px)').matches)
            this.drawerOpened = true;
        document.addEventListener('mouseup', e => {
            if (matchMedia('(max-width: 641px)').matches && this.drawerOpened && !e.path[0].hasAttribute('subber'))
                this.drawerOpened = false;
        });
        this.translatedTitle.value = this.selector.selected;
        this.selector.addEventListener('selected', this._selectorChange);
        this.menuIcon.addEventListener('click', this._menuClick);
        globalThis.adminGo = (view, selection) => __awaiter(this, void 0, void 0, function* () {
            console.log(selection, view);
            if (selection && view === 'product') {
                yield import('./top-product-c6a2936f.js');
                const product = document.querySelector('top-product');
                product.value = selection;
            }
            else if (selection && view === 'offer') {
                yield import('./sections/top-offer.js');
                const offer = document.querySelector('top-offer');
                offer.value = selection;
            }
            else if (selection && view === 'order') {
                yield import('./top-order-f759997e.js');
                const order = document.querySelector('top-order');
                order.value = selection;
            }
            else if (view === 'add-product' || view === 'add-offer') {
                yield import(`./${view}.js`);
            }
            else if (view === 'collection') {
                yield import('./top-collection-dfc23d71.js');
                const collection = document.querySelector('top-collection');
                collection.value = selection;
            }
            else if (view === 'settings') {
                yield import('./settings-b4875e56.js');
                document.querySelector('settings-section');
                // collection.value = selection;
            }
            history.pushState({ selected: view }, view, `#${view}`);
            this.pages.select(view);
        });
        if (window.location.hash) {
            let route = window.location.hash.split('#');
            route = route[1].split('?');
            this.selector.select(route[0]);
            if (route[1]) {
                const parts = route[1].split('=');
                this.pages.querySelector(`[route="${route[0]}"]`).value = parts[1];
                globalThis.adminGo(route[0], parts[1]);
            }
            else {
                globalThis.adminGo(route[0]);
            }
        }
        else {
            this.selector.select('orders');
        }
        this._selectorChange();
        this._preload();
    }
    _preload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('loaded');
        });
    }
    _onPopstate() {
        console.log('pop');
        if (history.state)
            this.selector.select(history.state.selected);
        this._selectorChange();
    }
    _menuClick() {
        this.drawerOpened = !this.drawerOpened;
    }
    _selectorChange() {
        return __awaiter(this, void 0, void 0, function* () {
            const selected = this.selector.selected;
            if (selected) {
                const prefix = './';
                if (selected === 'products')
                    yield import(`${prefix}top-products.js`);
                if (selected === 'sheet')
                    yield import(`${prefix}top-sheet.js`);
                if (selected === 'offers')
                    yield import(`${prefix}top-offers.js`);
                if (selected === 'orders')
                    yield import(`${prefix}top-orders.js`);
                if (selected === 'collections')
                    yield import(`${prefix}top-collections.js`);
                if (selected === 'categories')
                    yield import(`${prefix}top-categories.js`);
                if (selected === 'catalog' || selected === 'offers' ||
                    selected === 'products' || selected === 'categories') {
                    let items = Array.from(this.shadowRoot.querySelectorAll('[menu-item="catalog"]'));
                    items = [...items, this.shadowRoot.querySelector('[data-route="catalog"]')];
                    if (selected === 'catalog') {
                        if (items[0].hasAttribute('shown')) {
                            for (const item of items) {
                                item.removeAttribute('shown');
                            }
                        }
                        else {
                            for (const item of items) {
                                item.setAttribute('shown', '');
                            }
                        }
                    }
                    else {
                        for (const item of items) {
                            item.setAttribute('shown', '');
                        }
                    }
                }
                if (selected !== 'catalog') {
                    this.translatedTitle.value = selected;
                    this.pages.select(selected);
                    history.pushState({ selected }, selected, `#${selected}`);
                }
            }
        });
    }
    get template() {
        return html `
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

export { ElementBase as E, __decorate as _, define$1 as d, shell as s };
