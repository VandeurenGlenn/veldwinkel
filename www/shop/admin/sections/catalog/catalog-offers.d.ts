import { LitElement } from 'lit';
import '@material/web/list/list.js';
import '../../elements/items/offer-item.js';
export declare class CatalogOffers extends LitElement {
    get offers(): any;
    constructor();
    connectedCallback(): Promise<void>;
    _onClick(e: any): void;
    _onFabClick(event: any): void;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
