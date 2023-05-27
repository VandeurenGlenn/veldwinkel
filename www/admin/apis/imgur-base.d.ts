import Imgur, { albumParams } from './imgur/imgur.js';
export declare type firebaseImgurAlbum = {
    id: string;
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
export default class ImgurBase extends Imgur {
    #private;
    constructor();
    createAlbum({ ids, title, description, cover }: albumParams): Promise<firebaseImgurAlbum>;
    getAlbums(): Promise<imgurBaseAlbum[]>;
    removeAlbum({ deleteHash, firebaseKey }: {
        deleteHash: any;
        firebaseKey: any;
    }): Promise<string>;
}
