export default class Router {
  static routes = {
    'media/images/albums': {
      tag: 'images-albums'
    },
    'media/images/album': {
      tag: 'images-album'
    },
    'media/images/library': {
      tag: 'images-library'
    },
    'media/videos/albums': {
      tag: 'videos-albums'
    },
    'media/videos/library': {
      tag: 'videos-library'
    },
    'catalog/products': {
      tag: 'catalog-products'
    },
    'catalog/categories': {
      tag: 'top-categories'
    },
    'catalog/offers': {
      tag: 'catalog-offers'
    },

    'catalog/product': {
      tag: 'catalog-product'
    },
    'catalog/offer': {
      tag: 'catalog-offer'
    },
    'orders/order': {
      tag: 'top-order'
    },
    'collections/collection': {
      tag: 'top-collection'
    },
    'catalog/products/add-product': {
      tag: 'add-product'
    },
    'catalog/offers/add-offer': {
      tag: 'add-offer'
    },
    settings: {
      tag: 'settings-section',
      import: 'settings'
    }
  }
  host
  constructor(host) {
    this.host = host
    globalThis.onhashchange = () => {
      const hash = location.hash
      const url = new URL(hash.split('#!/')[1], location.origin)
      console.log(url.search);
      for (const e of  url.searchParams.entries()) {
        console.log(e);
      }

      const paths = url.pathname.split('/')
      paths.shift()

      const selection = url.searchParams.get('selected')

      console.log({selection});
      const selected = paths.join('/')
      history.pushState({selected}, selected, `#!/${selection ? `${selected}?selected=${selection}` : selected}`);
      this.host.select(paths, selection)
    }
    if (!location.hash) location.hash = '#!/catalog/offers'
    onhashchange()
  }


  
}