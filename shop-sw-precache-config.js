module.exports = {
  staticFileGlobs: [
    'public/assets/**',
    '!public/service-worker.js',
    '!public/shop/service-worker.js',
    'public/shop/**'
  ],
  root: 'public/shop',
  stripPrefix: 'public/'
};
