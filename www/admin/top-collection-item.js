export default define(class TopCollectionItem extends ElementBase{set value({key:e,order:t}){console.log({key:e,order:t}),this.setAttribute("data-route",e),this.user=t[0].user,this.reference=t[0],this.reference.ready&&this.setAttribute("ready",""),this.name=this.reference.displayName;const s=t.length-1;this.render({name:this.name,total:s}),this.setAttribute("key",e)}constructor(){super()}boolify(e){switch(e){case"":case 0:case null:case void 0:case!1:return!1;default:return!0}}get template(){return html`<style>
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
    mixin(--css-center)
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
</style>
<h4>${"name"}</h4>
<span class="flex"></span>
<h4>${"total"}</h4>
`}});
