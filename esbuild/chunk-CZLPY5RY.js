import {
  ElementBase,
  define_default
} from "./chunk-JGNXSNDS.js";

// src/translations.json
var translations_default = {
  nl: {
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
    orders: "bestellingen",
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
    categories: "categorie\xEBn",
    offers: "aanbiedingen",
    "payment method": "betalingswijze",
    selfservice: "zelfbediening",
    completed: "voltooid",
    transaction: "transactie",
    total: "totaal"
  }
};

// src/translated-string.js
var translated_string_default = define_default(class TranslatedString extends ElementBase {
  static get attributeChangedCallback() {
    return ["value"];
  }
  set value(value) {
    this.setAttribute("value", value);
    this.innerHTML = this.translate(this.value);
  }
  get value() {
    return this.getAttribute("value");
  }
  constructor() {
    super();
  }
  attributeChangedCallback(name, old, value) {
    if (old !== value)
      this[name] = value;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.value && this.innerHTML)
      this.value = this.innerHTML;
  }
  translate(string) {
    return window.translate(string.toLowerCase());
  }
});

export {
  translations_default
};
