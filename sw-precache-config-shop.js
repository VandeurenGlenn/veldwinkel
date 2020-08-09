module.exports = {
  templateFilePath: './service-worker.tmpl',
  staticFileGlobs: [
    'www/shop/assets/**',
    '!www/shop/service-worker.js',
    'www/shop/*.js',
    'www/shop/*.html',
    'www/shop/manifest.json'
  ],
  root: 'www/shop',
  stripPrefix: 'www/shop',
  runtimeCaching: [{
    urlPattern: /(.*)/,
    handler: 'fastest'
  }],
  importScripts: ['notification-listener.js']
};
