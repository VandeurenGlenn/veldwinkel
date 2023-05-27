import { LitElement } from 'lit';
export declare class InputFields extends LitElement {
    static get observedAttributes(): string[];
    constructor();
    set fields(value: any);
    get fields(): any;
    connectedCallback(): void;
    attributeChangedCallback(name: any, old: any, value: any): void;
    get template(): import("lit-html").TemplateResult<1>;
}
