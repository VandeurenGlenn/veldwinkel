import { ElementBase, define } from './base.js';

export default define(class TemplateRepeat extends ElementBase {
  get _templateElement() {
    return this.querySelector('template');
  }
  set items(value) {
    let index = 0;
    for (const item of value) {
      console.log(item, index);
    }
  }
  constructor() {
    super();
  }
  get template() {
    return html`
<style></style>

    `;
  }
})
