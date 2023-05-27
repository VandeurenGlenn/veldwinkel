import 'custom-svg-icon/src/custom-svg-icon.js';
import 'custom-pages/src/custom-pages.js';
import 'custom-tabs/custom-tabs.js';
import 'custom-tabs/custom-tab.js';
import 'custom-selector/src/index.js';
import 'custom-drawer';
import '../translator.js';
import '../translated-string.js';
import '@vandeurenglenn/flex-elements';
import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'admin-shell': AdminShell;
    }
}
export default class AdminShell extends LitElement {
    get pages(): Element;
    get selector(): Element;
    get drawer(): Element;
    get translatedTitle(): Element;
    set drawerOpened(value: boolean);
    get drawerOpened(): boolean;
    get menuIcon(): Element;
    constructor();
    connectedCallback(): Promise<void>;
    _preload(): Promise<void>;
    _onPopstate(): void;
    _menuClick(): void;
    _selectorChange(): Promise<void>;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
