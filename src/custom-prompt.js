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
})

export default define(class CustomPrompt extends ElementBase {
  constructor() {
    super();
  }

  get template() {
    return html`
<style></style>

<custom-pages></custom-pages>
<custom-selector></custom-selector>
    `;
  }
})
