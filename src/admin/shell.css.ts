import { css } from 'lit';

export default css`
:host {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  color: #eee;
  background: var(--surface-color);
  --svg-icon-color: #eee;
}
custom-drawer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  transform: translateX(-105%);
  background: #2d2f31;
  border-bottom-right-radius: 24px;
  border-top-right-radius: 24px;
}
::slotted(custom-pages) {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  top: 56px;
  left: 0;
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
  background: var(--surface-color);
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

md-list {
  height: 100%;
}

@media (min-width: 720px) {
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