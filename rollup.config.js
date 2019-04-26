import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import { execSync } from 'child_process';

try {
  execSync('rm public/chunk-**');
} catch (e) {

}

export default [{
  input: ['src/iconset.js', 'src/top-icon-button.js', 'src/home-imports.js'],
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
  input: ['src/admin-shell.js'],
  output: {
    dir: 'public/admin',
    format: 'es'
  },
  plugins: [
    terser({keep_classnames: true})
  ]
}]
