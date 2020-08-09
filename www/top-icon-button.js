import{d as t}from"./selector-mixin-ac7e516c.js";import{E as e}from"./base-e9eb045d.js";import"./select-mixin-bf4ecf3c.js";((t=HTMLElement)=>{customElements.define("custom-svg-icon",class CustomSvgIcon extends t{static get observedAttributes(){return["icon"]}get iconset(){return window.svgIconset}set iconset(t){window.iconset=t}set icon(t){this.icon!==t&&(this._icon=t,this.__iconChanged__({value:t}))}get icon(){return this._icon}get template(){return"\n        <style>\n          :host {\n            width: var(--svg-icon-size, 24px);\n            height: var(--svg-icon-size, 24px);\n            display: inline-flex;\n            display: -ms-inline-flexbox;\n            display: -webkit-inline-flex;\n            display: inline-flex;\n            -ms-flex-align: center;\n            -webkit-align-items: center;\n            align-items: center;\n            -ms-flex-pack: center;\n            -webkit-justify-content: center;\n            justify-content: center;\n            position: relative;\n            vertical-align: middle;\n            fill: var(--svg-icon-color, #111);\n            stroke: var(--svg-icon-stroke, none);\n          }\n        </style>\n      "}constructor(){super(),this.attachShadow({mode:"open"}),this._onIconsetReady=this._onIconsetReady.bind(this)}render(){this.shadowRoot.innerHTML=this.template}connectedCallback(){this.icon=this.getAttribute("icon")||null,super.render||this.render()}_onIconsetReady(){window.removeEventListener("svg-iconset-added",this._onIconsetReady),this.__iconChanged__({value:this.icon})}__iconChanged__(t){if(this.iconset){if(t.value&&this.iconset){let e=t.value.split("::");1===e.length?this.iconset.icons.host.applyIcon(this,t.value):this.iconset[e[0]]&&this.iconset[e[0]].host.applyIcon(this,e[1])}else if(!t.value&&this.iconset&&this._icon){let t=this._icon.split("::");1===t.length?this.iconset.icons.host.removeIcon(this):this.iconset[t[0]].host.removeIcon(this)}this.iconset=this.iconset}else window.addEventListener("svg-iconset-added",this._onIconsetReady)}attributeChangedCallback(t,e,n){e!==n&&(this[t]=n)}})})();export default t(class TopIconButton extends e{get icon(){return this._icon}set icon(t){t!==this._icon&&(this._icon=t,this.setAttribute("icon",t),this.shadowRoot.querySelector("custom-svg-icon").setAttribute("icon",t))}constructor(){super()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.icon=this.getAttribute("icon")}get template(){return html`
    <style>
      :host {
        --top-icon-button-height: 54px;
        display: flex;
        flex-direction: row;
        height: var(--top-icon-button-height);
        user-select: none;
        border-radius: 30px;
        --svg-icon-color: #1B5E20;
        border-radius: 30px;
        border-bottom-left-radius: var(--top-icon-button-border-radius-left, 30px);
        border-bottom-right-radius: var(--top-icon-button-border-radius-right, 30px);
        overflow: hidden;
        pointer-events: auto;
        cursor: pointer;
      }
      button {
        display: flex;
        flex-direction: row;
        border-radius: 30px;
        border-bottom-left-radius: var(--top-icon-button-border-radius-left, 30px);
        border-bottom-right-radius: var(--top-icon-button-border-radius-right, 30px);
        padding: 10px 14px;
        width: 100%;
        background: transparent;
        align-items: center;
        box-sizing: border-box;
        outline: none;
        cursor: pointer;
        border-color: #8BC34A;
        color: var(--svg-icon-color);
        text-transform: uppercase;
        overflow: hidden;
        pointer-events: none;
      }
      custom-svg-icon {
        padding-right: 10px;
        width: calc(var(--top-icon-button-height) - 28px);
        height: calc(var(--top-icon-button-height) - 28px);
      }
    </style>


    <button>
      <custom-svg-icon></custom-svg-icon>
      <span style="flex: 1;"></span>
      <slot></slot>
    </button>
    `}});
