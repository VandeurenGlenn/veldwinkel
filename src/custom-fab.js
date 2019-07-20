export default customElements.define('custom-fab', class CustomFab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
<style>
  :host {
    display: block;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 56px;
    width: var(--custom-fab-width, 56px);
  }
</style>

<slot></slot>`;
  }
})