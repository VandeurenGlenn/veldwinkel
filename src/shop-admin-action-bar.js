export default customElements.define('shop-admin-action-bar', class ShopAdminActionBar extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({mode: 'open'})
    
    this.shadowRoot.innerHTML = this.template
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: row;
        height: 72px;
        box-sizing: border-box;
        padding: 24px;
        width: 100%;
        max-width: 640px;
      }
      .flex {
        flex: 1;
      }

      [public] {
        --svg-icon-color: #4caf50;
      }
    </style>
    
    <custom-svg-icon icon="delete"></custom-svg-icon>
    <span class="flex"></span>
    <custom-svg-icon icon="public"></custom-svg-icon>
    `
  }
});