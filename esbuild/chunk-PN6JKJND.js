// node_modules/lit-html/lit-html.js
var t;
var i = window;
var s = i.trustedTypes;
var e = s ? s.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var o = "$lit$";
var n = `lit$${(Math.random() + "").slice(9)}$`;
var l = "?" + n;
var h = `<${l}>`;
var r = document;
var d = () => r.createComment("");
var u = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
var c = Array.isArray;
var v = (t4) => c(t4) || "function" == typeof (null == t4 ? void 0 : t4[Symbol.iterator]);
var a = "[ 	\n\f\r]";
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var w = (t4) => (i5, ...s5) => ({ _$litType$: t4, strings: i5, values: s5 });
var x = w(1);
var b = w(2);
var T = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var E = /* @__PURE__ */ new WeakMap();
var C = r.createTreeWalker(r, 129, null, false);
var P = (t4, i5) => {
  const s5 = t4.length - 1, l5 = [];
  let r4, d3 = 2 === i5 ? "<svg>" : "", u2 = f;
  for (let i6 = 0; i6 < s5; i6++) {
    const s6 = t4[i6];
    let e7, c4, v2 = -1, a3 = 0;
    for (; a3 < s6.length && (u2.lastIndex = a3, c4 = u2.exec(s6), null !== c4); )
      a3 = u2.lastIndex, u2 === f ? "!--" === c4[1] ? u2 = _ : void 0 !== c4[1] ? u2 = m : void 0 !== c4[2] ? (y.test(c4[2]) && (r4 = RegExp("</" + c4[2], "g")), u2 = p) : void 0 !== c4[3] && (u2 = p) : u2 === p ? ">" === c4[0] ? (u2 = null != r4 ? r4 : f, v2 = -1) : void 0 === c4[1] ? v2 = -2 : (v2 = u2.lastIndex - c4[2].length, e7 = c4[1], u2 = void 0 === c4[3] ? p : '"' === c4[3] ? $ : g) : u2 === $ || u2 === g ? u2 = p : u2 === _ || u2 === m ? u2 = f : (u2 = p, r4 = void 0);
    const w2 = u2 === p && t4[i6 + 1].startsWith("/>") ? " " : "";
    d3 += u2 === f ? s6 + h : v2 >= 0 ? (l5.push(e7), s6.slice(0, v2) + o + s6.slice(v2) + n + w2) : s6 + n + (-2 === v2 ? (l5.push(void 0), i6) : w2);
  }
  const c3 = d3 + (t4[s5] || "<?>") + (2 === i5 ? "</svg>" : "");
  if (!Array.isArray(t4) || !t4.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e ? e.createHTML(c3) : c3, l5];
};
var V = class {
  constructor({ strings: t4, _$litType$: i5 }, e7) {
    let h3;
    this.parts = [];
    let r4 = 0, u2 = 0;
    const c3 = t4.length - 1, v2 = this.parts, [a3, f2] = P(t4, i5);
    if (this.el = V.createElement(a3, e7), C.currentNode = this.el.content, 2 === i5) {
      const t5 = this.el.content, i6 = t5.firstChild;
      i6.remove(), t5.append(...i6.childNodes);
    }
    for (; null !== (h3 = C.nextNode()) && v2.length < c3; ) {
      if (1 === h3.nodeType) {
        if (h3.hasAttributes()) {
          const t5 = [];
          for (const i6 of h3.getAttributeNames())
            if (i6.endsWith(o) || i6.startsWith(n)) {
              const s5 = f2[u2++];
              if (t5.push(i6), void 0 !== s5) {
                const t6 = h3.getAttribute(s5.toLowerCase() + o).split(n), i7 = /([.?@])?(.*)/.exec(s5);
                v2.push({ type: 1, index: r4, name: i7[2], strings: t6, ctor: "." === i7[1] ? k : "?" === i7[1] ? I : "@" === i7[1] ? L : R });
              } else
                v2.push({ type: 6, index: r4 });
            }
          for (const i6 of t5)
            h3.removeAttribute(i6);
        }
        if (y.test(h3.tagName)) {
          const t5 = h3.textContent.split(n), i6 = t5.length - 1;
          if (i6 > 0) {
            h3.textContent = s ? s.emptyScript : "";
            for (let s5 = 0; s5 < i6; s5++)
              h3.append(t5[s5], d()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
            h3.append(t5[i6], d());
          }
        }
      } else if (8 === h3.nodeType)
        if (h3.data === l)
          v2.push({ type: 2, index: r4 });
        else {
          let t5 = -1;
          for (; -1 !== (t5 = h3.data.indexOf(n, t5 + 1)); )
            v2.push({ type: 7, index: r4 }), t5 += n.length - 1;
        }
      r4++;
    }
  }
  static createElement(t4, i5) {
    const s5 = r.createElement("template");
    return s5.innerHTML = t4, s5;
  }
};
function N(t4, i5, s5 = t4, e7) {
  var o6, n6, l5, h3;
  if (i5 === T)
    return i5;
  let r4 = void 0 !== e7 ? null === (o6 = s5._$Co) || void 0 === o6 ? void 0 : o6[e7] : s5._$Cl;
  const d3 = u(i5) ? void 0 : i5._$litDirective$;
  return (null == r4 ? void 0 : r4.constructor) !== d3 && (null === (n6 = null == r4 ? void 0 : r4._$AO) || void 0 === n6 || n6.call(r4, false), void 0 === d3 ? r4 = void 0 : (r4 = new d3(t4), r4._$AT(t4, s5, e7)), void 0 !== e7 ? (null !== (l5 = (h3 = s5)._$Co) && void 0 !== l5 ? l5 : h3._$Co = [])[e7] = r4 : s5._$Cl = r4), void 0 !== r4 && (i5 = N(t4, r4._$AS(t4, i5.values), r4, e7)), i5;
}
var S = class {
  constructor(t4, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    var i5;
    const { el: { content: s5 }, parts: e7 } = this._$AD, o6 = (null !== (i5 = null == t4 ? void 0 : t4.creationScope) && void 0 !== i5 ? i5 : r).importNode(s5, true);
    C.currentNode = o6;
    let n6 = C.nextNode(), l5 = 0, h3 = 0, d3 = e7[0];
    for (; void 0 !== d3; ) {
      if (l5 === d3.index) {
        let i6;
        2 === d3.type ? i6 = new M(n6, n6.nextSibling, this, t4) : 1 === d3.type ? i6 = new d3.ctor(n6, d3.name, d3.strings, this, t4) : 6 === d3.type && (i6 = new z(n6, this, t4)), this._$AV.push(i6), d3 = e7[++h3];
      }
      l5 !== (null == d3 ? void 0 : d3.index) && (n6 = C.nextNode(), l5++);
    }
    return o6;
  }
  v(t4) {
    let i5 = 0;
    for (const s5 of this._$AV)
      void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t4, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t4[i5])), i5++;
  }
};
var M = class {
  constructor(t4, i5, s5, e7) {
    var o6;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s5, this.options = e7, this._$Cp = null === (o6 = null == e7 ? void 0 : e7.isConnected) || void 0 === o6 || o6;
  }
  get _$AU() {
    var t4, i5;
    return null !== (i5 = null === (t4 = this._$AM) || void 0 === t4 ? void 0 : t4._$AU) && void 0 !== i5 ? i5 : this._$Cp;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === (null == t4 ? void 0 : t4.nodeType) && (t4 = i5.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i5 = this) {
    t4 = N(this, t4, i5), u(t4) ? t4 === A || null == t4 || "" === t4 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t4 !== this._$AH && t4 !== T && this._(t4) : void 0 !== t4._$litType$ ? this.g(t4) : void 0 !== t4.nodeType ? this.$(t4) : v(t4) ? this.T(t4) : this._(t4);
  }
  k(t4) {
    return this._$AA.parentNode.insertBefore(t4, this._$AB);
  }
  $(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.k(t4));
  }
  _(t4) {
    this._$AH !== A && u(this._$AH) ? this._$AA.nextSibling.data = t4 : this.$(r.createTextNode(t4)), this._$AH = t4;
  }
  g(t4) {
    var i5;
    const { values: s5, _$litType$: e7 } = t4, o6 = "number" == typeof e7 ? this._$AC(t4) : (void 0 === e7.el && (e7.el = V.createElement(e7.h, this.options)), e7);
    if ((null === (i5 = this._$AH) || void 0 === i5 ? void 0 : i5._$AD) === o6)
      this._$AH.v(s5);
    else {
      const t5 = new S(o6, this), i6 = t5.u(this.options);
      t5.v(s5), this.$(i6), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i5 = E.get(t4.strings);
    return void 0 === i5 && E.set(t4.strings, i5 = new V(t4)), i5;
  }
  T(t4) {
    c(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s5, e7 = 0;
    for (const o6 of t4)
      e7 === i5.length ? i5.push(s5 = new M(this.k(d()), this.k(d()), this, this.options)) : s5 = i5[e7], s5._$AI(o6), e7++;
    e7 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e7), i5.length = e7);
  }
  _$AR(t4 = this._$AA.nextSibling, i5) {
    var s5;
    for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i5); t4 && t4 !== this._$AB; ) {
      const i6 = t4.nextSibling;
      t4.remove(), t4 = i6;
    }
  }
  setConnected(t4) {
    var i5;
    void 0 === this._$AM && (this._$Cp = t4, null === (i5 = this._$AP) || void 0 === i5 || i5.call(this, t4));
  }
};
var R = class {
  constructor(t4, i5, s5, e7, o6) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e7, this.options = o6, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4, i5 = this, s5, e7) {
    const o6 = this.strings;
    let n6 = false;
    if (void 0 === o6)
      t4 = N(this, t4, i5, 0), n6 = !u(t4) || t4 !== this._$AH && t4 !== T, n6 && (this._$AH = t4);
    else {
      const e8 = t4;
      let l5, h3;
      for (t4 = o6[0], l5 = 0; l5 < o6.length - 1; l5++)
        h3 = N(this, e8[s5 + l5], i5, l5), h3 === T && (h3 = this._$AH[l5]), n6 || (n6 = !u(h3) || h3 !== this._$AH[l5]), h3 === A ? t4 = A : t4 !== A && (t4 += (null != h3 ? h3 : "") + o6[l5 + 1]), this._$AH[l5] = h3;
    }
    n6 && !e7 && this.j(t4);
  }
  j(t4) {
    t4 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t4 ? t4 : "");
  }
};
var k = class extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t4) {
    this.element[this.name] = t4 === A ? void 0 : t4;
  }
};
var H = s ? s.emptyScript : "";
var I = class extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t4) {
    t4 && t4 !== A ? this.element.setAttribute(this.name, H) : this.element.removeAttribute(this.name);
  }
};
var L = class extends R {
  constructor(t4, i5, s5, e7, o6) {
    super(t4, i5, s5, e7, o6), this.type = 5;
  }
  _$AI(t4, i5 = this) {
    var s5;
    if ((t4 = null !== (s5 = N(this, t4, i5, 0)) && void 0 !== s5 ? s5 : A) === T)
      return;
    const e7 = this._$AH, o6 = t4 === A && e7 !== A || t4.capture !== e7.capture || t4.once !== e7.once || t4.passive !== e7.passive, n6 = t4 !== A && (e7 === A || o6);
    o6 && this.element.removeEventListener(this.name, this, e7), n6 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    var i5, s5;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i5 = this.options) || void 0 === i5 ? void 0 : i5.host) && void 0 !== s5 ? s5 : this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var z = class {
  constructor(t4, i5, s5) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    N(this, t4);
  }
};
var j = i.litHtmlPolyfillSupport;
null == j || j(V, M), (null !== (t = i.litHtmlVersions) && void 0 !== t ? t : i.litHtmlVersions = []).push("2.7.2");
var B = (t4, i5, s5) => {
  var e7, o6;
  const n6 = null !== (e7 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e7 ? e7 : i5;
  let l5 = n6._$litPart$;
  if (void 0 === l5) {
    const t5 = null !== (o6 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o6 ? o6 : null;
    n6._$litPart$ = l5 = new M(i5.insertBefore(d(), t5), t5, void 0, null != s5 ? s5 : {});
  }
  return l5._$AI(t4), l5;
};

// node_modules/@lit/reactive-element/css-tag.js
var t2 = window;
var e2 = t2.ShadowRoot && (void 0 === t2.ShadyCSS || t2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s2 = Symbol();
var n2 = /* @__PURE__ */ new WeakMap();
var o2 = class {
  constructor(t4, e7, n6) {
    if (this._$cssResult$ = true, n6 !== s2)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4, this.t = e7;
  }
  get styleSheet() {
    let t4 = this.o;
    const s5 = this.t;
    if (e2 && void 0 === t4) {
      const e7 = void 0 !== s5 && 1 === s5.length;
      e7 && (t4 = n2.get(s5)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e7 && n2.set(s5, t4));
    }
    return t4;
  }
  toString() {
    return this.cssText;
  }
};
var r2 = (t4) => new o2("string" == typeof t4 ? t4 : t4 + "", void 0, s2);
var i2 = (t4, ...e7) => {
  const n6 = 1 === t4.length ? t4[0] : e7.reduce((e8, s5, n7) => e8 + ((t5) => {
    if (true === t5._$cssResult$)
      return t5.cssText;
    if ("number" == typeof t5)
      return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t4[n7 + 1], t4[0]);
  return new o2(n6, t4, s2);
};
var S2 = (s5, n6) => {
  e2 ? s5.adoptedStyleSheets = n6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet) : n6.forEach((e7) => {
    const n7 = document.createElement("style"), o6 = t2.litNonce;
    void 0 !== o6 && n7.setAttribute("nonce", o6), n7.textContent = e7.cssText, s5.appendChild(n7);
  });
};
var c2 = e2 ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e7 = "";
  for (const s5 of t5.cssRules)
    e7 += s5.cssText;
  return r2(e7);
})(t4) : t4;

// node_modules/@lit/reactive-element/reactive-element.js
var s3;
var e3 = window;
var r3 = e3.trustedTypes;
var h2 = r3 ? r3.emptyScript : "";
var o3 = e3.reactiveElementPolyfillSupport;
var n3 = { toAttribute(t4, i5) {
  switch (i5) {
    case Boolean:
      t4 = t4 ? h2 : null;
      break;
    case Object:
    case Array:
      t4 = null == t4 ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, i5) {
  let s5 = t4;
  switch (i5) {
    case Boolean:
      s5 = null !== t4;
      break;
    case Number:
      s5 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t4);
      } catch (t5) {
        s5 = null;
      }
  }
  return s5;
} };
var a2 = (t4, i5) => i5 !== t4 && (i5 == i5 || t4 == t4);
var l2 = { attribute: true, type: String, converter: n3, reflect: false, hasChanged: a2 };
var d2 = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t4) {
    var i5;
    this.finalize(), (null !== (i5 = this.h) && void 0 !== i5 ? i5 : this.h = []).push(t4);
  }
  static get observedAttributes() {
    this.finalize();
    const t4 = [];
    return this.elementProperties.forEach((i5, s5) => {
      const e7 = this._$Ep(s5, i5);
      void 0 !== e7 && (this._$Ev.set(e7, s5), t4.push(e7));
    }), t4;
  }
  static createProperty(t4, i5 = l2) {
    if (i5.state && (i5.attribute = false), this.finalize(), this.elementProperties.set(t4, i5), !i5.noAccessor && !this.prototype.hasOwnProperty(t4)) {
      const s5 = "symbol" == typeof t4 ? Symbol() : "__" + t4, e7 = this.getPropertyDescriptor(t4, s5, i5);
      void 0 !== e7 && Object.defineProperty(this.prototype, t4, e7);
    }
  }
  static getPropertyDescriptor(t4, i5, s5) {
    return { get() {
      return this[i5];
    }, set(e7) {
      const r4 = this[t4];
      this[i5] = e7, this.requestUpdate(t4, r4, s5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) || l2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t4 = Object.getPrototypeOf(this);
    if (t4.finalize(), void 0 !== t4.h && (this.h = [...t4.h]), this.elementProperties = new Map(t4.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t5 = this.properties, i5 = [...Object.getOwnPropertyNames(t5), ...Object.getOwnPropertySymbols(t5)];
      for (const s5 of i5)
        this.createProperty(s5, t5[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i5) {
    const s5 = [];
    if (Array.isArray(i5)) {
      const e7 = new Set(i5.flat(1 / 0).reverse());
      for (const i6 of e7)
        s5.unshift(c2(i6));
    } else
      void 0 !== i5 && s5.push(c2(i5));
    return s5;
  }
  static _$Ep(t4, i5) {
    const s5 = i5.attribute;
    return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
  }
  u() {
    var t4;
    this._$E_ = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t4 = this.constructor.h) || void 0 === t4 || t4.forEach((t5) => t5(this));
  }
  addController(t4) {
    var i5, s5;
    (null !== (i5 = this._$ES) && void 0 !== i5 ? i5 : this._$ES = []).push(t4), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t4.hostConnected) || void 0 === s5 || s5.call(t4));
  }
  removeController(t4) {
    var i5;
    null === (i5 = this._$ES) || void 0 === i5 || i5.splice(this._$ES.indexOf(t4) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t4, i5) => {
      this.hasOwnProperty(i5) && (this._$Ei.set(i5, this[i5]), delete this[i5]);
    });
  }
  createRenderRoot() {
    var t4;
    const s5 = null !== (t4 = this.shadowRoot) && void 0 !== t4 ? t4 : this.attachShadow(this.constructor.shadowRootOptions);
    return S2(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t4;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
      var i5;
      return null === (i5 = t5.hostConnected) || void 0 === i5 ? void 0 : i5.call(t5);
    });
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    var t4;
    null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
      var i5;
      return null === (i5 = t5.hostDisconnected) || void 0 === i5 ? void 0 : i5.call(t5);
    });
  }
  attributeChangedCallback(t4, i5, s5) {
    this._$AK(t4, s5);
  }
  _$EO(t4, i5, s5 = l2) {
    var e7;
    const r4 = this.constructor._$Ep(t4, s5);
    if (void 0 !== r4 && true === s5.reflect) {
      const h3 = (void 0 !== (null === (e7 = s5.converter) || void 0 === e7 ? void 0 : e7.toAttribute) ? s5.converter : n3).toAttribute(i5, s5.type);
      this._$El = t4, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
    }
  }
  _$AK(t4, i5) {
    var s5;
    const e7 = this.constructor, r4 = e7._$Ev.get(t4);
    if (void 0 !== r4 && this._$El !== r4) {
      const t5 = e7.getPropertyOptions(r4), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== (null === (s5 = t5.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t5.converter : n3;
      this._$El = r4, this[r4] = h3.fromAttribute(i5, t5.type), this._$El = null;
    }
  }
  requestUpdate(t4, i5, s5) {
    let e7 = true;
    void 0 !== t4 && (((s5 = s5 || this.constructor.getPropertyOptions(t4)).hasChanged || a2)(this[t4], i5) ? (this._$AL.has(t4) || this._$AL.set(t4, i5), true === s5.reflect && this._$El !== t4 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t4, s5))) : e7 = false), !this.isUpdatePending && e7 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return null != t4 && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t4;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t5, i6) => this[i6] = t5), this._$Ei = void 0);
    let i5 = false;
    const s5 = this._$AL;
    try {
      i5 = this.shouldUpdate(s5), i5 ? (this.willUpdate(s5), null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
        var i6;
        return null === (i6 = t5.hostUpdate) || void 0 === i6 ? void 0 : i6.call(t5);
      }), this.update(s5)) : this._$Ek();
    } catch (t5) {
      throw i5 = false, this._$Ek(), t5;
    }
    i5 && this._$AE(s5);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    var i5;
    null === (i5 = this._$ES) || void 0 === i5 || i5.forEach((t5) => {
      var i6;
      return null === (i6 = t5.hostUpdated) || void 0 === i6 ? void 0 : i6.call(t5);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    void 0 !== this._$EC && (this._$EC.forEach((t5, i5) => this._$EO(i5, this[i5], t5)), this._$EC = void 0), this._$Ek();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
d2.finalized = true, d2.elementProperties = /* @__PURE__ */ new Map(), d2.elementStyles = [], d2.shadowRootOptions = { mode: "open" }, null == o3 || o3({ ReactiveElement: d2 }), (null !== (s3 = e3.reactiveElementVersions) && void 0 !== s3 ? s3 : e3.reactiveElementVersions = []).push("1.6.1");

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends d2 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t4, e7;
    const i5 = super.createRenderRoot();
    return null !== (t4 = (e7 = this.renderOptions).renderBefore) && void 0 !== t4 || (e7.renderBefore = i5.firstChild), i5;
  }
  update(t4) {
    const i5 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = B(i5, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t4;
    super.connectedCallback(), null === (t4 = this._$Do) || void 0 === t4 || t4.setConnected(true);
  }
  disconnectedCallback() {
    var t4;
    super.disconnectedCallback(), null === (t4 = this._$Do) || void 0 === t4 || t4.setConnected(false);
  }
  render() {
    return T;
  }
};
s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s4 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.3.1");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var e4 = (e7) => (n6) => "function" == typeof n6 ? ((e8, n7) => (customElements.define(e8, n7), n7))(e7, n6) : ((e8, n7) => {
  const { kind: t4, elements: s5 } = n7;
  return { kind: t4, elements: s5, finisher(n8) {
    customElements.define(e8, n8);
  } };
})(e7, n6);

// node_modules/@lit/reactive-element/decorators/property.js
var i3 = (i5, e7) => "method" === e7.kind && e7.descriptor && !("value" in e7.descriptor) ? { ...e7, finisher(n6) {
  n6.createProperty(e7.key, i5);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e7.key, initializer() {
  "function" == typeof e7.initializer && (this[e7.key] = e7.initializer.call(this));
}, finisher(n6) {
  n6.createProperty(e7.key, i5);
} };
function e5(e7) {
  return (n6, t4) => void 0 !== t4 ? ((i5, e8, n7) => {
    e8.constructor.createProperty(n7, i5);
  })(e7, n6, t4) : i3(e7, n6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t3(t4) {
  return e5({ ...t4, state: true });
}

// node_modules/@lit/reactive-element/decorators/base.js
var o5 = ({ finisher: e7, descriptor: t4 }) => (o6, n6) => {
  var r4;
  if (void 0 === n6) {
    const n7 = null !== (r4 = o6.originalKey) && void 0 !== r4 ? r4 : o6.key, i5 = null != t4 ? { kind: "method", placement: "prototype", key: n7, descriptor: t4(o6.key) } : { ...o6, key: n7 };
    return null != e7 && (i5.finisher = function(t5) {
      e7(t5, n7);
    }), i5;
  }
  {
    const r5 = o6.constructor;
    void 0 !== t4 && Object.defineProperty(o6, n6, t4(n6)), null == e7 || e7(r5, n6);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function i4(i5, n6) {
  return o5({ descriptor: (o6) => {
    const t4 = { get() {
      var o7, n7;
      return null !== (n7 = null === (o7 = this.renderRoot) || void 0 === o7 ? void 0 : o7.querySelector(i5)) && void 0 !== n7 ? n7 : null;
    }, enumerable: true, configurable: true };
    if (n6) {
      const n7 = "symbol" == typeof o6 ? Symbol() : "__" + o6;
      t4.get = function() {
        var o7, t5;
        return void 0 === this[n7] && (this[n7] = null !== (t5 = null === (o7 = this.renderRoot) || void 0 === o7 ? void 0 : o7.querySelector(i5)) && void 0 !== t5 ? t5 : null), this[n7];
      };
    }
    return t4;
  } });
}

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n5;
var e6 = null != (null === (n5 = window.HTMLSlotElement) || void 0 === n5 ? void 0 : n5.prototype.assignedElements) ? (o6, n6) => o6.assignedElements(n6) : (o6, n6) => o6.assignedNodes(n6).filter((o7) => o7.nodeType === Node.ELEMENT_NODE);

export {
  i2 as i,
  x,
  T,
  A,
  s4 as s,
  e4 as e,
  e5 as e2,
  t3 as t,
  i4 as i2
};
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
