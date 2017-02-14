Package.describe({
  name: 'jag82:saves',
  version: '0.0.1',
  summary: 'a ready-to-use, generic saving/loading system for persistent objects',
  git: 'https://github.com/jag82/meteor-saves',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2');
  api.use('ecmascript');
  api.use('mongo', 'server');
  api.use('templating', 'client');
  api.use('less', 'client');

  api.addFiles([
    "server/collections/data.js",
    "server/methods/save.js",
    "server/methods/query.js",
    "server/methods/load.js"
  ], ['server']);

  api.addFiles([
    "client/saver.html",
    "client/loader.html",
    "client/combo.html",
    "client/saver.less",
    "client/loader.less",
    "client/combo.less",
    "client/saver.js",
    "client/loader.js",
    "client/combo.js"
  ], ['client']);

  api.mainModule('server/main.js', 'server');
  api.mainModule('client/main.js', 'client');

  api.export('jag82', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jag82:saves');
  api.mainModule('saves-tests.js');
});
