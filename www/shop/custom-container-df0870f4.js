import{d as t,E as e}from"./base-8131728b.js";t(class CustomContainer extends e{constructor(){super()}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 24px 24px 48px;
  }
  :host([row]) {
    flex-direction: column;
  }
  @media (min-width: 640px) {
    ::slotted(*) {
      max-width: 640px;
    }
  }
</style>
<slot></slot>
    `}});
