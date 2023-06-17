import { LitElement, nothing } from 'lit';
import '@material/web/list/list-item-link.js';
export declare class MenuItem extends LitElement {
    headline: string;
    route: string;
    noninteractive: boolean;
    private _anchor;
    connectedCallback(): Promise<void>;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
