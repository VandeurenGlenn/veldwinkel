import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import { execSync } from 'child_process';

try {
  execSync('rm public/chunk-**');
} catch (e) {

}

export default [{
  input: ['src/iconset.js', 'src/top-icon-button.js', 'src/top-button.js', 'src/home-imports.js'],
  output: {
    dir: 'public',
    format: 'es'
  },
  plugins: [
    terser({keep_classnames: true})
  ]
}, {
  input: ['src/app-shell.js'],
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
    'src/admin-shell.js', 'src/top-product.js', 'src/top-products.js',
    'src/top-sheet.js', 'src/top-offers.js', 'src/top-offer.js',
    'src/top-order.js'
  ],
  output: {
    dir: 'public/admin',
    format: 'es'
  },
  plugins: [
    terser({keep_classnames: true})
  ]
}]
