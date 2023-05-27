import ImgurBase from '../apis/imgur-base.js'
import { albumParams, imgurCreateAlbumResponse } from './../apis/imgur/imgur.js'

class Api {
  imgurBase: ImgurBase
  constructor() {
    this.imgurBase = new ImgurBase()
  }

  async createAlbum({ ids, title, description, cover }: albumParams): Promise<imgurCreateAlbumResponse> {
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
}

declare global {
  var api: Api
}

export default Api