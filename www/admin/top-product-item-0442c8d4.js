import{d as t,E as e}from"./base-49bd4703.js";t(class TopProductItem extends e{set value({name:t,stockCount:e,packageCount:s}){this.name=t,this.stock=e,this.inBox=s;const n=this.name;this.name=this.name.slice(0,31),this.name.length<n.length&&(this.name+="...",this.shadowRoot.querySelector(".name").setAttribute("title",n)),this.render({name:this.name})}set key(t){this._key=t}get stockEl(){return this.shadowRoot.querySelector('input[name="stock"]')}get inBoxEl(){return this.shadowRoot.querySelector('p[name="in-box"]')}set stock(t){this._stock=this.boolify(t)?t:"0",this.stockEl.value=this._stock}set inBox(t){this._inBox=this.boolify(t)?t:"0",this.inBoxEl.innerHTML=this._inBox}constructor(){super(),this._onValue=this._onValue.bind(this),this.runJobQue=this.runJobQue.bind(this),this.jobs=[],window.addEventListener("online",this.runJobQue,!1)}connectedCallback(){super.connectedCallback(),this.stockEl.addEventListener("change",this._onValue)}async runJobQue(){if(this.jobs.length>0&&navigator.onLine){const[t,e]=this.jobs.shift();await firebase.database().ref(`products/${t}/stockCount`).set(e)}this.jobs.length>0&&navigator.onLine&&this.runJobQue()}_onValue(){this.jobs.push([this._key,this.stockEl.value]),this.runJobQue()}boolify(t){switch(t){case"":case 0:case null:case void 0:case!1:return!1;default:return!0}}get template(){return html`<style>
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    height: 112px;
    pointer-events: auto;
    cursor: pointer;
  }
  
  .name {
    width: 100%;
    max-width: 244px;
  }

  .flex {
    flex: 1;
  }
  .filler {
    min-width: 258px;
  }
  input {
    width: 100px;
    pointer-events: auto;
  }
  h4, p, span {
    pointer-events: none;
  }
  apply(--css-row)
  apply(--css-center)
</style>

<span class="row">
  <h4 class="name center">${"name"}</h4>
  <span class="flex"></span>
  <span class="row center filler">
    <input type="number" name="stock"></input>
    <span class="flex"></span>
    <p name="in-box"></p>
  </span>
</span>`}});
