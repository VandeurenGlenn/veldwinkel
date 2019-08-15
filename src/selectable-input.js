export default define(class SelectableInput extends ElementBase {
  static get observedAttributes() {
    return ['type', 'name', 'placeholder'];
  }

  set opened(value) {
    if (value) {
      const { left, right, top, bottom } = this.getBoundingClientRect();
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        this.selector.style.left = '50%';
        this.selector.style.top = '50%';
        this.selector.style.transform = 'translate(-50%, -50%)';
      } else {
        this.selector.style.left = `${left}px`;
        this.selector.style.top = `${top}px`;
        this.selector.style.transform = '';
      }

      this.setAttribute('opened', '');
      this._dropDownEl.setAttribute('icon', 'arrow-drop-up');
    } else {
      this.removeAttribute('opened');
      this._dropDownEl.setAttribute('icon', 'arrow-drop-down');
    }
  }
  get opened() {
    return this.hasAttribute('opened');
  }
  get _inputEl() {
    return this.shadowRoot.querySelector('custom-input');
  }

  get _dropDownEl() {
    return this.shadowRoot.querySelector('.drop');
  }
  constructor() {
    super();
    this._onDropDownClick = this._onDropDownClick.bind(this);
  }

  get selector() {
    return this.shadowRoot.querySelector('custom-selector');
  }

  add(el) {
    this.selector.appendChild(el);
  }

  remove(el) {
    this.selector.removeChild(el);
  }

  attributeChangedCallback(name, old, value) {
    if (this.rendered && old !== value) this._inputEl.setAttribute(name, value);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this._inputEl.setAttribute('name', this.getAttribute('name'));
    this._inputEl.setAttribute('type', this.getAttribute('type') || 'text');
    this._inputEl.setAttribute('placeholder', this.getAttribute('placeholder'));
    this._dropDownEl.addEventListener('click', this._onDropDownClick);
  }

  _onDropDownClick() {
    this.opened = !this.opened;
  }

  get template() {
    return html `
<style>
  :host {
    mixin(--css-column)
    width: 100%;
  }
  custom-selector {
    mixin(--css-column)
    position: fixed;
    opacity: 0;
    pointer-events: none;
    transform: scale(0);
    background: #fff;
  }
  :host([opened]) custom-selector {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
    z-index: 100;
  }
</style>
<custom-input>
  <custom-svg-icon icon="arrow-drop-down" slot="after" class="drop"></custom-svg-icon>
</custom-input>
<custom-selector></custom-selector>
    `;
  }
});
