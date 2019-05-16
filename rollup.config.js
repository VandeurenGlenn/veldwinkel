import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import { execSync } from 'child_process';
import { mkdirSync } from 'fs';

try {
  execSync('rm public/www/chunk-*.js');
  execSync('rm public/www/*.js');
  execSync('rm public/www/*.js.map');
  execSync('rm public/www/chunk-*.js.map');
} catch (e) {

}

try {
  execSync('rm public/admin/chunk-*.js');
  execSync('rm public/admin/*.js');
  execSync('rm public/admin/*.js.map');
  execSync('rm public/admin/chunk-*.js.map');
} catch (e) {
}

try {
  execSync('rm public/shop/*.js');
} catch (e) {

}

try {
  execSync('cp public/assets/icons public/admin/assets -r');
} catch (e) {
  mkdirSync('public/admin/assets');
  execSync('cp public/assets/icons public/admin/assets -r');
}

try {
  execSync('cp public/assets/icons public/shop/assets -r');
} catch (e) {
  mkdirSync('public/shop/assets');
  execSync('cp public/assets/icons public/shop/assets -r');
}

try {
  execSync('cp public/assets public/www -r');
} catch (e) {
  console.log(e);
}

const prepareAndCopy = (target) => {
  execSync(`rm public/${target}/* -r`);
  execSync(`cp src/${target}/index.html public/${target}`);
  execSync(`cp src/${target}/manifest.json public/${target}`);
  mkdirSync(`public/${target}/assets`);
  execSync(`cp public/assets/icons public/${target}/assets -r`);
};

prepareAndCopy('admin');
prepareAndCopy('shop');


export default [{
  input: ['src/iconset.js', 'src/top-icon-button.js', 'src/top-button.js',
    'src/home-imports.js'],
  output: {
    dir: 'public/www',
    format: 'es'
  },
  plugins: [
    json(),
    terser({ keep_classnames: true })
  ]
}, {
  input: ['src/iconset.js', 'src/shop/shell.js', 'src/shop/client-product.js', 'src/shop/item-list.js', 'src/shop/order-list.js', 'src/shop/top-client-order.js'],
  output: {
    dir: 'public/shop',
    format: 'es'
  },
  plugins: [
    json(),
    terser({ keep_classnames: true })
  ]
}, {
  input: [
    'src/admin/shell.js', 'src/admin/add-product.js', 'src/admin/add-offer.js',
    'src/top-button.js', 'src/iconset.js', 'src/admin/top-product.js',
    'src/admin/top-products.js', 'src/admin/top-sheet.js',
    'src/admin/top-offers.js', 'src/admin/top-offer.js',
    'src/admin/top-order.js', 'src/admin/top-orders.js',
    'src/admin/top-collections.js', 'src/admin/top-collection.js',
    'src/admin/top-collection-item.js'
  ],
  output: {
    dir: 'public/admin',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    json(),
    terser({ keep_classnames: true })
  ]
}];
