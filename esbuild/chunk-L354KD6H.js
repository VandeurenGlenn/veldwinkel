// node_modules/@vandeurenglenn/custom-date/custom-date.js
var custom_date_default = customElements.define("custom-date", class CustomDate extends HTMLElement {
  static get observedAttributes() {
    return ["day", "month", "year", "date", "value", "lang"];
  }
  get months() {
    return ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  }
  get days() {
    if (this.lang === "nl")
      return ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  }
  set lang(value) {
    this._lang = value;
    this.render();
  }
  get lang() {
    return this._lang;
  }
  set value(value) {
    this._value = value;
    this.setAttribute("value", value);
    const date = new Date(Number(value));
    this.day = date.getDay();
    this.date = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  }
  set day(value) {
    this._day = value;
    this.setAttribute("day", value);
  }
  set month(value) {
    this._month = value;
    this.setAttribute("month", value);
  }
  set date(value) {
    this._date = value;
    this.setAttribute("date", value);
  }
  set year(value) {
    this._year = value;
    this.setAttribute("year", value);
  }
  get day() {
    return this._day;
  }
  get month() {
    return this._month;
  }
  get date() {
    return this._date;
  }
  get year() {
    return this._year;
  }
  attributeChangedCallback(name, oldValue, value) {
    if (oldValue !== value && value) {
      this[name] = value;
      this.observer();
    }
  }
  next(day) {
    if (typeof day === "string")
      day = this.days.indexOf(day);
    const date = new Date(Number(this._value));
    if (day === date.getDay()) {
      this.value = date.setDate(date.getDate() - date.getDay() + 7 + day);
    } else {
      this.value = date.setDate(date.getDate() - date.getDay() + day);
    }
  }
  observer() {
    if (this.day && this.date && this.month && this.year) {
      this.render();
    }
  }
  render() {
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: flex;
        width: 140px;
      }
      .flex {
        flex: 1;
      }
      :host div, :host span {
        pointer-events: none;
      }
    </style>
    <div>${this.days[this.day]}</div>
    <span class="flex"></span>
    <div>${this.date}</div>
    -
    <div>${Number(this.month) + 1}</div>
    -
    <div>${this.year}</div>
    `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    if (!this.getAttribute("value")) {
      this.value = (/* @__PURE__ */ new Date()).getTime();
    }
  }
});
