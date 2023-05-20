import {
  e,
  s,
  x
} from "./chunk-PN6JKJND.js";
import {
  __async,
  __decorateClass
} from "./chunk-DZ5PPEG7.js";

// src/admin/elements/input-fields/input-fields.ts
var InputFields = class extends s {
  static get observedAttributes() {
    return ["fields"];
  }
  constructor() {
    super();
  }
  set fields(value) {
    if (typeof value === "string")
      value = JSON.parse(value);
    if (this.rendered) {
      this._fields = value;
      if (value) {
        for (let field of value) {
          if (!Array.isArray(field))
            field = [field];
          const input = document.createElement("custom-input");
          this.appendChild(input);
          input.setAttribute("name", field[0]);
          if (field[1])
            input.setAttribute("value", field[1]);
        }
      }
    }
  }
  get fields() {
    return this._fields;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.fields)
      this.fields = this.getAttribute("fields");
  }
  attributeChangedCallback(name, old, value) {
    if (old !== value)
      this[name] = value;
  }
  get template() {
    return x`
<style>

</style>
<slot></slot>
<span class="row">
  <custom-svg-icon icon="close"></custom-svg-icon>
  <span class="flex"></span>
  <custom-svg-icon icon="done"></custom-svg-icon>
</span>`;
  }
};
InputFields = __decorateClass([
  e("input-field")
], InputFields);

// src/admin/sections/settings.js
var settings_default = customElements.define("settings-section", class SettingsSection extends HTMLElement {
  get settings() {
    return window.topstore.databases.get("settings");
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.template;
  }
  connectedCallback() {
    (() => __async(this, null, function* () {
      const settings = yield this.settings.get();
      for (const key of Object.keys(settings)) {
        for (var _key of Object.keys(settings[key])) {
          for (var __key of Object.keys(settings[key][_key])) {
            if (key === "hours") {
              const items = Array.from(this.shadowRoot.querySelectorAll(`[key=${_key}]`));
              for (const item of items) {
                if (item.name === `${__key}/from`)
                  item.value = settings[key][_key][__key].from;
                if (item.name === `${__key}/to`)
                  item.value = settings[key][_key][__key].to;
              }
            }
          }
        }
      }
    }))();
    pubsub.subscribe("settings.hours", ({ key, name, value }) => {
      firebase.database().ref(`settings/hours/${key}/${name}`).set(value);
    });
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
      }
      
      .row {
        display: flex;
      }
    </style>
    
    <h3><translated-string>collection times</translated-string></h3>    
    <span class="row">
      <input-field key="pickup" name="tuesday/from" event="settings.hours"></input-field>
      <input-field key="pickup" name="tuesday/to" event="settings.hours"></input-field>
    </span>
    <span class="row">
    <input-field key="pickup" name="friday/from" event="settings.hours"></input-field>
    <input-field key="pickup" name="friday/to" event="settings.hours"></input-field>
    </span>
    
    <h3><translated-string>selfservice</translated-string></h3>
    <span class="row">
    <input-field key="selfservice" name="tuesday/from" event="settings.hours"></input-field>
    <input-field key="selfservice" name="tuesday/to" event="settings.hours"></input-field>
    </span>
    <span class="row">
    <input-field key="selfservice" name="friday/from" event="settings.hours"></input-field>
    <input-field key="selfservice" name="friday/to" event="settings.hours"></input-field>
    </span>
    `;
  }
});
export {
  settings_default as default
};
