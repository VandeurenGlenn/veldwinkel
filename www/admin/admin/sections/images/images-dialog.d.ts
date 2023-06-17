import { LitElement } from 'lit';
import '@material/web/dialog/dialog.js';
import '@material/web/button/tonal-button.js';
import '@material/web/textfield/outlined-text-field.js';
import { imgurAlbumParams } from '../../../apis/imgur/types.js';
declare global {
    interface HTMLElementTagNameMap {
        'images-dialog': ImagesDialog;
    }
}
declare type actionResult = {
    action: string;
    fields: imgurAlbumParams;
    image?: {
        data: string | {
            name: string;
            data: string;
        }[];
        type: string;
    };
};
export declare class ImagesDialog extends LitElement {
    #private;
    static styles: import("lit").CSSResult[];
    createAlbum(): Promise<actionResult>;
    removeAlbum(deletehash: any): Promise<actionResult>;
    addImage(): Promise<actionResult>;
    removeImage(deletehash: any): Promise<actionResult>;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
