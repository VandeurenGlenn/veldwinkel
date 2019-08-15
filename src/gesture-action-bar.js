export default customElements.define('gesture-action-bar', class GestureActionBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
<style>
  :host {
    z-index: 100;
    display: flex;
    flex-direction: row;
    background: #4caf50;
    box-sizing: border-box;
    
    --gesture-action-bar-height: 48px;
    --gesture-action-bar-width: 100%;
    --gesture-action-bar-padding: 12px 12px;
    
    height: var(--gesture-action-bar-height);
    width: var(--gesture-action-bar-width);
    padding: var(--gesture-action-bar-padding);
    border-top: 1px solid rgba(0, 0, 0, 0.14);
  }
  .fab-container {
    margin-top: -2%;
    height: 64px;
    width: 158px;
    border-radius: 34px;
    background: #fff;
    justify-content: center;
    display: flex;
  }
  .flex {
    flex: 1;
  }
  ::slotted([slot="action"]) {
    max-width: calc(100% - 24px);
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 480px) {
    :host {
      --gesture-action-bar-height: 56px;
      --gesture-action-bar-padding: 16px;
    }
  }
  @media (min-width: 720px) {
    :host {
      --gesture-action-bar-width: 720px;
    }
  }
</style>
<slot name="actions-left"></slot>
<span class="flex"></span>
<span class="fab-container">
  <slot name="action"></slot>
</span>
<span class="flex"></span>
<slot name="actions-right"></slot>
    `;
  }
})