import Imgur from './imgur/imgur.js';
import { imgurAlbumParams } from './imgur/types.js';
export declare type firebaseImgurAlbum = {
    id: string;
    firebaseKey: string;
    deletehash: string;
};
export declare type firebaseImgurImage = {
    id: string;
    firebaseKey: string;
    deletehash: string;
};
export declare type imgurBaseAlbum = {
    firebaseKey: string;
    id: string;
    deletehash: string;
    account_id?: string;
    account_url?: string;
    ad_config?: {};
    cover?: string;
    cover_edited: string;
    cover_height: string;
    cover_width: string;
    datetime: EpochTimeStamp;
    description: string;
    favorite: boolean;
    images: string[];
    length: number;
    images_count: number;
    in_gallery: boolean;
    include_album_ads: boolean;
    is_ad: boolean;
    is_album: boolean;
    layout: string | 'blog';
    link: string;
    nsfw: boolean;
    privacy: 'hidden' | 'public';
    section: string;
    title: string;
    views: number;
};
export declare type imgurBaseImage = {
    firebaseKey: string;
    id: string;
    title: string | null;
    description: string | null;
    datetime: EpochTimeStamp;
    type: string | 'image/gif';
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote: null | string;
    favorite: boolean;
    nsfw: null | string;
    section: null | string;
    account_url: null;
    account_id: 0;
    is_ad: false;
    in_most_viral: false;
    tags: [];
    ad_type: 0;
    ad_url: string;
    in_gallery: false;
    deletehash: string;
    name: string;
    link: string;
};
export default class ImgurBase extends Imgur {
    #private;
    constructor();
    createAlbum({ ids, title, description, cover }: imgurAlbumParams): Promise<firebaseImgurAlbum>;
    getAlbums(): Promise<imgurBaseAlbum[]>;
    removeAlbum({ deletehash, firebaseKey }: {
        deletehash: any;
        firebaseKey: any;
    }): Promise<string>;
    getAlbum(firebaseKey: string): Promise<any>;
    getAlbumImages(firebaseKey: string): Promise<any>;
    addImage(image: any): Promise<any>;
    getImage(firebaseKey: string): Promise<imgurBaseImage>;
    getImages(): Promise<any[]>;
    removeImage({ deletehash, firebaseKey }: {
        deletehash: any;
        firebaseKey: any;
    }): Promise<string>;
}
