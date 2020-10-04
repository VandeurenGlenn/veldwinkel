import './../shop-admin-action-bar.js'
import ImageMixin from './image-mixin.js'
export default class ProductEditorMixin extends ImageMixin(ElementBase) {
  get actionBar() {
    return this.shadowRoot.querySelector('shop-admin-action-bar')
  }
  get publicIcon() {
    return this.actionBar.shadowRoot.querySelector('[icon="public"]');
  }
  get deleteButton() {
    return this.actionBar.shadowRoot.querySelector('[icon="delete"]');
  }
  get saveButton() {
    return this.actionBar.shadowRoot.querySelector('[icon="save"]');
  }
  get nails() {
    return this.shadowRoot.querySelector('image-nails');
  }
  set value(value) {
    this._value = value;
    if (this.rendered) this.stamp();
  }
  
  isOnline() {
    return navigator.onLine;
  }

  constructor(ref = 'products') {
    super();
    this._onNailUpload = this._onNailUpload.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onPublic = this._onPublic.bind(this);
    // this._onSave = this._onSave.bind(this);
    this._onImageSwiped = this._onImageSwiped.bind(this)
    this.runJobQue = this.runJobQue.bind(this);
    this.ref = ref;
    this.jobs = [];
    
    
    window.addEventListener('online', this.runJobQue, false);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (this._value) this.stamp();
    this.nails.addEventListener('nail-upload', this._onNailUpload);
    this.nails.addEventListener('image-swiped', this._onImageSwiped);
    
    this.publicIcon.addEventListener('click', this._onPublic);
    // this.saveButton.addEventListener('click', this._onSave);
    this.deleteButton.addEventListener('click', this._onDelete);
  }
  
  async runJobQue() {
    if (this.jobs.length > 0 && this.isOnline()) {
      const [url, options, name] = this.jobs.shift();
      await fetch(url, options)
      // notificationManager()
      new Notification(name + ' updated in background', {tag: 'updated in background'})
    }
    if (this.jobs.length > 0 && this.isOnline()) this.runJobQue()
  }
  
  async _onImageSwiped ({detail}) {
    this.saving = true
    
    const key = detail.getAttribute('key')
    
    let image = Array.from(this.nails.querySelectorAll('img'));
    if (image.length === 0 || image.length === 1 && image[0].getAttribute('key') === '0') {
      await firebase.database().ref(`images/${this._value}`).remove()
    } else {
      await firebase.database().ref(`images/${this._value}/${key}`).remove()
      if (key === '0') {
        await firebase.database().ref(`images/${this._value}/thumb`).remove()
        await firebase.database().ref(`images/${this._value}/thumbm`).remove()
        await firebase.database().ref(`images/${this._value}/placeholder`).remove()
        image = Array.from(this.nails.querySelectorAll('img'))
        // image[0]
        const hash = image[0].src.replace(`https://guldentopveldwinkel.be/ipfs/`, '')
        if (hash.length !== 94) {
          await this.addImage(this._value, 0, hash, 960, 95)
          await this.addImage(this._value, 'thumbm', hash, 320, 95)
          await this.addImage(this._value, 'thumb', hash, 120, 85)
          await this.addImage(this._value, 'placeholder', hash, 5, 25)
        } else {
          // TODO: get the image from ipfs encode etc
          // get from ipfs and encode thumb's etc
        }
        const timestamp = new Date().getTime()
        await firebase.database().ref(`images/${this._value}/${timestamp}`).set(timestamp)  
      }
      await firebase.database().ref(`images/${this._value}/${key}`).remove()  
    }
    this.saving = false
  }

//   async _onSave() {
//     console.log('save');
//     const value  = {};
//     const inputs = Array.from(this.querySelectorAll('custom-input'));
//     let image = Array.from(this.nails.querySelectorAll('img'));
//     value.image = {};
//     image = image.map((img, i) => {
//       let src;
//       if (img.src.indexOf('base64') !== -1) src = img.src.split(',')[1];
//       else src = img.src.replace(`https://guldentopveldwinkel.be/ipfs/`, '');
// console.log(img.getAttribute('key'));
//       return [image[img.getAttribute('key')], src];
//     })
//     inputs.forEach((input) => value[input.getAttribute('name')] = input.value);
//     const pub = this.publicIcon.hasAttribute('public');
//     const timestamp = new Date().getTime()
//     const {name, price } = value
//     if (this.ref === 'products') await firebase.database().ref(`${this.ref}/${key}`).set({...value, timestamp})
//     else {
// 
//       delete value.name
//       delete value.price
//       // TODO: more images
//       for (const key of Object.keys(value.image)) {
//         if (!isNaN(Number(key))) await firebase.database().ref(`images/${this._value}/${key}`).set(value.image[key])  
//       }
// 
//       delete value.image
//       await firebase.database().ref(`offerDisplay/${this._value}`).set({name, price, public: pub})      
//       await firebase.database().ref(`${this.ref}/${this._value}`).set({...value, timestamp})
//     }
//     globalThis.pubsub.publish(`event.${this.ref}`, { type: 'change', key: this._value, value: {name, image, public: pub, timestamp, ...value, price}})
//     history.back();
//   }

  async _onNailUpload({ detail }) {
    this.saving = true
    
    const key = this.nails.children.length > 0 ? this.nails.children.length - 1 : 0
    console.log(key);
    if (key === 0) {
      await this.addImage(this._value, 'thumbm', detail, 320, 95)
      await this.addImage(this._value, 'thumb', detail, 120, 85)
      await this.addImage(this._value, 'placeholder', detail, 5, 25)  
    }
    await this.addImage(this._value, key, detail, 960, 95)
    
    this.nails.add({ src: detail, key });
    
    this.saving = false
  }

  async _onPublic() {
    if (this.publicIcon.hasAttribute('public')) this.publicIcon.removeAttribute('public');
    else this.publicIcon.setAttribute('public', '');
    
    await firebase.database().ref(`offerDisplay/${this._value}/public`).set(this.publicIcon.hasAttribute('public'))
    
    globalThis.pubsub.publish(`event.${this.ref}`, { type: 'public', key: this._value, value: this.publicIcon.hasAttribute('public')})
    const timestamp = new Date().getTime()
    await firebase.database().ref(`offerDisplay/${this._value}/timestamp`).set(timestamp)
    history.back()
  }

  async _onDelete() {
    const answer = await confirm('are you sure you want to remove this product?');
    if (!answer) return
    console.log(`${this.ref}/${this._value}`);
    firebase.database().ref(`${this.ref}/${this._value}`).remove()
    if (this.ref === 'offers') {
      firebase.database().ref(`offerDisplay/${this._value}`).remove()
      firebase.database().ref(`images/${this._value}`).remove()
    }
    
    history.back();
    globalThis.pubsub.publish(`event.${this.ref}`, { type: 'delete', key: this._value })
    // }
  }
}
