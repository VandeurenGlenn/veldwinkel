module.exports = {
  staticFileGlobs: [
    '!public/admin/**',
    'public/assets/**',
    '!public/service-worker.js',
    '!public/shop/**',
    'public/*.js',
    'public/*.html'
  ],
  root: 'public',
  stripPrefix: 'public/'
};
