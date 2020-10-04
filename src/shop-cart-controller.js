import './shop/checkout-prompt.js';

export default class ShopCartController {
  
  constructor(cart, cartAction, items) {
    console.log(cart);
    this.cart = cart;
    this.cartAction = cartAction;
    
    this.items = items || {}
    
    window.shoppingCart = window.shoppingCart || {};
    window.shoppingCart.add = window.shoppingCart.add || this.add.bind(this);
    window.shoppingCart.change = window.shoppingCart.change || this.change.bind(this);
    window.shoppingCart.remove = window.shoppingCart.remove || this.remove.bind(this);
    window.shoppingCart.submit = window.shoppingCart.submit || this.submit.bind(this);
    window.shoppingCart.items = window.shoppingCart.items || this.items;
  }
  
  add(item) {
    if (this.items[item.uid]) {
      this.items[item.uid].count += item.count;
      this.cart.change(this.items[item.uid]);
    } else {
      if (!item.count) item.count = 1;
      this.items[item.uid] = item;
      
      this.cart.add(item);
      this.cartAction.add(item);
    }
  }
  
  change(item) {
    if (this.items[item.uid]) {
      this.items[item.uid] = item;
      this.cart.change(item);
    }
  }
  
  remove(uid) {
  this.cart.remove(uid);
    if (this.items[uid]) {
      delete this.items[uid];  
      this.cartAction.remove(uid);
    }
  }
  
  async checkout(set) {
    const snap = await firebase.database().ref(`orders/${user.uid}`).push(set);
    await firebase.database().ref(`orderKeys/${snap.key}`).set(user.uid);
    console.log(snap.key);
    // document.dispatchEvent(new CustomEvent('order-placed', { detail: snap.key }));
    const answer = await Notification.requestPermission();
    if (answer === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Guldentop Veldwinkel', {
          body: `order geplaatst
u kan deze afhalen met: ${snap.key}`,
          link: 'https://guldentopveldwinkel.be',
          data: snap.key,
          actions: [{
            action: 'location',
            title: 'afhaallocatie'
          }, {
            action: 'checkOrder',
            title: 'bekijk bestelling'
          }]
        });
      });
    }
    Object.keys(this.items).forEach(key => this.remove(key))
    go('order', snap.key)
  }
  
  async submit() {
    if (!window.user) {
      await window.signin();
    }
    await import('./shop/checkout-prompt.js')
    let prompt = document.createElement('checkout-prompt');
    document.body.appendChild(prompt)
    const prompted = await prompt.show();
    if (prompted[1] === 'googlepay') {
      await import('./shop/shop-checkout.js')
      const sh = document.createElement('shop-checkout')
      document.body.appendChild(sh)
      sh.paymentRequest([], 50)
    } else if (prompted[1] === 'paypal') {
      
      await import('./shop/paypal-checkout.js')
      const sh = document.createElement('paypal-checkout')
      document.body.appendChild(sh)
      await sh.show(this.items)
    }
    
    
    const set = [{
      collectionTime: prompted[0],
      payment: prompted[1],
      referentie: null,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber
    }];
    
    const keys = Object.keys(this.items)
    keys.forEach(key => {
      console.log(this.items[key]);
      console.log(key);
      console.log(this.cart.querySelector(`[uid="${key}"]`).count);
      set.push({
        product: key,
        aantal: Number(this.items[key].count)
      });
    })


    if (set.length > 1) {
      // let paymentResult;
      // const paymentMethod = await this.paymentOption();
      // if (paymentMethod) paymentResult = await import('./shop-checkout');
      // else return this.checkout()


      // if (paymentResult) {
      this.checkout(set);
      // }
    }
  }
};