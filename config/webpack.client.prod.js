const { merge } = require('webpack-merge');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const basicConfig = require('./webpack.client.js');

const env = process.env.NODE_ENV;
console.log('envvvv:', env);

const prodConfig = {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 51200,
    maxAssetSize: 51200
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'style.[name].[contenthash:10].css'
    // }),
    // new ExtractCssChunksPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip'
    })
  ]
};

module.exports = merge(basicConfig(env), prodConfig);
