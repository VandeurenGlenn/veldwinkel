import{d as e,R as t,C as s}from"./selector-mixin-ac7e516c.js";import"./select-mixin-bf4ecf3c.js";e(class CustomTabs extends(t(s(HTMLElement))){constructor(){super()}get template(){return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          /*align-items: flex-end;*/
          height: var(--custom-tabs-height, 48px);
        }
      </style>
      <slot></slot>
    `}});
