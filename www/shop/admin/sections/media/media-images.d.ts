import { LitElement } from 'lit';
import 'custom-tabs/custom-tab.js';
import 'custom-tabs/custom-tabs.js';
export default class MediaImages extends LitElement {
    #private;
    selected: string;
    constructor();
    static styles: import("lit").CSSResult[];
    select(route: any): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
