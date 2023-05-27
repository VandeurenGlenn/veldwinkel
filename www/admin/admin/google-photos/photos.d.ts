import Album from "./album.js";
import mixin from "./mixin.js";
import Photo from "./photo.js";
export default class Photos extends mixin {
    albums: Album;
    photo: Photo;
    constructor(token: any);
}
