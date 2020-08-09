import WebpEncoder from './webp-encoder.js'
const webpEncoder = new WebpEncoder()

export default mixin => class ImageMixin extends mixin {
  constructor() {
    super()
  }
  
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
  }
  
  /**
   * encode image and resize 
   * @return <Promise(img)>
   */
  encodeAndResize(img, size, quality, enc = 'webp') {
    if (enc === 'webp') return webpEncoder.encode(img, size, quality)
  }
  
  /**
   * add image to ipfs and save it's path to firebase
   */  
  async addImage(key, name, img, size, quality) {
    img = await this.encodeAndResize(img, size, quality)
    const value = await ipfs.add(img)
    const hash = value.cid.toString()
    if (name === 0) await firebase.database().ref(`images/${key}/timestamp`).set(new Date().getTime());
    
    await firebase.database().ref(`images/${key}/${name}`).set(hash);
  }
}