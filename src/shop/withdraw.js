import './../../node_modules/custom-button/custom-button.js';
// import socketRequestClient from '../../../node_modules/socket-request-client/src/index';

export default customElements.define('private-withdraw', class PrivateWithdraw extends HTMLElement {

  set payto(value) {
    this.shadowRoot.querySelector('#payto').value = value
  }

  set amount(value) {
    this.shadowRoot.querySelector('#amount').value = value
  }

  get paywith() {
    return [window.address, ...window.account];
  }

  get payto() {
    return this.shadowRoot.querySelector('#payto').value
  }

  get amount() {
    return this.shadowRoot.querySelector('#amount').value
  }
  get _withdrawButton() {
    return this.shadowRoot.querySelector('.withdraw-button')
  }
  constructor() {
    super();
    this.withdraw = this.withdraw.bind(this)
    this.cancel = this.cancel.bind(this)
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = this.template
  }

  connectedCallback(){
    this._withdrawButton.addEventListener('click', this.withdraw)
    this.shadowRoot.querySelector('.cancel-button').addEventListener('click', this.cancel)
  }

  cancel() {
    this.paywith = null;
    this.payto = null;
    this.amount = null;
  }

  async validate(paywith, payto, amount) {
    if (!paywith || !payto || !amount) throw Error('Are you sure you filled in everything?')
    // when payto address lenght is lower than or same as 24
    // we assume its an address name
    if (payto.length < 24) {
      const accounts = window.store.contacts;
      for (const acc of accounts) {
        if (acc[0] === payto) {
          payto = acc[1]
        }
      }
    }
    if (paywith.length < 34 || payto.length < 34) throw Error('invalid address')
    return {paywith, payto, amount};
  }

  async withdraw() {
    if (this.paywith && this.payto && this.amount) {
      // TODO: push result to mempool
      try {
        const result = await this.validate(this.paywith[0], this.payto, this.amount)
        const withdrawed = await leofcoin.api.withdraw({
          to: this.payto,
          from: this.paywith,
          amount: this.amount,
          message: this.message
        });

        console.log(withdrawed);
        const length = withdrawed.hash.length;
        const hash = withdrawed.hash.slice((length - 7), length);
        console.log(hash, withdrawed.hash);
        const permission = await Notification.requestPermission();
        if (permission === "granted") {

          new Notification(`${hash} signed & added to pool`, {icon: './assets/leofcoin_96.png', badge: './assets/leofcoin_96.png'}).onclick = (ev) => {
            ev.preventDefault();
            console.log(ev)
          }
        }
      } catch (e) {
        return alert(e.message);
      }
      return;
    }
    alert('Are you sure you filled in everything?');
  }

   get template() {
    return `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        color: #ddd;
        align-items: center;
        justify-content: center;
      }

      .withdraw {
        padding: 2em;
      }
      input, textarea {
        /* padding: 0.6em; */
        border: none;
        outline: none;
        background: rgba(225,225,225,0.1);
        color: #ddd;
      }
      input {
        font-size: 20px;
        height: 40px;
        text-align: center;
        border-radius: 14px;
      }
      textarea#statement {
        font-size: 18px;
        height: calc(40px * 3);
        padding: 6px 12px;
        border-radius: 14px;
        overflow: hidden;
      }
      .item {
        display: flex;
        flex-direction: column;
        /* align-items: flex-end; */
        box-sizing: border-box;
        padding: 8px 16px;
      }
      
      input {
        width: 100%;
      }

      h4 {
        margin: 0;
        padding: 0 12px 12px 0;
      }

      button {
        border: none;
        user-select: none;
        border-radius: 24px;
        height: 40px;
        width: 124px;
        background: transparent;
        user-select: none;
        outline: none;
        text-transform: uppercase;
        color: #ddd;
        cursor: pointer;
      }

      button:hover {
        box-shadow: var(--shadow-elevation-3dp);
        transition: box-shadow 96ms ease-in;
      }

      button:active {
        box-shadow: var(--shadow-elevation-0dp);
        transition: box-shadow 96ms ease-out;
      }

      input {
        color: #ddd;
      }
      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .lfc {
        padding: 0 0 0 12px;
      }
      
      .flex {
        flex: 1;
      }
      .flex-2 {
        flex: 2;
      }

      [disabled] {
        pointer-events: none;
        color: #eee;
      }
      
      .container {
        display: flex;
        flex-direction: column;
        min-height: 320px;
        min-width: 240px;
        max-width: 480px;
        width: 100%;
        background: var(--primary-color);
        padding: 24px;
        border-radius: 24px;
        
      }
      .item {
        
      }
    </style>
    <span class="container">
      <span class="column">
        <span class="item">
          <h4>withdraw</h4>
          <span class="row">
            <input id="amount" type="text" autocomplete="off" placeholder="150" tabindex="1"></input>
          </span>
        </span>
        <span class="item">
          <span class="flex">
            <h4>TO</h4>
            <input id="payto" type="text" autocomplete="on" placeholder="address/contact" tabindex="2"></input>
          </span>
        </span>
      </span>
      
      <span class="flex-2"></span>
      <span class="row">
        <custom-button class="cancel-button" tabindex="5">cancel</custom-button>
        <span class="flex"></span>
        <custom-button class="withdraw-button" tabindex="4">withdraw</custom-button>
      </span>
    </span>
    `;
  }
});
