/**
 * imgur image hash
 */
export declare type imageHash = string
                  
export declare type albumParams = { ids?:  imageHash[], title: string, description: string, cover?: imageHash }
export declare type imgurCreateAlbumResponse = { id: string, deletehash: string}

export default class Imgur {
  #authorizationHeader: string
  #anonymous: boolean

  constructor({clientId, accessToken, anonymous}: { clientId?: string, accessToken?: string, anonymous?: boolean}) {
    if (accessToken)  this.#authorizationHeader = `Bearer ${accessToken}`
    if (clientId)  this.#authorizationHeader = `Client-ID ${clientId}`
    this.#anonymous = accessToken === undefined || anonymous
    
  }

  get headers() {
    const headers = new Headers();
    headers.append("Authorization", this.#authorizationHeader);
    return headers
  }


  async createAlbum({ ids, title, description, cover }: albumParams): Promise<imgurCreateAlbumResponse> {
    const headers = this.headers
    const formdata = new FormData();
    if (ids) {
      if (this.#anonymous) formdata.append('deletehashes[]', ids.join(','));
      else formdata.append('ids[]', ids.join(','));
    }
    if (title) formdata.append('title', title);
    if (description) formdata.append('description', description);
    if (cover) formdata.append('cover', cover);

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: formdata
    };

    try {
      const response = await fetch("https://api.imgur.com/3/album", requestOptions)  
      return (await response.json()).data
    } catch (error) {
      throw new Error(error)
    }
     
  }

  async removeAlbum(deleteHash) {
    const headers = this.headers    

    const requestOptions = {
      method: 'DELETE',
      headers: headers
    };

    
    try {
      const response = await fetch(`https://api.imgur.com/3/album/${deleteHash}`, requestOptions)  
      return response.text()
    } catch (error) {
      throw new Error(error)
    }    
  }

  async getAlbum(id) {
    const headers = this.headers    

    const requestOptions = {
      method: 'GET',
      headers: headers
    };

    try {
      const response = await fetch(`https://api.imgur.com/3/album/${id}`, requestOptions)  
      return (await response.json()).data
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAlbumImages(id) {
    const headers = this.headers    

    const requestOptions = {
      method: 'GET',
      headers: headers
    };

    try {
      const response = await fetch(`https://api.imgur.com/3/album/${id}/images`, requestOptions)  
      console.log(response);
      console.log(await response.text());
      
      
      return (await response.json()).data
    } catch (error) {
      throw new Error(error)
    }
  }

  async addImage({image, title, description}) {
    const headers = this.headers
    const formdata = new FormData();
    formdata.append('image', image);
    formdata.append('type', 'base64')
    formdata.append('description', description)
    formdata.append('title', title)

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: formdata
    };

    try {
      const response = await fetch("https://api.imgur.com/3/upload", requestOptions)  
      return (await response.json()).data
    } catch (error) {
      throw new Error(error)
    }
  }
}
  

  
  



