import { LitElement } from 'lit';
import '@material/web/list/list-item.js';
import '@material/web/icon/icon.js';
export declare class OfferItem extends LitElement {
    #private;
    draggable: boolean;
    key: string;
    name: string;
    public: string;
    connectedCallback(): void;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
