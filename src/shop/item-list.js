export default define(class ItemList extends ElementBase {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    (async () => {
      const snap = await firebase.database().ref('products').once('value');
      window.products = snap.val();
      const inStock = [];
      for (const product of Object.keys(products)) {
        let { stockCount, packageCount, name, portion, image } = products[product];
        const title = name;
        if (name.length > 67) {
          name = name.slice(0, 67);
          name += '...';
        }
        if (stockCount && stockCount > packageCount) {
          stockCount = stockCount - packageCount;
          const item = document.createElement('span');
          item.innerHTML = `<span style="display: flex;"><strong title="${title}">${name}</strong><span style="flex: 1;"></span><strong style="padding-right:8px;">aantal:</strong>${stockCount}</span><span style="flex: 1;"></span><strong>${portion}</strong>`;
          this.appendChild(item);
        }
      }
    })();
  }
  get template() {
    return html`
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
<span class="container"><slot></slot></span>`;
  }
});
