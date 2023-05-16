import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import { execSync } from 'child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import modify from 'rollup-plugin-modify'
import typescript from '@rollup/plugin-typescript';

try {
  execSync('rm www/**/**.js')
} catch {
  
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
  // execSync(`rm www/${target}/*.js`);
  let index = await readFileSync(`src/${target}/index.html`);
  index = index.toString();
  let isProduction = execSync('set production');
  console.log(isProduction.toString());
  isProduction = Boolean(isProduction.toString().split('=')[1] === 'true \r\n');
  index = index.replace('@build:sw', isProduction ? sw : '');
  await writeFileSync(`www/${target}/index.html`, index);
};

prepareAndCopy('admin');
prepareAndCopy('shop');
// prepareAndCopy('shop');
execSync('cp src/shop/notification-listener.js www/shop');
execSync('cp -r src/third-party www/admin');

export default [{
  input: ['src/iconset.js', 'src/top-icon-button.js', 'src/home-imports.js', 'src/top-button.js', 'src/shop/sections/home.js', 'src/shop/shell.js', 'src/shop/client-product.js', 'src/shop/client-order.js', 'src/shop/item-list.js', 'src/shop/order-list.js', 'src/shop/top-client-order.js'],
  output: {
    dir: 'www/shop',
    format: 'es'
  },
  plugins: [
    typescript({ compilerOptions: { outDir: 'www/shop' }}),
    json(),
    terser({ keep_classnames: true })
  ]
}, {
  input: [
    'src/admin/shell.ts',
    'src/ipfs-controller.js',
    'src/admin/add-product.js', 'src/admin/add-offer.js',
    'src/top-button.js', 'src/iconset.js', 'src/admin/top-product.js',
    'src/admin/top-products.js', 'src/admin/top-sheet.js',
    'src/admin/sections/top-offers.ts', 'src/admin/sections/top-offer.ts',
    'src/admin/top-order.js', 'src/admin/top-orders.js',
    'src/admin/top-collections.js', 'src/admin/top-collection.js',
    'src/admin/top-collection-item.js',
    'src/admin/webp-worker.js'
  ],
  external: [
    './sections/top-offer.js'
  ],

  output: {
    dir: 'www/admin',
    format: 'es'
  },
  plugins: [
    typescript({ compilerOptions: { outDir: 'www/admin', "experimentalDecorators": true }}),
    json(),
    resolve(),
    cjs(),
    // terser({ keep_classnames: true })
  ]
}];
