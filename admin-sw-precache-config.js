module.exports = {
  staticFileGlobs: [
    'public/assets/**',
    '!public/admin/service-worker.js',
    'public/admin/**'
  ],
  root: 'public/admin',
  stripPrefix: 'public/'
};
