import { html } from 'lit';

export default html`
<header>
  <custom-tabs attr-for-selected="data-route">
    <custom-tab data-route="albums">
      <translated-string>albums</translated-string>
    </custom-tab>
    
    <custom-tab data-route="library">
      <translated-string>library</translated-string>
    </custom-tab>
  </custom-tabs>
</header>

<custom-pages attr-for-selected="data-route">
  <images-albums data-route="albums"></images-albums>
  <images-library data-route="library"></images-library>
</custom-pages>
`