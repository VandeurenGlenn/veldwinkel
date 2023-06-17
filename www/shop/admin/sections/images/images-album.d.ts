import { LitElement, nothing } from 'lit';
import '@material/web/fab/fab.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/standard-icon-button.js';
import '@material/web/dialog/dialog.js';
import '@material/web/button/text-button.js';
import '@material/web/textfield/filled-text-field.js';
import '../../elements/items/album-list-item.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import { imgurBaseAlbum } from '../../../apis/imgur-base.js';
declare global {
    interface HTMLElementTagNameMap {
        'images-album': ImagesAlbum;
    }
}
export default class ImagesAlbum extends LitElement {
    #private;
    selection: string;
    album: imgurBaseAlbum;
    addImage(): void;
    willUpdate(changedProperties: any): Promise<void>;
    constructor();
    removeAlbum(deletehash: any, firebaseKey: any): Promise<void>;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
