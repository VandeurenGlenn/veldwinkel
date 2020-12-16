import './../../home-imports.js'

export default customElements.define('home-section', class HomeSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }

  connectedCallback() {
    this.stampSettings()

    // const go = url => {
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.click();
    // }
  }

  async stampSettings() {

      const snap = await firebase.database().ref('settings/hours').once('value')
      console.log(snap);
      const { pickup, selfservice } = snap.val()

      const el = this.shadowRoot.querySelector('.pickup-moments')
      el.innerHTML = `
      <h3>afhaalmomenten</h3>
      <p class="tuesday">dinsdag ${pickup.tuesday.from} - ${pickup.tuesday.to}</p>
      <p>vrijdag ${pickup.friday.from} - ${pickup.friday.to}</p>
      <h3>zelfbediening</h3>
      <p>dinsdag ${selfservice.tuesday.from} - ${selfservice.tuesday.to}</p>
      <p>vrijdag ${selfservice.friday.from} - ${selfservice.friday.to}</p>`
  }
  get template() {
    return `<style>
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Roboto', 'Noto', sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-y: auto;
      --toolbar-height: 54px;
      --welcome-image-height: 410px;
      pointer-events: none;
    }
    h3 {
      font-size: 24px;
      font-weight: 400;
      letter-spacing: -.01em;
      line-height: 30px;
      text-transform: uppercase;
    }
    h4 {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: #1B5E20;
      text-transform: uppercase;
    }
    .welcome-title {
      color: #fff;
      z-index: 100;
    }
    main {
      display: flex;
      flex-direction: column;
      width: 100%;
      /* max-width: 640px; */
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
    }
    main {
      /* height: 100%;
      transform: translateY(-30px); */
    }
    .column {
      display: flex;
      flex-direction: column;
    }
    .row {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    .flex {
      flex: 1;
    }
    .welcome, .about-img, .who-img {
      box-shadow: 0px 3px 9px 0px #000;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 720px;
      width: 100%;
      background-position: center;
      background-clip: border-box;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .welcome {

      background-image: url('assets/top.webp');
    }
    .about-img {
      background-image: url('assets/veld.webp');
    }
    .who-img {
      background-image: url('assets/crops2.webp');
    }
    .button-container {
      max-width: 1300px;
      padding: 124px;
      box-sizing: border-box;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
    .logo {
      display: block;
      height: 80%;
      width: 80%;
      background-image: url('assets/veldwinkel-top-dark.webp');
      background-position: center;
      background-clip: border-box;
      background-repeat: no-repeat;
      background-size: contain;
      opacity: 1;
      z-index: 100;
    }
    .toolbar {
      height: var(--toolbar-height);
      width: 100%;
    }
    .toolbar.welcome {
      position: absolute;
      bottom: 0;
    }
    .about {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 0;
    }
    .actions {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: center;
      min-height: 194px;
      padding: 24px;
      box-sizing: border-box;
      width: 100%;
      /* max-width: 230px; */
    }
    .actions top-icon-button {
      margin: 10px;
    }
    custom-tabs {
      height: var(--toolbar-height);
    }
    .link {
      margin: 0;
      padding: 12px;
      font-size: 16px;
      align-items: center;
      display: flex;
    }
    .link a {
      text-decoration: none;
      color: white;
      text-transform: uppercase;
      cursor: pointer;
      pointer-events: auto;
    }
    .fas {
      padding-right: 8px;
      width: 24px !important;
      height: 24px;
    }
    .overlay {
      background: linear-gradient(to bottom,#77B45A,#2F6C12);
      opacity: .7;
      position: absolute;
      height: 100%;
      width: 100%;
      right: 0;
      bottom: 0;
      left: 0;
      top: 0;
    }
    .about-us {
      padding: 24px;
      display: flex;
      flex-direction: column;
    }
    custom-pages {
      height: 400px;
      width: 100%;
    }
    top-icon-button {
      background: #fff;
    }
    footer {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 24px 78px 24px;
      box-sizing: border-box;
      background-color: #463028;
      background-image: linear-gradient(to bottom,#77b45a8a,#2f6c12a8);
      color: #fff;
      position: relative;
      box-shadow: -1px 0px 5px 0px #000;
    }
    footer .overlay {
      background: linear-gradient(to bottom,#2f6c12,#458729);
      pointer-events: none;
    }
    .features {
      display: flex;
      align-items: center;
    }
    summary-panel {
      padding: 124px 0;
      box-sizing: border-box;
    }
    summary-panel-mirror {
      padding: 124px 0;
      box-sizing: border-box;
    }
    .who-img, .about-img {
      height: 100%;
      width: 60%;
      min-height: 320px;
    }
    .pickup-moments {
      width: 100%;
      max-width: 1200px;
      text-align: center;
    }
    .info {
      padding-left: 16px;
      padding-top: 8px;
      padding-bottom: 8px;
      --svg-icon-color: #77a267;
      font-size: 16px;
    }

    .fab {
      font-size: 48px;
    }
    .features.column {
      align-items: baseline;
      width: fit-content;
    }
    @media (min-width: 540px) {
      .actions {
        max-width: 740px;
      }
      /* .about {
        max-width: calc(var(--welcome-image-height) + 100px);
      } */

    }

    summary-panel .text {
      padding: 0 48px 0 0;
      box-sizing: border-box;
    }
    summary-panel-mirror .text2 {
      padding: 0 0 0 48px;
      box-sizing: border-box;
    }
    /* @media (max-width: 1330px) {
      .about-img, .who-img {
        width: 100%;
      }
      summary-panel-mirror .text2, summary-panel .text {
        padding: 24px 0;
        box-sizing: border-box;
      }
      summary-panel-mirror, summary-panel {
        padding: 10px;
        box-sizing: border-box;
      }
    } */
    @media (max-width: 1200px) {
      .about-img, .who-img {
        width: 100%;
      }
      summary-panel-mirror .text2, summary-panel .text {
        padding: 72px 0 48px 0;
      }
      summary-panel-mirror, summary-panel {
        padding: 10px;
        box-sizing: border-box;
      }
    }
    @media (max-width: 720px) {
      .welcome, .about-img, .who-img {
        height: calc(var(--welcome-image-height) - 100px);
      }
      .about-img, .who-img {
        width: 100%;
      }
      .button-container {
        flex-direction: column;
        padding: 48px;
      }
      summary-panel-mirror .text2, summary-panel .text {
        padding: 0 0 48px 2px;
      }
    }

    @media (max-width: 1020px) {
      .features.column {
        width: 100%;
        align-items: center;
        justify-content: center;
      }
      .features.row {
        align-items: center;
        justify-content: center;
      }
      .about {
        flex-direction: column;
        align-items: center;
      }
    }
    </style>


    <main>
      <section class="welcome">
        <span class="overlay"></span>
        <span class="logo"></span>
        <h3 class="welcome-title">lekker vers lokaal</h3>
      </section>
      <!-- <span> -->
        <!-- <h3 class="title">Wat we doen</h3> -->


      <!-- </span> -->


      <summary-panel>
        <span slot="left" class="text">
          <h3>Wie we zijn</h3>
          <p>Een jong kleinschalig en dynamisch landbouwbedrijf op het knooppunt van Baal, Werchter en Betekom,</p>
          <p>gespecialiseerd in het telen van seizoensgebonden groenten en fruit.</p>
        </span>
        <span slot="right" class="about-img"></span>
      </summary-panel>
      <summary-panel-mirror style="padding-top: 0;">

        <span slot="left" class="who-img"></span>
        <span slot="right" class="text2">
          <h3>wat we te bieden hebben</h3>
          <p>Wekelijks stellen we voor jou een groentenbak samen.</p>
          <p>deze zijn aanpasbaar naar behoefte en smaak!</p>
          <p>Afhalingen gebeuren op ons veld.</p>
          <br/>
          <p>Uiteraard kunnen ook restaurants genieten van onze verse lokale producten!</p>
        </span>
      </summary-panel-mirror>

      <section class="pickup-moments">
      </section>

      <span class="row button-container">

        <span class="flex"></span>
        <top-icon-button name="order" onclick="go('products')" title="go checkout our goods in the shop" icon="shopping-cart">ontdek onze producten</top-icon-button>
        <span class="flex"></span>
      </span>
      <footer>
        <span class="overlay"></span>
        <ul class="about">

          <span class="features column">
            <a href="mailto:info@guldentopveldwinkel.be" class="info"><custom-svg-icon icon="email" class="fas"></custom-svg-icon>guldentopveldwinkel@gmail.com</a>
            <span class="info"><custom-svg-icon icon="home" class="fas"></custom-svg-icon>Guldentop 23, 3118 Werchter</span>
            <span class="info"><custom-svg-icon icon="phone" class="fas"></custom-svg-icon>0495124115</span>

            <span class="features row">
              <span class="link"><a href="https://www.facebook.com/GuldentopVeldwinkel"><i class="fab fa-facebook-square"></i></a></span>
              <span class="link"><a href="https://www.instagram.com/p/Bu-0zwLl8rj"><i class="fab fa-instagram"></i></a></span>
              <span class="link"><a href="https://www.youtube.com/watch?v=lB0squgHS6E"><i class="fab fa-youtube"></i></a></span>
            </span>
            <span class="flex"></span>
          </span>

          <span class="features column" >
            <span class="flex"></span>
            <span class="link"><a href="https://guldentopveldwinkel.be/#products">Producten</a></span>
            <span class="link"><a href="https://guldentopveldwinkel.be/#cart">winkelwagen</a></span>
            <span class="link"><a href="https://guldentopveldwinkel.be/#orders">bestellingen</a></span>
            <span class="link"><a href="https://guldentopveldwinkel.be/#info">locatie</a></span>
            <span class="link"><a href="https://guldentopveldwinkel.be/#directions">routebeschrijving</a></span>
            <span class="flex"></span>

            <span class="features column" style="padding-top: 32px;padding-left: 14px;">
              <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppppcmcvdam.png" alt="Pay with PayPal, PayPal Credit or any major credit card" />
            </span>
          </span>
        </ul>
      </footer>

    </main>`
  }
});
