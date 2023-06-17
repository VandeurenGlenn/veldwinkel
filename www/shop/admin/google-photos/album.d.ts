import mixin from "./mixin.js";
export default class Album extends mixin {
    constructor(token: any);
    /**
     *
     * @example
     * photos.getAlbum('veldwinkel')
     * @param title album title
     * @returns
     */
    get(title: string): Promise<any>;
}
