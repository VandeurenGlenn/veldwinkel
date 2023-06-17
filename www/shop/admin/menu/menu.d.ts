import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'top-menu': TopMenu;
    }
}
export declare class TopMenu extends LitElement {
    route: string;
    previousRoute: string;
    select(route: string): void;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
