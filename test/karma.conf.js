const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader?silent=true',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|\.spec\.ts$)/,
        loader: 'istanbul-instrumenter-loader',
        enforce: 'post',
        options: {
          esModules: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

module.exports = function(config) {
  config.set({
    basePath: './',

    browsers: ['PhantomJS'],

    frameworks: ['mocha'],

    singleRun: true,

    files: ['fixtures/typescript/test/test.spec.ts'],

    preprocessors: {
      'fixtures/typescript/test/test.spec.ts': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only',
      logLevel: 'silent',
    },

    coverageIstanbulReporter: {
      fixWebpackSourcePaths: true,
      reports: ['json-summary'],
      dir: path.join(__dirname, 'fixtures', 'outputs'),
    },
  });
};
