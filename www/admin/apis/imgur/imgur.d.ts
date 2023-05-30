/**
 * imgur image hash
 */
export declare type imageHash = string;
export declare type albumParams = {
    ids?: imageHash[];
    title: string;
    description: string;
    cover?: imageHash;
};
export declare type imgurCreateAlbumResponse = {
    id: string;
    deletehash: string;
};
export default class Imgur {
    #private;
    constructor({ clientId, accessToken, anonymous }: {
        clientId?: string;
        accessToken?: string;
        anonymous?: boolean;
    });
    get headers(): Headers;
    createAlbum({ ids, title, description, cover }: albumParams): Promise<imgurCreateAlbumResponse>;
    removeAlbum(deleteHash: any): Promise<string>;
    getAlbum(id: any): Promise<any>;
    getAlbumImages(id: any): Promise<any>;
    addImage({ image, title, description }: {
        image: any;
        title: any;
        description: any;
    }): Promise<any>;
}
