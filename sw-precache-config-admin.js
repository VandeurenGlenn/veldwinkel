module.exports = {
  staticFileGlobs: [
    'public/admin/**',
    'public/admin/assets/icons/**',
    '!public/admin/service-worker.js',
    'public/admin/*.js',
    'public/admin/*.html'
  ],
  root: 'public/admin',
  stripPrefix: 'public/admin'
};
