import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import typescript from '@rollup/plugin-typescript';
import { copy } from 'fs-extra';
import builtins from 'rollup-plugin-node-builtins';

try {
  execSync('rm www/admin/**.js')
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
await copy('src/third-party', 'www/admin');

export default [{
  input: [
    'src/admin/shell.ts',
    'src/admin/api.ts',
    'src/admin/add-product.js', 'src/admin/add-offer.js',
    'src/top-button.js', 'src/iconset.js', 'src/admin/top-product.js',
    'src/admin/top-products.js', 'src/admin/top-sheet.js',
    'src/admin/sections/top-offers.ts', 'src/admin/sections/top-offer.ts',
    'src/admin/top-order.js', 'src/admin/top-orders.js',
    'src/admin/top-collections.js', 'src/admin/top-collection.js',
    'src/admin/sections/settings.ts', 'src/admin/sections/images/images.ts',
    'src/admin/top-collection-item.js',
    'src/admin/sections/images/library.ts',
    'src/admin/sections/images/albums.ts'
  ],
  external: [
    './sections/top-offer.js'
  ],

  output: {
    dir: 'www/admin',
    format: 'es'
  },
  plugins: [
    json(),
    resolve(),
    cjs(),
    builtins(),
    typescript({ compilerOptions: { outDir: 'www/admin', "experimentalDecorators": true }})
    // terser({ keep_classnames: true })
  ]
}, {
  input: [
    'src/admin/webp-worker.js'
  ],
  output: [{
    format: 'es',
    dir: './www/admin'
  }]
}];
