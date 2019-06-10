import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import { execSync } from 'child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';

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

const sw = `
try {
  window.registration = await navigator.serviceWorker.register('/service-worker.js');
  registration.onupdatefound = () => {
    // notifyUpdate();
  };
  console.log('Registration successful, scope is:', registration.scope);
} catch (error) {
  console.log('Service worker registration failed, error:', error);
}`;

const prepareAndCopy = async (target) => {
  execSync(`rm public/${target}/* -r`);
  execSync(`cp src/${target}/index.html public/${target}`);
  let index = await readFileSync(`public/${target}/index.html`);
  index = index.toString();
  let isProduction = execSync('set production');
  isProduction = Boolean(isProduction.toString().split('=')[1] === 'true \r\n');
  index = index.replace('@build:sw', isProduction ? sw : '');
  await writeFileSync(`public/${target}/index.html`, index);
  execSync(`cp src/${target}/manifest.json public/${target}`);
  mkdirSync(`public/${target}/assets`);
  execSync(`cp public/assets/icons public/${target}/assets -r`);
};

prepareAndCopy('admin');
prepareAndCopy('shop');
execSync('cp src/shop/notification-listener.js public/shop');

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
    format: 'es',
    sourcemap: true
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
