import mixin from "./mixin.js";

export default class Photo extends mixin {
  constructor(token) {
    super(token)
  }

  getAlbum() {
    this.get('v1/albums')
  }
}