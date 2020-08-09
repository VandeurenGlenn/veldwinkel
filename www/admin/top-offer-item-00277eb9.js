import{d as e,E as t}from"./base-49bd4703.js";export default e(class TopOfferItem extends t{get _publicIcon(){return this.shadowRoot.querySelector('custom-svg-icon[icon="public"]')}get _name(){return this.shadowRoot.querySelector(".name")}set value(e){this._value=e,console.log(e),this.name=e.name||"missing name",this.per=e.per,this.description=e.omschrijving,this.price=e.prijs,this.image=e.foto,this.type=e.type,e.public&&this._publicIcon.setAttribute("public","");const t=this.name;this.name=this.name.slice(0,31),this.name.length<t.length&&(this.name+="...",this._name.setAttribute("title",t)),this.render(),this._name.innerHTML=this.name}get value(){return this._value}set key(e){this._key=e}get key(){return this._key}set public(e){e?this._publicIcon.setAttribute("public",""):this._publicIcon.removeAttribute("public")}constructor(){super()}boolify(e){switch(e){case"":case 0:case null:case void 0:case!1:return!1;default:return!0}}get template(){return html`<style>
  :host {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    height: 64px;
    pointer-events: auto;
    cursor: pointer;
    padding: 0 24px;
    align-items: center;
    box-sizing: border-box;
  }

  [public] {
    --svg-icon-color: #4caf50;
  }

  .flex {
    flex: 1;
  }
  .filler {
    display: block;
    min-width: 240px;
  }
  input {
    width: 100px;
  }
  h4, p, span {
    pointer-events: none;
  }
  .row {
    width: 100%;
  }
  apply(--css-row)
  apply(--css-center)
</style>

<span class="row center">
  <h4 class="name center"></h4>
  <span class="flex"></span>
  <custom-svg-icon icon="public"></custom-svg-icon>
</span>
`}});
