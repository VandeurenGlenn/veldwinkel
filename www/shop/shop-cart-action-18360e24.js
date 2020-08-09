export default customElements.define("shop-cart-action",class ShopCartAction extends HTMLElement{get badge(){return this.shadowRoot.querySelector(".badge")}get actionButton(){return this.shadowRoot.querySelector('[icon="shopping-cart"]')}get innerItems(){return Array.from(this.querySelectorAll(".cart-action-item"))}set counter(n){this._counter=n,0===n?this.classList.remove("active"):this.classList.contains("active")||this.classList.add("active"),document.dispatchEvent(new CustomEvent("counter-change",{detail:n}))}get counter(){return this._counter||0}constructor(){super(),this.attachShadow({mode:"open"}),this._onClick=this._onClick.bind(this)}connectedCallback(){this.shadowRoot.innerHTML='\n      <style>\n        :host {\n          display: flex;\n          flex-direction: column;\n          /* height: 56px; */\n          padding: 16px;\n          box-sizing: border-box;\n          background: #fff;\n          z-index: 100;\n          --svg-icon-size: 32px;\n        }\n        .row {\n          display: flex;\n          align-items: center;\n        }\n        .flex {\n          flex: 1;\n        }\n        custom-svg-icon {\n          cursor: pointer\n        }\n        /* @media (min-width: 1440px) {\n          :host {\n            position: absolute;\n            transform: translateX(-50%);\n            left: 54.3%;\n          }\n        } */\n        \n        .badge {\n          border-radius: 50%;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          background: #2f6c12a8;\n          background: #2f6c12c9;\n          margin-left: 8px;\n          margin-bottom: -3px;\n        }\n        :host(.active) .badge {\n          height: 14px;\n          width: 14px;\n        }\n      </style>\n      <span class="badge"></span>\n      <custom-svg-icon icon="shopping-cart"></custom-svg-icon>\n      \x3c!-- <span class="flex"></span> --\x3e\n    ',this.actionButton.addEventListener("click",this._onClick)}add(n){this.counter+=1}remove(n){this.counter-=1}_onClick(){go("cart")}});
