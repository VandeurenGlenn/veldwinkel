import ImgurBase, { imgurBaseAlbum, imgurBaseImage } from '../apis/imgur-base.js'
import { imgurAlbumParams, imgurCreateAlbumResponse, imgurImageParams } from '../apis/imgur/types.js'

class Api {
  imgurBase: ImgurBase
  constructor() {
    this.imgurBase = new ImgurBase()
  }

  async createAlbum({ ids, title, description, cover }: imgurAlbumParams): Promise<imgurCreateAlbumResponse> {
    return this.imgurBase.createAlbum({ ids, title, description, cover })
  }

  getAlbums() {
    return this.imgurBase.getAlbums()
  }

  getAlbum(id) {
    return this.imgurBase.getAlbum(id)
  }

  getAlbumImages(id) {
    return this.imgurBase.getAlbumImages(id)
  }

  removeAlbum(id) {
    return this.imgurBase.removeAlbum(id)
  }

  addImage(image: imgurImageParams): Promise<imgurBaseImage> {
    return this.imgurBase.addImage(image)
  }

  getImages() {
    return this.imgurBase.getImages()
  }

  removeImage(id) {
    return this.imgurBase.removeImage(id)
  }
}

declare global {
  var api: Api
}

export default Api