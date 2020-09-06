const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');
const nodeExternals = require('./node-externals.js');

const config = {
  name: 'server',
  target: 'node',
  externals: nodeExternals, // exclude node_modules
  entry: {
    server: './server/ssr/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../', 'build'),
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
        loader: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 限制打包图片大小 base64
              name: 'images/[name]-[hash:8].[ext]',
              emitFile: false
              // publicPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]',
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', 'ts', '.tsx', '.json']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new ExtractCssChunksPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new WebpackMd5Hash(),
    new CleanWebpackPlugin({}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify(process.env.VERSION),
      'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM)
    })
  ]
};

module.exports = config;
