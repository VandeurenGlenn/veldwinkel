import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

declare global {
  interface HTMLElementTagNameMap {
    'top-menu': TopMenu
  }
}

@customElement('top-menu')
export class TopMenu extends LitElement {
  @property({type: String})
  route: string

  @property({type: String})
  previousRoute: string

  select(route: string) {
    if (route !== this.route && route) {
      console.log(this.previousRoute);
      
      this.querySelector(`[route="${this.previousRoute}"]`) && this.querySelector(`[route="${this.previousRoute}"]`).removeAttribute('selected')
      this.previousRoute = route
      this.route = route
      this.querySelector(`[route="${this.route}"]`) && this.querySelector(`[route="${this.route}"]`).setAttribute('selected', '')
      const paths = route.split('/')
      paths.pop()
      
      if (paths) {
        for (const path of paths) {
          this.querySelector(`sub-menu[headline="${path}"]`).open = true
        }
      }
    }
  }

  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`<slot></slot>`;
  }
}
