import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { map } from 'lit/directives/map.js';
import './menu-item.js'

@customElement('sub-menu')
export class SubMenu extends LitElement {
  
  @property({ type: String, attribute: true })
  headline: string;

  @property({ type: Boolean, reflect: true, attribute: true })
  open: boolean = false

  static styles = [
    css`
      :host {
        display: block;
      }

      custom-svg-icon {
        will-change: transform;
      }

      :host([open]) custom-svg-icon {
        transform: rotate(90deg);
      }

      :host([open]) ::slotted(*) {
        padding: auto;
        transform: scale(1) translateX(0);
        height: auto;
        opacity: 1;
        transition: opacity ease-in 240ms;
      }

      ::slotted(*) {
        transform: scale(0) translateX(-20%);
        transform-origin: top left;
        height: 0px;
        padding: 0;
        will-change: transform, height, padding;
        opacity: 0;
        transition: opacity ease-out 240ms;
        padding-left: 12px;
      }

      ::slotted(*:not(sub-menu))  {
        padding-left: 24px;
      }
    `
  ];

  render() {
    return html`
    <menu-item headline="${this.headline}" @click=${() => (this.open = !this.open)} noninteractive>
      <custom-svg-icon icon="chevron-right" slot="start"></custom-svg-icon>
    </menu-item>
    <slot></slot>
 <!--   ${map(this.items, item => html`
      <menu-item .headline=${item.name} .route=${item.route}></menu-item>
    `)} -->
    `;
  }
}
