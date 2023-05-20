import {
  ProductEditorMixin
} from "./chunk-QT55UAXW.js";
import "./chunk-L354KD6H.js";
import {
  define_default
} from "./chunk-JGNXSNDS.js";
import {
  A,
  T,
  e,
  e2,
  i,
  i2,
  s,
  t,
  x
} from "./chunk-PN6JKJND.js";
import {
  __async,
  __decorateClass,
  __spreadProps,
  __spreadValues,
  __superGet
} from "./chunk-DZ5PPEG7.js";

// node_modules/tslib/tslib.es6.js
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i4 = decorators.length - 1; i4 >= 0; i4--)
      if (d = decorators[i4])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}

// node_modules/lit-html/directive.js
var t2 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e3 = (t3) => (...e4) => ({ _$litDirective$: t3, values: e4 });
var i3 = class {
  constructor(t3) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t3, e4, i4) {
    this._$Ct = t3, this._$AM = e4, this._$Ci = i4;
  }
  _$AS(t3, e4) {
    return this.update(t3, e4);
  }
  update(t3, e4) {
    return this.render(...e4);
  }
};

// node_modules/lit-html/directives/class-map.js
var o = e3(class extends i3 {
  constructor(t3) {
    var i4;
    if (super(t3), t3.type !== t2.ATTRIBUTE || "class" !== t3.name || (null === (i4 = t3.strings) || void 0 === i4 ? void 0 : i4.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t3) {
    return " " + Object.keys(t3).filter((i4) => t3[i4]).join(" ") + " ";
  }
  update(i4, [s2]) {
    var r, o2;
    if (void 0 === this.it) {
      this.it = /* @__PURE__ */ new Set(), void 0 !== i4.strings && (this.nt = new Set(i4.strings.join(" ").split(/\s/).filter((t3) => "" !== t3)));
      for (const t3 in s2)
        s2[t3] && !(null === (r = this.nt) || void 0 === r ? void 0 : r.has(t3)) && this.it.add(t3);
      return this.render(s2);
    }
    const e4 = i4.element.classList;
    this.it.forEach((t3) => {
      t3 in s2 || (e4.remove(t3), this.it.delete(t3));
    });
    for (const t3 in s2) {
      const i5 = !!s2[t3];
      i5 === this.it.has(t3) || (null === (o2 = this.nt) || void 0 === o2 ? void 0 : o2.has(t3)) || (i5 ? (e4.add(t3), this.it.add(t3)) : (e4.remove(t3), this.it.delete(t3)));
    }
    return T;
  }
});

// node_modules/@material/web/motion/animation.js
var EASING = {
  STANDARD: "cubic-bezier(0.2, 0, 0, 1)",
  STANDARD_ACCELERATE: "cubic-bezier(.3,0,1,1)",
  STANDARD_DECELERATE: "cubic-bezier(0,0,0,1)",
  EMPHASIZED: "cubic-bezier(.3,0,0,1)",
  EMPHASIZED_ACCELERATE: "cubic-bezier(.3,0,.8,.15)",
  EMPHASIZED_DECELERATE: "cubic-bezier(.05,.7,.1,1)"
};

// node_modules/@material/web/field/lib/field.js
var Field = class extends s {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.error = false;
    this.focused = false;
    this.populated = false;
    this.resizable = false;
    this.required = false;
    this.hasStart = false;
    this.hasEnd = false;
    this.isAnimating = false;
  }
  update(props) {
    if (this.disabled && this.focused) {
      props.set("focused", true);
      this.focused = false;
    }
    this.animateLabelIfNeeded({
      wasFocused: props.get("focused"),
      wasPopulated: props.get("populated")
    });
    super.update(props);
  }
  render() {
    const floatingLabel = this.renderLabel(
      /*isFloating*/
      true
    );
    const restingLabel = this.renderLabel(
      /*isFloating*/
      false
    );
    const outline = this.renderOutline?.(floatingLabel);
    const classes = {
      "disabled": this.disabled,
      "error": this.error && !this.disabled,
      "focused": this.focused,
      "with-start": this.hasStart,
      "with-end": this.hasEnd,
      "populated": this.populated,
      "resizable": this.resizable,
      "required": this.required,
      "no-label": !this.label
    };
    return x`
      <div class="field ${o(classes)}">
        <div class="container-overflow">
          ${outline}
          ${this.renderBackground?.()}
          ${this.renderIndicator?.()}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              ${restingLabel}
              ${outline ? A : floatingLabel}
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>

        <div class="supporting-text">
          <div class="supporting-text-start">
            <slot name="supporting-text"></slot>
          </div>
          <div class="supporting-text-end">
            <slot name="supporting-text-end"></slot>
          </div>
        </div>
      </div>
    `;
  }
  renderLabel(isFloating) {
    let visible;
    if (isFloating) {
      visible = this.focused || this.populated || this.isAnimating;
    } else {
      visible = !this.focused && !this.populated && !this.isAnimating;
    }
    const classes = {
      "hidden": !visible,
      "floating": isFloating,
      "resting": !isFloating
    };
    let labelText = this.label ?? "";
    labelText += this.required && labelText ? "*" : "";
    return x`
      <span class="label ${o(classes)}"
        aria-hidden=${!visible}
      >${labelText}</span>
    `;
  }
  animateLabelIfNeeded({ wasFocused, wasPopulated }) {
    if (!this.label) {
      return;
    }
    wasFocused ?? (wasFocused = this.focused);
    wasPopulated ?? (wasPopulated = this.populated);
    const wasFloating = wasFocused || wasPopulated;
    const shouldBeFloating = this.focused || this.populated;
    if (wasFloating === shouldBeFloating) {
      return;
    }
    this.isAnimating = true;
    this.labelAnimation?.cancel();
    this.labelAnimation = this.floatingLabelEl?.animate(this.getLabelKeyframes(), { duration: 150, easing: EASING.STANDARD });
    this.labelAnimation?.addEventListener("finish", () => {
      this.isAnimating = false;
    });
  }
  getLabelKeyframes() {
    const { floatingLabelEl, restingLabelEl } = this;
    if (!floatingLabelEl || !restingLabelEl) {
      return [];
    }
    const { x: floatingX, y: floatingY, height: floatingHeight } = floatingLabelEl.getBoundingClientRect();
    const { x: restingX, y: restingY, height: restingHeight } = restingLabelEl.getBoundingClientRect();
    const floatingScrollWidth = floatingLabelEl.scrollWidth;
    const restingScrollWidth = restingLabelEl.scrollWidth;
    const scale = restingScrollWidth / floatingScrollWidth;
    const xDelta = restingX - floatingX;
    const yDelta = restingY - floatingY + Math.round((restingHeight - floatingHeight * scale) / 2);
    const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
    const floatTransform = `translateX(0) translateY(0) scale(1)`;
    const restingClientWidth = restingLabelEl.clientWidth;
    const isRestingClipped = restingScrollWidth > restingClientWidth;
    const width = isRestingClipped ? `${restingClientWidth / scale}px` : "";
    if (this.focused || this.populated) {
      return [
        { transform: restTransform, width },
        { transform: floatTransform, width }
      ];
    }
    return [
      { transform: floatTransform, width },
      { transform: restTransform, width }
    ];
  }
  getSurfacePositionClientRect() {
    return this.containerEl.getBoundingClientRect();
  }
};
__decorate([
  e2({ type: Boolean }),
  __metadata("design:type", Object)
], Field.prototype, "disabled", void 0);
__decorate([
  e2({ type: Boolean }),
  __metadata("design:type", Object)
], Field.prototype, "error", void 0);
__decorate([
  e2({ type: Boolean }),
  __metadata("design:type", Object)
], Field.prototype, "focused", void 0);
__decorate([
  e2({ type: String }),
  __metadata("design:type", String)
], Field.prototype, "label", void 0);
__decorate([
  e2({ type: Boolean }),
  __metadata("design:type", Object)
], Field.prototype, "populated", void 0);
__decorate([
  e2({ type: Boolean }),
  __metadata("design:type", Object)
], Field.prototype, "resizable", void 0);
__decorate([
  e2({ type: Boolean }),
  __metadata("design:type", Object)
], Field.prototype, "required", void 0);
__decorate([
  e2({ type: Boolean }),
  __metadata("design:type", Object)
], Field.prototype, "hasStart", void 0);
__decorate([
  e2({ type: Boolean }),
  __metadata("design:type", Object)
], Field.prototype, "hasEnd", void 0);
__decorate([
  t(),
  __metadata("design:type", Object)
], Field.prototype, "isAnimating", void 0);
__decorate([
  i2(".label.floating"),
  __metadata("design:type", HTMLElement)
], Field.prototype, "floatingLabelEl", void 0);
__decorate([
  i2(".label.resting"),
  __metadata("design:type", HTMLElement)
], Field.prototype, "restingLabelEl", void 0);
__decorate([
  i2(".container"),
  __metadata("design:type", HTMLElement)
], Field.prototype, "containerEl", void 0);

// node_modules/@material/web/field/lib/outlined-field.js
var OutlinedField = class extends Field {
  renderOutline(floatingLabel) {
    return x`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${floatingLabel}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `;
  }
};

// node_modules/@material/web/field/lib/outlined-styles.css.js
var styles = i`:host{--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, 4px));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, 4px));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, 4px));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, 4px));--_container-padding-horizontal: var(--md-outlined-field-container-padding-horizontal, 16px);--_container-padding-vertical: var(--md-outlined-field-container-padding-vertical, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-type: var(--md-outlined-field-content-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 2px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, 1rem);--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, 0.75rem);--_label-text-type: var(--md-outlined-field-label-text-type, var(--md-sys-typescale-body-large, 400 1rem / 1.5rem var(--md-ref-typeface-plain, Roboto)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-padding: var(--md-outlined-field-supporting-text-padding, 16px);--_supporting-text-padding-top: var(--md-outlined-field-supporting-text-padding-top, 4px);--_supporting-text-type: var(--md-outlined-field-supporting-text-type, var(--md-sys-typescale-body-small, 400 0.75rem / 1rem var(--md-ref-typeface-plain, Roboto)));--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f))}.outline{border-color:var(--_outline-color);border-radius:inherit;color:var(--_outline-color);display:flex;pointer-events:none;height:100%;position:absolute;width:100%}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - 2*var(--_container-padding-horizontal));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .start{padding-inline-start:max(var(--_container-padding-horizontal),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .end{padding-inline-end:max(var(--_container-padding-horizontal),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}/*# sourceMappingURL=outlined-styles.css.map */
`;

// node_modules/@material/web/field/lib/shared-styles.css.js
var styles2 = i`:host{display:inline-flex}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;min-width:min-content;overflow:hidden;padding-top:var(--_container-padding-vertical);padding-bottom:var(--_container-padding-vertical);position:relative}.resizable .container{resize:both}.disabled{pointer-events:none}.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start,.with-end .end{min-width:48px}.with-start .start{margin-inline-end:4px}.with-end .end{margin-inline-start:4px}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;font:var(--_content-type);opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}.label{color:var(--_label-text-color);overflow:hidden;max-width:100%;pointer-events:none;text-overflow:ellipsis;white-space:nowrap;z-index:1;font:var(--_label-text-type)}.label.resting{position:absolute;top:50%;transform:translateY(-50%)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}.supporting-text{color:var(--_supporting-text-color);display:flex;justify-content:space-between;padding:0 var(--_supporting-text-padding);font:var(--_supporting-text-type)}.supporting-text-start,.supporting-text-end{display:flex}.supporting-text-start ::slotted(:not(:empty)),.supporting-text-end ::slotted(:not(:empty)){padding-top:var(--_supporting-text-padding-top)}.supporting-text-end ::slotted(:not(:empty)){padding-inline-start:var(--_supporting-text-padding)}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}/*# sourceMappingURL=shared-styles.css.map */
`;

// node_modules/@material/web/field/outlined-field.js
var MdOutlinedField = class MdOutlinedField2 extends OutlinedField {
};
MdOutlinedField.styles = [styles2, styles];
MdOutlinedField = __decorate([
  e("md-outlined-field")
], MdOutlinedField);

// src/admin/elements/input-fields/input-field.ts
var InputField = class extends s {
  get event() {
    return this.getAttribute("event") || "event.offers";
  }
  set event(value) {
    this.setAttribute("event", value);
  }
  set key(value) {
    this.setAttribute("key", value);
  }
  set ref(value) {
    this.setAttribute("ref", value);
  }
  get key() {
    return this.getAttribute("key");
  }
  get ref() {
    return this.getAttribute("ref");
  }
  connectedCallback() {
    return __async(this, null, function* () {
      __superGet(InputField.prototype, this, "connectedCallback").call(this);
      yield this.updateComplete;
      let timeout;
      this.shadowRoot.querySelector("input").addEventListener("input", () => {
        if (timeout)
          clearTimeout(timeout);
        timeout = setTimeout(() => {
          pubsub.publish(this.event, { type: "edit", key: this.key, name: this.name, value: this.value });
          timeout = false;
        }, 2e3);
      });
    });
  }
  render() {
    return x`<style>
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      
      input {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        border: 1px solid #38464e;

        padding: 12px 24px;
        box-sizing: border-box;
        border-radius: 12px;
        color: #fff;
        background: transparent;
      }
    </style>
    <h4><translated-string>${this.name}</translated-string></h4>
    <input type="text" value=${this.value} name=${this.name}>
    `;
  }
};
__decorateClass([
  e2({ type: String })
], InputField.prototype, "name", 2);
__decorateClass([
  e2({ type: String })
], InputField.prototype, "value", 2);
InputField = __decorateClass([
  e("input-field")
], InputField);

// src/admin/sections/top-offer.ts
var top_offer_default = define_default(class TopOffer extends ProductEditorMixin {
  get addFieldIcon() {
    return this.shadowRoot.querySelector('[icon="add"]');
  }
  constructor() {
    super();
    this.ref = "offers";
    this.addField = this.addField.bind(this);
  }
  connectedCallback() {
    if (super.connectedCallback)
      super.connectedCallback();
    this.addFieldIcon.addEventListener("click", this.addField);
    let timeout;
    pubsub.subscribe(`event.${this.ref}`, (_0) => __async(this, [_0], function* ({ value, name, key, type }) {
      if (type === "edit") {
        let ref;
        if (name === "name" || name === "price")
          ref = `offerDisplay/${key}/${name}`;
        else
          ref = `offers/${key}/${name}`;
        console.log(name, value);
        const offer = __spreadProps(__spreadValues(__spreadValues({}, window.offers[this._value]), window.offerDisplay[this._value]), { image: __spreadValues({}, window.images[this._value]) });
        offer[name] = value;
        yield firebase.database().ref(ref).set(value);
        const timestamp = (/* @__PURE__ */ new Date()).getTime();
        yield firebase.database().ref(`offers/${key}/timestamp`).set(timestamp);
        if (timeout)
          clearTimeout(timeout);
        timeout = setTimeout(() => {
          console.log("changeeeee");
          pubsub.publish(`event.${this.ref}`, { type: "change", key, value: offer });
          timeout = false;
        }, 2e3);
      }
    }));
  }
  addField() {
    return __async(this, null, function* () {
      const name = yield prompt("please enter field name");
      if (name) {
        const field = document.createElement("input-field");
        field.name = name;
        field.value = "";
        field.ref = "offers";
        field.key = this._value;
        this.appendChild(field);
      }
    });
  }
  stamp() {
    return __async(this, null, function* () {
      this.innerHTML = "";
      this.nails.clear();
      const offer = __spreadValues({}, window.offers[this._value]);
      let timeout;
      console.log(offer);
      for (const i4 of Object.keys(offer)) {
        if (i4 === "key") {
          const span = document.createElement("span");
          span.classList.add("key");
          span.setAttribute("slot", i4);
          span.innerHTML = `
        <h4><translated-string>SKU</translated-string></h4>
        <span class="flex"></span>
        ${offer[i4]}
        `;
          this.appendChild(span);
        } else if (i4 === "image" && offer[i4]) {
          let val = offer[i4];
          if (val)
            for (const key of Object.keys(val)) {
              if (val[key] && key !== "thumb" && key !== "thumbm" && key !== "placeholder")
                this.nails.add({ key, src: `https://guldentopveldwinkel.be/ipfs/${val[key]}` });
            }
        } else if (i4 === "public") {
          if (offer[i4])
            this.publicIcon.setAttribute("public", "");
        } else if (i4 === "timestamp") {
          const span = document.createElement("span");
          span.classList.add("timestamp");
          span.setAttribute("slot", i4);
          span.innerHTML = `
        <h4><translated-string>last edit</translated-string></h4>
        <span class="flex"></span>
        <custom-date lang="nl" value="${offer[i4]}">${new Date(offer[i4])}</custom-date>
        `;
          this.appendChild(span);
        } else {
          const field = document.createElement("input-field");
          field.name = i4;
          field.value = offer[i4];
          field.ref = "offers";
          field.key = this._value;
          this.appendChild(field);
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
    align-items: center;
  }

  custom-container {
    overflow-y: auto;
  }
  ::slotted(.column) {
    mixin(--css-column)
    width: 100%;
    min-height: 110px;
  }
  ::slotted(.timestamp) {
    mixin(--css-row)
    mixin(--css-center)
    width: 100%;
    height: 54px;
  }
  ::slotted(*.flex) {
    mixin(--css-flex)
  }
  .toolbar {
    height: 72px;
    box-sizing: border-box;
    padding: 24px;
    width: 100%;
    max-width: 640px;
  }
  [icon="add"] {
    margin-top: 24px;
  }
  .wrapper {
    display: flex;
    box-sizing: border-box;
    padding: 12px 24px 24px;
    width: 100%;
  }
  custom-svg-icon {
    cursor: pointer;
  }
  [public] {
    --svg-icon-color: #4caf50;
  }
  ::slotted(.key) {
    width: 100%;
    mixin(--css-row)
    mixin(--css-center)
  }
  apply(--css-row)
  apply(--css-center)
  apply(--css-flex)
</style>

<custom-container>  
  <slot name="timestamp"></slot>
  <slot name="key"></slot>
  <image-nails></image-nails>
  <slot></slot>
  <span class="wrapper">
    <span class="flex"></span>
    <custom-svg-icon icon="add" title="add info field"></custom-svg-icon>
    <span class="flex"></span>
  </span>
</custom-container>

<shop-admin-action-bar></shop-admin-action-bar>`;
  }
});
export {
  top_offer_default as default
};
/*! Bundled license information:

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/motion/animation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/lib/field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/lib/outlined-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/lib/outlined-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/field/lib/shared-styles.css.js:
  (**
    * @license
    * Copyright 2022 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    *)

@material/web/field/outlined-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
