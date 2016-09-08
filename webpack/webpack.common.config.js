import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

import base from '../src/base/';

export const mainPath = path.resolve(__dirname, '..');
export const buildPath = path.resolve(__dirname, '..', 'dist');
export const basePath = path.resolve(__dirname, '../src/base');
export const manifestPath = path.resolve(basePath, 'manifest');
export const clientPath = path.resolve(__dirname, '../src/base/client/');
export const context = path.resolve(__dirname, '../');

export const entry = {
  vendor: [
    'react',
    'redux',
    'react-dom',
    'immutable',
    'classnames',
    'react-redux',
    'react-router',
    'isomorphic-fetch',
  ]
};

export const output = {
  path: buildPath,
  library: "[name]",
  filename: '[name].js',
  chunkFilename: "[name].js",
  publicPath: '/'
};

export const plugins = [
  new ProgressBarPlugin({
    format: `[BASE] ${chalk.blue('i')} Bundling... [:bar] ${chalk.green(':percent')} (:elapsed seconds)`,
    clear: true,
    summary: false,
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(true),
];

export const postcss = [
  require('postcss-import')({ addDependencyTo: webpack }),
  require('postcss-cssnext')(),
  require('postcss-modules-extract-imports'),
  require('postcss-nested')(),
  require('postcss-reporter')(),
  require('postcss-url')()
];

export const resolve = {
  extensions: ['', '.js', '.jsx', '.css'],
  modulesDirectories: ['node_modules'],
  alias: {
    'app': path.resolve(__dirname, '../src/app'),
    'base': path.resolve(__dirname, '../src/base'),
    'store': path.resolve(__dirname, '../src/base/store'),
    'mocks': path.resolve(__dirname, '../server/api/mocks'),
    'containers': path.resolve(__dirname, '../src/app/containers'),
    'components': path.resolve(__dirname, '../src/base/shared/components')
  }
};


export const compileError = function() {
  this.plugin('done', function(stats) {
    if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
      base.console.error(stats.compilation.errors);
    }
  });
};
