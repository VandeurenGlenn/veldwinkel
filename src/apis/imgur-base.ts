import Imgur, { albumParams } from './imgur/imgur.js'

const clientId: string = await (await firebase.database().ref('apiKeys/imgur').once('value')).val()



export declare type firebaseImgurAlbum = {
  id: string,
  firebaseKey: string,
  deletehash: string
}

export declare type imgurBaseAlbum = {
  firebaseKey: string,
  id: string,
  deletehash: string,
  account_id?: string,
  account_url?: string
  ad_config?: {},
  cover?: string,
  cover_edited: string,
  cover_height: string,
  cover_width: string,
  datetime: EpochTimeStamp,
  description: string,
  favorite: boolean,
  images: string[],
  length: number,
  images_count: number,
  in_gallery: boolean,
  include_album_ads: boolean,
  is_ad: boolean,
  is_album: boolean,
  layout: string | 'blog', //     todo checkout layout
  link: string,
  nsfw: boolean,
  privacy: 'hidden' | 'public',
  section: string,
  title:  string,
  views: number
}

export default class ImgurBase extends Imgur {
  #ref

  constructor() {
    super({
      clientId
    })

    this.#ref = firebase.database().ref('albums')
  }

  async createAlbum({ ids, title, description, cover }: albumParams): Promise<firebaseImgurAlbum> {
    const result = await super.createAlbum({ ids, title, description, cover })
    const pushResult = await this.#ref.push(result)
    console.log(pushResult.key);
    
    return {...result, firebaseKey: pushResult.key}
  }

  async getAlbums(): Promise<imgurBaseAlbum[]> {
    const albums = await (await this.#ref.once('value')).val()
    console.log(albums);
    
    return Promise.all(Object.entries(albums).map(async ([firebaseKey, album]: [string, firebaseImgurAlbum]) => {
      const result = await super.getAlbum(album.id)
      return {firebaseKey, ...album, ...result}
    }))
  }

  async removeAlbum({deletehash, firebaseKey}) {
    try {
      await super.removeAlbum(deletehash)
      firebase.database().ref(`albums/${firebaseKey}`).remove()
      return 'succes'
    } catch (error) {
      console.log(error);
      
    }
    // .remove()
  }

  async getAlbumImages(firebaseKey: string): Promise<any> {

    const albums = await (await this.#ref.once('value')).val()
    const id = Object.entries(albums).filter(([key]) => key === firebaseKey)[0].id
    return super.getAlbumImages(id)
  }
  
}