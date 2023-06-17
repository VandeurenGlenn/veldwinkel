import { LitElement } from 'lit';
import '@material/web/fab/fab.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/standard-icon-button.js';
import '@material/web/fab/fab.js';
import '@material/web/button/text-button.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import './images-dialog.js';
declare global {
    interface HTMLElementTagNameMap {
        'images-library': ImagesLibrary;
    }
}
export default class ImagesLibrary extends LitElement {
    #private;
    images: any[];
    connectedCallback(): Promise<void>;
    removeImage(deletehash: any, firebaseKey: any): Promise<void>;
    addImage(): Promise<void>;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
