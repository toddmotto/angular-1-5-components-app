const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    webpack: webpackConfig,
    files: [
      'src/app/root.module.js',
      'mocks/firebase.mock.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/app/**/*.spec.js',
    ],
    exclude: [
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter'),
      require('karma-webpack'),
    ],
    preprocessors: {
      'src/app/root.module.js': ['webpack'],
      'src/app/**/*.spec.js': ['webpack'],
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
