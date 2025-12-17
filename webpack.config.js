'use strict';

/* eslint-env node */

const path = require('path');

module.exports = {
  devtool: 'source-map',
  performance: { hints: false },
  entry: './index.js',
  output: {
    // The name under which the lib will be exported.
    library: 'HtmlToRtfBrowser',

    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!htmlparser2)/, // transpile htmlparser2
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: "defaults" }]]
          }
        }
      }
    ]
  }
};
