import './../../../node_modules/@andrewvanardennen/custom-input/custom-input.js'

export default customElements.define('contact-section', class ContactSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }
  get template() {
    return `<style>
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .column {
        display: flex;
        flex-direction: column;
      }
      
      .hero {
        display: flex;
        flex-direction: column;
        max-width: 480px;
        width: 100%;
        min-width: 320px;
        padding: 24px;
        box-sizing: border-box;
        height: 100%;
      }
      
      textarea, input {
        width: 100%;
      }
      .fab {
        font-size: 48px;
      }
      .link a {
        text-decoration: none;
        color: #333;
        text-transform: uppercase;
        cursor: pointer;
        pointer-events: auto;
      }
      .flex {
        flex: 1;
      }
      textarea {
        --webkit-visibility: none;
        border: none;
        background: transparent;
        height: var(--custom-input-height, 48px);
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        color: var(--custom-input-color, #555);
        display: flex;
        align-items: center;
        height: var(--custom-input-height, 48px);
        background: var(--custom-input-background, transparent);
        width: 100%;
        box-shadow: 0px 1px 3px -1px #333;
        min-width: 240px;
        height: 200px;
        --custom-input-color: #555;
      }
      
      @media(min-width: 640px) {
        .hero {
          max-height: 640px;
        }
      }
    </style>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/brands.css" integrity="sha384-i2PyM6FMpVnxjRPi0KW/xIS7hkeSznkllv+Hx/MtYDaHA5VcF0yL3KVlvzp8bWjQ" crossorigin="anonymous" defer>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/fontawesome.css" integrity="sha384-sri+NftO+0hcisDKgr287Y/1LVnInHJ1l+XC7+FOabmTTIK0HnE2ID+xxvJ21c5J" crossorigin="anonymous" defer>
    <span class="hero">
      <h4>Contact us</h4>
      <custom-input placeholder="email"></custom-input>
      <textarea placeholder="type here"></textarea>
      <flex-row>
        <flex-one></flex-one>
        <custom-svg-icon icon="done"></custom-svg-icon>
      </flex-row>
      <span class="flex"></span>
      <span class="features column">
        <a href="mailto:info@guldentopveldwinkel.be" class="info"><custom-svg-icon icon="email" class="fas"></custom-svg-icon>guldentopveldwinkel@gmail.com</a>
        <span class="info"><custom-svg-icon icon="home" class="fas"></custom-svg-icon>Guldentop 23, 3118 Werchter</span>
        <span class="info"><custom-svg-icon icon="phone" class="fas"></custom-svg-icon>0495124115</span>
        
        <span class="flex"></span>
        <span class="features row">
          <span class="link"><a href="https://www.facebook.com/GuldentopVeldwinkel"><i class="fab fa-facebook-square"></i></a></span>
          <span class="link"><a href="https://www.instagram.com/p/Bu-0zwLl8rj"><i class="fab fa-instagram"></i></a></span>
          <span class="link"><a href="https://www.youtube.com/watch?v=lB0squgHS6E"><i class="fab fa-youtube"></i></a></span>
        </span>
        
        <span class="flex"></span>
      </span>
    </span>
    `
  }
});