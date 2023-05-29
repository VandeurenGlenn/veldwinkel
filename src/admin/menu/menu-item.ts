import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js'
import '@material/web/list/list-item-link.js'

@customElement('menu-item')
export class MenuItem extends LitElement {
  @property({ type: String })
  headline: string
  
  @property({ type: String, reflect: true })
  route: string

  @property({ type: Boolean })
  noninteractive: boolean = false

  @query('a')
  private _anchor: HTMLAnchorElement

  async connectedCallback(): Promise<void> {
    super.connectedCallback()
    await this.updateComplete
    if (this.noninteractive) return

    if (!this.route) this.route = this.headline

    this._anchor.href = `#!/${this.route}`
  }

  static styles = [
    css`
      :host {
        display: block;
        color: #eee;
      }

      a {
        text-transform: uppercase;
        cursor: pointer;
        color: inherit;
        height: 56px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 12px;
        text-decoration: none;
      }



      :host([selected]) {
        background: #eee;
        color: #616161;
        --svg-icon-color: #616161;
      }
    `
  ]

  render() {
    return this.headline ? html`
      <a>
        <slot name="start"></slot>
        <slot name="middle">
          <translated-string>${this.headline}</translated-string>
        </slot>
        <slot name="end"></slot>
      </a>
    ` : nothing
  }
}
