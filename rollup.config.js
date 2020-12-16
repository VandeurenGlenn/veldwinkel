import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import { execSync } from 'child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import modify from 'rollup-plugin-modify'

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
execSync('cp src/shop/index.html www/index.html');
execSync('cp src/shop/notification-listener.js www/shop');
execSync('cp src/third-party www/admin -r');

export default [{
  input: ['src/iconset.js', 'src/top-icon-button.js', 'src/home-imports.js', 'src/top-button.js', 'src/shop/sections/home.js', 'src/shop/shell.js', 'src/shop/client-product.js', 'src/shop/client-order.js', 'src/shop/item-list.js', 'src/shop/order-list.js', 'src/shop/top-client-order.js'],
  output: {
    dir: 'www/shop',
    format: 'es'
  },
  plugins: [
    json(),
    terser({ keep_classnames: true })
  ]
}, {
  input: [
    'src/ipfs-controller.js',
    'src/admin/shell.js', 'src/admin/add-product.js', 'src/admin/add-offer.js',
    'src/top-button.js', 'src/iconset.js', 'src/admin/top-product.js',
    'src/admin/top-products.js', 'src/admin/top-sheet.js',
    'src/admin/top-offers.js', 'src/admin/top-offer.js',
    'src/admin/top-order.js', 'src/admin/top-orders.js',
    'src/admin/top-collections.js', 'src/admin/top-collection.js',
    'src/admin/top-collection-item.js',
    'src/admin/webp-worker.js'
  ],
  output: {
    dir: 'www/admin',
    format: 'es'
  },
  plugins: [
    json(),
    resolve(),
    cjs(),
    terser({ keep_classnames: true })
  ]
}, {
	input: ['src/service-worker.js'],
	output: {
		dir: './www',
		format: 'es',
		sourcemap: false
	},
	plugins: [
		json(),
    modify({
			SW_HASH: new Date().getTime()
    })
	]
}];
