const { merge } = require('webpack-merge');
const basicConfig = require('./webpack.client.js');
const webpack = require('webpack');
// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;
console.log('envvvv:', env);

const devConfig = {
  mode: 'development',
  resolve: {
    alias: {
      'react-dom': env !== 'local' ? 'react-dom' : '@hot-loader/react-dom'
    }
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.(c|sc)ss$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   // port: 3000,
  //   // open: true,
  //   // hot: true,
  //   overlay: true
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css'
    // })
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //   'process.env.VERSION': JSON.stringify(process.env.VERSION),
    //   'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM)
    // })
  ]
};

module.exports = merge(basicConfig(env), devConfig);
