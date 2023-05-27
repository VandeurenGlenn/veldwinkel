import mixin from "./mixin.js";

export default class Album extends mixin {
  constructor(token) {
    super(token)
  }

  /**
   * 
   * @example
   * photos.getAlbum('veldwinkel')
   * @param title album title
   * @returns 
   */
  get(title: string) {
    return super.get('v1/albums', {
      album: {
        title
      }
    })
  }
}