import{d as e,R as t}from"./selector-mixin-ac7e516c.js";import{E as s}from"./base-e9eb045d.js";import"./select-mixin-bf4ecf3c.js";e(class CustomTab extends(t(HTMLElement)){constructor(){super(),this._onMouseIn=this._onMouseIn.bind(this),this._onMouseOut=this._onMouseOut.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseover",this._onMouseIn),this.addEventListener("mouseout",this._onMouseOut)}disconnected(){this.removeEventListener("mouseover",this._onMouseIn),this.removeEventListener("mouseout",this._onMouseOut)}_onMouseIn(){this.classList.add("over")}_onMouseOut(){this.classList.remove("over")}get template(){return html`
    <style>
      :host {
        position: relative;
        display: inline-flex;
        width: 148px;
        height: 48px;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        box-sizing: border-box;
        cursor: pointer;

        --svg-icon-size: 16px;
        --svg-icon-color: #EEE;
      }

      :host(.custom-selected) {
        border-bottom: 2px solid #00B8D4;
      }
    </style>
    <slot></slot>
    `}});export default e(class TranslatedTab extends s{set text(e){this.render({text:e})}constructor(){super()}connectedCallback(){super.connectedCallback(),this.text=this.innerHTML}get template(){return html`
    <style>
      :host {
        position: relative;
        display: inline-flex;
        width: 118px;
        height: 48px;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        box-sizing: border-box;
        cursor: pointer;
        --svg-icon-size: 16px;
        --svg-icon-color: #EEE;
        user-select: none;
      }
      :host(.custom-selected) {
        border-bottom: 2px solid #00B8D4;
      }
      custom-tab {
        pointer-events: none;
        text-transform: uppercase;
      }
    </style>
<custom-tab>
  ${"text"}
</custom-tab>
    `}});
