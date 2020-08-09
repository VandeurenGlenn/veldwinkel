module.exports = {
  staticFileGlobs: [
    'www/admin/**',
    'www/admin/assets/icons/**',
    '!www/admin/service-worker.js',
    'www/admin/*.js',
    'www/admin/*.html'
  ],
  root: 'www/admin',
  stripPrefix: 'www/admin'
};
