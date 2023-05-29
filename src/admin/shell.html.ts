import { html } from 'lit';

export default html`
<header class="main">
  <custom-svg-icon icon="menu" class="menu"></custom-svg-icon>
  <translated-string name="title"></translated-string>
</header>

<custom-drawer>
  <top-menu slot="content" attr-for-selected="data-route" selected="">

    <menu-item headline="orders"></menu-item>

    <menu-item headline="collections"></menu-item>

    <sub-menu headline="catalog">
      <menu-item headline="categories" route="catalog/categories"></menu-item>

      <menu-item headline="offers" route="catalog/offers"></menu-item>

      <menu-item headline="products" route="catalog/products"></menu-item>
    </sub-menu>

    <sub-menu headline="media">

      <sub-menu headline="images">
        <menu-item headline="albums" route="media/images/albums"></menu-item>
        <menu-item headline="library" route="media/images/library"></menu-item>
      </sub-menu>
      

      <sub-menu headline="videos">
        <menu-item headline="albums" route="media/videos/albums"></menu-item>
        <menu-item headline="library" route="media/videos/library"></menu-item>
      </sub-menu>
    </sub-menu>

    <flex-it flex="1"></flex-it>

    <menu-item headline="settings" route="settings"></menu-item>
  </top-menu>
</custom-drawer>
<slot></slot>
`