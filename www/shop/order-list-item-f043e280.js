export default define(class OrderListItem extends ElementBase{constructor(){super()}set value(e){this.dataset.key=e,this.render({length:Number(orders[e].length)-1,order:e})}get template(){return html`
<style>
  * {
    pointer-events: none;
    user-select: none;
  }
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;

    min-height: 56px;
    height: 56px;
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-bottom: 1px solid #eee;

    cursor: pointer;
    pointer-events: auto;
  }
</style>
<span>${"order"}</span><span style="flex: 1;"></span>producten: <span>${"length"}</span>`}});
