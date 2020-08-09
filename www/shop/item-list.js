export default define(class ItemList extends ElementBase{constructor(){super()}connectedCallback(){super.connectedCallback(),(async()=>{const t=await firebase.database().ref("products").once("value");window.products=t.val();for(const t of Object.keys(products)){let{stockCount:e,packageCount:n,name:s,portion:o,image:a}=products[t];const l=s;if(s.length>67&&(s=s.slice(0,67),s+="..."),e&&e>n){e-=n;const t=document.createElement("span");t.innerHTML=`<span style="display: flex;"><strong title="${l}">${s}</strong><span style="flex: 1;"></span><strong style="padding-right:8px;">aantal:</strong>${e}</span><span style="flex: 1;"></span><strong>${o}</strong>`,this.appendChild(t)}}})()}get template(){return html`
<style>
  :host {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .container {
    width: 100%;
  }
  ::slotted(span) {
    mixin(--css-column)

    min-height: 72px;
    height: 72px;
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  @media (min-width: 640px) {
    :host {
      align-items: center;
    }
    .container {
      max-width: 640px;
    }
  }
</style>
<span class="container"><slot></slot></span>`}});
