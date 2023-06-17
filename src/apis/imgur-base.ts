import Imgur from './imgur/imgur.js'
import { imgurAlbumParams } from './imgur/types.js'

const clientId: string = await (await firebase.database().ref('apiKeys/imgur').once('value')).val()

export declare type firebaseImgurAlbum = {
  id: string,
  firebaseKey: string,
  deletehash: string
}
export declare type firebaseImgurImage = {
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

export declare type imgurBaseImage = {
  firebaseKey: string,
  id: string,
  title: string | null,
  description: string | null,
  datetime: EpochTimeStamp,
  type: string | 'image/gif',
  animated: boolean,
  width: number,
  height: number,
  size: number,
  views: number,
  bandwidth: number,
  vote: null | string,
  favorite: boolean,
  nsfw: null | string,
  section: null | string,
  account_url: null,
  account_id: 0,
  is_ad: false,
  in_most_viral: false,
  tags: [],
  ad_type: 0,
  ad_url: string,
  in_gallery: false,
  deletehash: string,
  name: string,
  link: string
}

export default class ImgurBase extends Imgur {
  #albumsRef = firebase.database().ref('albums')
  #imagesRef = firebase.database().ref('images')

  // todo support authenticated and anonymous (if authenticated ids are used, else delethashes are used)
  constructor() {
    super({
      clientId
    })
  }



  async createAlbum({ ids, title, description, cover }: imgurAlbumParams): Promise<firebaseImgurAlbum> {
    const result = await super.createAlbum({ ids, title, description, cover })
    const pushResult = await this.#albumsRef.push(result)
    console.log(pushResult);
    console.log(pushResult.key);
    
    
    return {...result, firebaseKey: pushResult.key}
  }

  async getAlbums(): Promise<imgurBaseAlbum[]> {
    const albums = await (await this.#albumsRef.once('value')).val()
    console.log(albums);
    
    return Promise.all(Object.entries(albums).map(async ([firebaseKey, album]: [string, firebaseImgurAlbum]) => {
      const result = await super.getAlbum(album.id)
      return {firebaseKey, ...album, ...result}
    }))
  }

  async removeAlbum({deletehash, firebaseKey}) {
    try {
      await super.removeAlbum(deletehash)
      this.#albumsRef.child(firebaseKey).remove()
      return 'succes'
    } catch (error) {
      console.log(error);
      
    }
    // .remove()
  }

  async getAlbum(firebaseKey: string): Promise<any> {
    console.log({firebaseKey});
    
    const ref = await this.#albumsRef.child(firebaseKey).once('value')
    console.log(ref);
    
    const album = await ref.val()
    console.log(album);
    
    return {...await super.getAlbum(album.id), images: await super.getAlbumImages(album.id)}
  }

  async getAlbumImages(firebaseKey: string): Promise<any> {
    const album = await (await this.#albumsRef.child(firebaseKey).once('value')).val()
    return super.getAlbumImages(album.id)
  }

  async addImage(image: any): Promise<any> {
    const result = await super.addImage(image)
    const pushResult = await this.#imagesRef.push({
      id: result.id,
      deletehash: result.deletehash,
      link: result.link
    })
    return {...result, firebaseKey: pushResult.key}
    
  }

  async getImage(firebaseKey: string): Promise<imgurBaseImage> {
    const image = await (await this.#imagesRef.child(firebaseKey).once('value')).val()
    return { ...image, ...await super.getImage(image.id) }
  }

  async getImages() { 
    const images = await (await this.#imagesRef.once('value')).val()
    console.log(images);
    
    return Promise.all(
      Object.entries(images)
      .map(async ([firebaseKey, image]: [string, imgurBaseImage]) =>
        ({ firebaseKey, ...image, ...await super.getImage(image.id) })
      )
    )
  }
  
  async removeImage({deletehash, firebaseKey}) {
    try {
      await super.removeImage(deletehash)
      this.#imagesRef.child(firebaseKey).remove()
      return 'succes'
    } catch (error) {
      console.log(error);
      
    }
    // .remove()
  }
}