module.exports = {
  staticFileGlobs: [
    'public/www/assets/**',
    '!public/www/service-worker.js',
    'public/www/*.js',
    'public/www/*.html'
  ],
  root: 'public/www',
  stripPrefix: 'public/www'
};
