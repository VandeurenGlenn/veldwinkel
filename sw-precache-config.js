module.exports = {
  staticFileGlobs: [
    'www/assets/**',
    '!www/service-worker.js',
    '!www/admin',
    '!www/shop',
    'www/*.js',
    'www/*.html'
  ],
  root: 'www',
  stripPrefix: 'www'
};
