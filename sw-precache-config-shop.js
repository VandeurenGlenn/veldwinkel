module.exports = {
  staticFileGlobs: [
    'public/shop/**',
    'public/shop/assets/icons/**',
    '!public/shop/service-worker.js',
    'public/shop/*.js',
    'public/shop/*.html'
  ],
  root: 'public/shop',
  stripPrefix: 'public/shop'
};
