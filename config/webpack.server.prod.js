const { merge } = require('webpack-merge');
const basicConfig = require('./webpack.server.js');
const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV;
console.log('envvvv:', env);

const devConfig = {
  mode: 'production',
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = merge(basicConfig, devConfig);