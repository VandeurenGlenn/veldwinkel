import { LitElement } from 'lit';
import '@material/web/field/outlined-field.js';
export declare class InputField extends LitElement {
    name: any;
    value: any;
    get event(): string;
    set event(value: string);
    set key(value: string);
    set ref(value: string);
    get key(): string;
    get ref(): string;
    connectedCallback(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
