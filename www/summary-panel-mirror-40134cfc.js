import{d as t}from"./selector-mixin-ac7e516c.js";import{E as e}from"./base-e9eb045d.js";import"./select-mixin-bf4ecf3c.js";export default t(class SummaryPanelMirror extends e{constructor(){super(),this._matches=this._matches.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback();const t=window.matchMedia("(min-width: 1200px)");this._matches(t),t.addListener(this._matches)}_matches({matches:t}){console.log({matches:t});const e=this.querySelector('[slot="left"]'),s=this.querySelector('[slot="right"]');t?s.hasAttribute("switched")&&(e.removeAttribute("switched"),e.setAttribute("slot","right"),s.setAttribute("slot","left")):(e.setAttribute("switched",""),e.setAttribute("slot","right"),s.setAttribute("slot","left"))}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 400px;
    max-width: 1200px;
  }

  .desktop, .mobile {
    opacity: 0;
  }

  [if] {
    opacity: 1;
  }

  @media(min-width: 1200px) {
    :host {
      flex-direction: row;
      width: 80%;
    }
  }
</style>
<slot name="left"></slot>
<slot name="right"></slot>
    `}});
