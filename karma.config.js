/* eslint-env node */

const fs = require('fs');

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox' ]
const browsers =
  (process.env.TEST_BROWSERS || 'ChromeHeadless')
    .replace(/^\s+|\s+$/, '')
    .split(/\s*,\s*/g);

// use puppeteer provided Chrome for testing
try {
  const chromePath = require('puppeteer').executablePath();
  if (fs.existsSync(chromePath)) {
    process.env.CHROME_BIN = chromePath;
  }
} catch (e) {

  // Fall back to system Chrome if puppeteer Chrome is not available
}


module.exports = function(karma) {
  karma.set({

    basePath: '.',

    frameworks: [
      'webpack',
      'mocha'
    ],

    files: [
      'test/*.js'
    ],

    preprocessors: {
      'test/*.js': [ 'webpack', 'env' ]
    },

    reporters: [ 'progress' ],

    browsers: browsers,

    browserNoActivityTimeout: 30000,

    singleRun: true,
    autoWatch: false,

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.bpmn$/,
            type: 'asset/source'
          }
        ]
      },
      resolve: {
        modules: [
          'node_modules'
        ]
      },
      devtool: 'eval-source-map'
    }
  });
};
