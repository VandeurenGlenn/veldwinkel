import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'album-grid-item': AlbumGridItem;
    }
}
export declare class AlbumGridItem extends LitElement {
    set album(value: any);
    get album(): any;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
