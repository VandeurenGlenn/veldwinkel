module.exports = {
  templateFilePath: './service-worker.tmpl',
  staticFileGlobs: [
    'public/shop/assets/**',
    '!public/shop/service-worker.js',
    'public/shop/*.js',
    'public/shop/*.html',
    'public/shop/manifest.json'
  ],
  root: 'public/shop',
  stripPrefix: 'public/shop',
  runtimeCaching: [{
    urlPattern: /(.*)/,
    handler: 'fastest'
  }],
  importScripts: ['notification-listener.js']
};
