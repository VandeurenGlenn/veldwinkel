import { html } from 'lit';

export default html`
<header class="main">
  <custom-svg-icon icon="menu" class="menu"></custom-svg-icon>
  <translated-string name="title"></translated-string>
</header>

<custom-drawer>
  <header slot="header">
    <h3>Guldentop veldwinkel</h3>
  </header>
  <custom-selector slot="content" attr-for-selected="data-route" selected="">

    <span class="row selection" data-route="orders" >
      bestellingen
    </span>
    
    <span class="row selection" data-route="collections" >
      
      
      <translated-string>collections</translated-string>
    </span>
            
    <span class="row selection" data-route="catalog" subber>
      <custom-svg-icon icon="chevron-right"></custom-svg-icon>
      
      <translated-string>catalog</translated-string>
    </span>
    
    <span class="row selection" data-route="categories" menu-item="catalog">          
      <translated-string>categories</translated-string>
    </span>
    
    <span class="row selection" data-route="offers"  menu-item="catalog">
      <translated-string>offers</translated-string>
    </span>

    <span class="row selection" data-route="products" menu-item="catalog">
      <translated-string>products</translated-string>
    </span>

    <span class="row selection" data-route="media" subber>
      <custom-svg-icon icon="chevron-right"></custom-svg-icon>
      
      <translated-string>media</translated-string>
    </span>
    
    <span class="row selection" data-route="images" menu-item="media">          
      <translated-string>images</translated-string>
    </span>
    
    <span class="row selection" data-route="videos"  menu-item="media">
      <translated-string>videos</translated-string>
    </span>
    <!-- <span class="row selection" data-route="sheet" >
      <custom-svg-icon icon="info"></custom-svg-icon>
      <span class="flex"></span>
      sheet
    </span> -->

    <span class="flex" style="pointer-events: none;"></span>

    <span class="row selection" data-route="settings" >
      <custom-svg-icon icon="settings"></custom-svg-icon>
      <span class="flex"></span>
      settings
    </span>

  </custom-selector>
</custom-drawer>
<slot></slot>
`