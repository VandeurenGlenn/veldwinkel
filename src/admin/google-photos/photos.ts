import Album from "./album.js";
import mixin from "./mixin.js";
import Photo from "./photo.js";

export default class Photos extends mixin {
  albums: Album
  photo: Photo

  constructor(token) {
    super(token)
    console.log(token);
    
    this.albums = new Album(token)
    this.photo = new Photo(token)
  }
}