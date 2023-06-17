import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import typescript from '@rollup/plugin-typescript';
import { copy } from 'fs-extra';
import nodeResolve from '@rollup/plugin-node-resolve';

try {
  execSync('rm www/shop/**.js')
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

prepareAndCopy('shop');
// prepareAndCopy('shop');
await copy('src/shop/notification-listener.js', 'www/shop/notification-listener.js');

export default [{
  input: ['src/iconset.js', 'src/top-icon-button.js', 'src/home-imports.js', 'src/top-button.js', 'src/shop/sections/home.js', 'src/shop/shell.js', 'src/shop/client-product.js', 'src/shop/client-order.js', 'src/shop/item-list.js', 'src/shop/order-list.js', 'src/shop/top-client-order.js'],
  output: {
    dir: 'www/shop',
    format: 'es'
  },
  plugins: [
    typescript({ compilerOptions: { outDir: 'www/shop' }}),
    json(),
    nodeResolve(),
    terser({ keep_classnames: true })
  ]
}];
