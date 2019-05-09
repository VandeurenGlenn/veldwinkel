import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import { execSync } from 'child_process';
import { mkdirSync } from 'fs';
try {
  execSync('rm public/www/chunk-*.js');
} catch (e) {

}

try {
  execSync('rm public/admin/chunk-*.js');
} catch (e) {
}

try {
  execSync('rm public/shop/chunk-*.js');
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
  execSync('cp public/assets public/www -r')
} catch (e) {
  console.log(e);
}

export default [{
  input: ['src/iconset.js', 'src/top-icon-button.js', 'src/top-button.js',
          'src/home-imports.js', 'src/item-list.js', 'src/order-list.js',
          'src/top-client-order.js'],
  output: {
    dir: 'public/www',
    format: 'es'
  },
  plugins: [
    terser({keep_classnames: true})
  ]
}, {
  input: ['src/iconset.js', 'src/app-shell.js'],
  output: {
    dir: 'public/shop',
    format: 'es'
  },
  plugins: [
    json(),
    terser({keep_classnames: true})
  ]
}, {
  input: [
    'src/admin/shell.js', 'src/top-button.js', 'src/iconset.js', 'src/admin/top-product.js', 'src/admin/top-products.js',
    'src/admin/top-sheet.js', 'src/admin/top-offers.js', 'src/admin/top-offer.js',
    'src/admin/top-order.js'
  ],
  output: {
    dir: 'public/admin',
    format: 'es'
  },
  plugins: [
    terser({keep_classnames: true})
  ]
}]
