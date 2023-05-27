import { css } from 'lit';

export default css`
:host {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  color: #eee;
  background: #445c68;
  --svg-icon-color: #eee;
}
custom-drawer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  transform: translateX(-105%);
  background: #1a1f229e;
}
::slotted(custom-pages) {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  top: 56px;
  left: 0;
  background: #1a1f229e;
}
translated-string[name="title"] {
  padding-left: 12px;
  text-transform: uppercase;
}
header {
  display: flex;
  align-items: center;
  height: 56px;
  min-height: 56px;
  background: #38464e;
  position: absolute;
  box-sizing: border-box;
  right: 0;
  width: 100%;
  padding: 24px;
  color: #eee;
}
custom-drawer header {
  position: relative;
  justify-content: center;
}
:host([drawer-opened]) custom-drawer {
  opacity: 1;
  transform: translateX(0);
}
header h3 {
  margin: 0;
  font-size: 20px;
}
custom-drawer .selection {
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 12px;
  text-transform: uppercase;
  cursor: pointer;
  color: #eee;
}
custom-drawer .custom-selected {
  background: #eee;
  color: #616161;
  --svg-icon-color: #616161;
}
custom-drawer custom-svg-icon {
  pointer-events: none;
}
custom-drawer {
  position: fixed;
  z-index: 100;
}
.flex {
  flex: 1;
}

custom-selector {
  height: 100%;
}
section {
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
[menu-item] {
  transform: scale(0);
  height: 0px !important;
  padding: 0 !important;
}
[menu-item][shown] {
  height: auto !important;
  padding: 12px 12px 12px 36px !important;
  transform: scale(1);
}
[data-route="catalog"][shown] custom-svg-icon {
  transform: rotate(90deg)
}
@media (min-width: 720px) {
  section {
    align-items: center;
    justify-content: center;
  }
  .container {
    max-width: 640px;
  }
  custom-drawer {
    position: absolute;
  }
  :host([drawer-opened]) ::slotted(custom-pages) {
    left: var(--custom-drawer-width);
    width: calc(100% - 256px);
  }
  :host([drawer-opened]) .main {
    left: var(--custom-drawer-width);
    width: calc(100% - 256px) !important;
  }
}
`