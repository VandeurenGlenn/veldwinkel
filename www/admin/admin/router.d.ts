export default class Router {
    static routes: {
        'media/images/albums': {
            tag: string;
        };
        'media/images/album': {
            tag: string;
        };
        'media/images/library': {
            tag: string;
        };
        'media/videos/albums': {
            tag: string;
        };
        'media/videos/library': {
            tag: string;
        };
        'catalog/products': {
            tag: string;
        };
        'catalog/categories': {
            tag: string;
        };
        'catalog/offers': {
            tag: string;
        };
        'catalog/product': {
            tag: string;
        };
        'catalog/offer': {
            tag: string;
        };
        'orders/order': {
            tag: string;
        };
        'collections/collection': {
            tag: string;
        };
        'catalog/products/add-product': {
            tag: string;
        };
        'catalog/offers/add-offer': {
            tag: string;
        };
        settings: {
            tag: string;
            import: string;
        };
    };
    host: any;
    constructor(host: any);
}
