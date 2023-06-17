import ImgurBase, { imgurBaseAlbum, imgurBaseImage } from '../apis/imgur-base.js';
import { imgurAlbumParams, imgurCreateAlbumResponse, imgurImageParams } from '../apis/imgur/types.js';
declare class Api {
    imgurBase: ImgurBase;
    constructor();
    createAlbum({ ids, title, description, cover }: imgurAlbumParams): Promise<imgurCreateAlbumResponse>;
    getAlbums(): Promise<imgurBaseAlbum[]>;
    getAlbum(id: any): Promise<any>;
    getAlbumImages(id: any): Promise<any>;
    removeAlbum(id: any): Promise<string>;
    addImage(image: imgurImageParams): Promise<imgurBaseImage>;
    getImages(): Promise<any[]>;
    removeImage(id: any): Promise<string>;
}
declare global {
    var api: Api;
}
export default Api;
