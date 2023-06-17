import '../../../image-nails.js';
import '../../../custom-container.js';
import 'custom-input/custom-input.js';
import '@vandeurenglenn/custom-date/custom-date.js';
import '../../elements/input-fields/input-field.js';
import { LitElement } from 'lit';
import './../../../shop-admin-action-bar';
export default class CatalogOffer extends LitElement {
    #private;
    nails: any;
    actionBar: any;
    get publicIcon(): any;
    set selection(value: any);
    get addFieldIcon(): Element;
    constructor();
    connectedCallback(): void;
    addField(): Promise<void>;
    stamp(key: any): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
