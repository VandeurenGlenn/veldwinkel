import ImgurBase from '../apis/imgur-base.js';
import { albumParams, imgurCreateAlbumResponse } from './../apis/imgur/imgur.js';
declare class Api {
    imgurBase: ImgurBase;
    constructor();
    createAlbum({ ids, title, description, cover }: albumParams): Promise<imgurCreateAlbumResponse>;
    getAlbums(): Promise<import("../apis/imgur-base.js").imgurBaseAlbum[]>;
    getAlbum(id: any): Promise<any>;
    getAlbumImages(id: any): Promise<any>;
    removeAlbum(id: any): Promise<string>;
}
declare global {
    var api: Api;
}
export default Api;
