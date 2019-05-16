define(class customSelectable extends ElementBase {
  constructor() {
    super();
  }
  get template() {
    return html`
<style>
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 6px;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
  }
  .icon {
    display: block;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: #888;
  }


</style>
<span class="icon"></span>
    `;
  }
});

export default define(class CustomPrompt extends ElementBase {
  get selector() {
    return this.shadowRoot.querySelector('custom-selector');
  }

  get pages() {
    return this.shadowRoot.querySelector('custom-pages');
  }

  constructor() {
    super();
    this._selected = this._selected.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    const slot = this.shadowRoot.querySelector('[name="pages"]').assignedNodes();
    const selectorSlot = this.shadowRoot.querySelector('[name="selctors"]').assignedNodes();
    if (selectorSlot.length === 0 && slot.length > 1) {
      for (let i = 0; i < slot.length; ++i) {
        const selector = document.createElement('span');
        selector.dataset.route = slot[i].dataset.route;
        selector.classList.add('selector-item');
        selectorSlot.appendChild(selector);
      }
    }

    this.selector.addEventListener('selected', this._selected);
  }

  _selected() {
    this.pages.select(this.selector.selected);
  }

  get template() {
    return html`
<style>
  :host {
    mixin(--css-column)

  }
  .selector-item {
    display: block;
    border: 1px solid #eee;
    border-radius: 50%;
    height: 12px;
    width: 12px;
  }
  .selector-item.custom-selected {
    background: #eee;
  }

  custom-selector {
    mixin(--css-row)
    mixin(--css-center)
    border-top: 1px solid #ddd;
  }
</style>

<custom-pages>
  <slot name="pages"></slot>
</custom-pages>

<custom-selector>
  <slot name="selectors" style="pointer-events: none;"></slot>
</custom-selector>
    `;
  }
});
