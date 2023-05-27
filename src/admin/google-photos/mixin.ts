export default class Mixin {
  #token: string
  baseURL: string = 'https://photoslibrary.googleapis.com/'

  constructor(token: string) {
    this.#token = token
  }

  
  async get(endpoint, body) {
    const response = await fetch(`${this.baseURL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#token}`,
      },
      body
    })
    return response.json()
  }

  
}