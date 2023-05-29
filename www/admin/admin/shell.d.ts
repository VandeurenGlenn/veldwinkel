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
import './menu/sub-menu.js';
import './menu/menu.js';
import './sections/catalog/catalog.js';
import './sections/media/media.js';
import Router from './router.js';
declare global {
    interface HTMLElementTagNameMap {
        'admin-shell': AdminShell;
    }
}
export default class AdminShell extends LitElement {
    router: Router;
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
    select(paths: any, selection: any): Promise<void>;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
