import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import '@material/web/list/list-item.js'
import '@material/web/icon/icon.js'

@customElement('offer-item')
export class OfferItem extends LitElement {

  @property({ type: String, reflect: true })
  draggable: boolean = true;

  @property({ type: String, reflect: true })
  key: string;

  @property({ type: String, reflect: true })
  name: string;

  @property({ type: String, reflect: true })
  public: string;

  connectedCallback(): void {
    super.connectedCallback()
    this.ondragstart = this.#ondragstart.bind(this)
  }

  #ondragstart(event) {
    event.dataTransfer.setData("text", this.key);
  }

  #publicClicked(event) {
    console.log('click');
    const bool = this.public === 'true'
    this.public = String(!bool)
    console.log(this.public);
    console.log(this.key);
    
    firebase.database().ref(`offers/${this.key}/public`).set(this.public)
  }

  static styles = [
    css`
      :host {
        display: block;
        pointer-events: auto;
      }

      md-icon[public] {
        --md-icon-color: #4caf50;
      }

      md-icon {
        pointer-events: auto;
      }

      md-list-item {
        pointer-events: none;
      }
    `
  ];

  render() {
    return html`
    
    <md-list-item headline="${this.name?.length > 31 ? `${this.name.slice(0, 31)}...` : this.name}">
      <flex-one></flex-one>
      <md-icon data-variant="icon" slot="end" ?public="${this.public === 'true'}" @click="${(event) => this.#publicClicked(event)}">public</md-icon>
    </md-list-item>
    `;
  }
}
