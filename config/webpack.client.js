const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

const config = (env) => {
  return {
    name: 'client',
    devtool: env !== 'local' ? false : 'cheap-module-source-map',
    entry: {
      client:
        env !== 'local'
          ? './src/main.js'
          : ['./src/main.js', 'webpack-hot-middleware/client?noInfo=true']
    },
    output: {
      filename:
        env !== 'local' ? '[name].[hash:10].bundle.js' : '[name].bundle.js',
      // chunkFilename: '[name].js',
      path: path.resolve(__dirname, '../', 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        // {
        //   test: /\.(js|jsx)$/,
        //   exclude: /node_modules/,
        //   enforce: 'pre',
        //   use: [
        //     {
        //       loader: 'eslint-loader',
        //     }
        //   ]
        // },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'eslint-loader'
              // options: {
              //   emitWarning: true
              // }
            }
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            // {
            //   loader:
            //     env !== 'local' ? MiniCssExtractPlugin.loader : 'style-loader'
            // },
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: env !== 'local' ? false : true
              }
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
                name: 'images/[name]-[hash:8].[ext]'
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
                name: 'font/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', 'ts', '.tsx', '.json']
    },
    optimization: {
      runtimeChunk: {
        name: 'bootstrap'
      },
      splitChunks: {
        chunks: 'initial',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor'
          }
        }
      }
    },
    // optimization: {
    //   // runtimeChunk: 'single',
    //   splitChunks: {
    //     // chunks: 'all',
    //     //   maxInitialRequests: Infinity,
    //     //   minSize: 0,
    //     cacheGroups: {
    //       //   styles: {
    //       //     name: 'styles',
    //       //     test: /\.(c|sc)ss$/,
    //       //     chunks: 'all',
    //       //     enforce: true
    //       //   }
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendor',
    //         chunks: 'all'
    //         //   name(module) {
    //         //     const packageName = module.context.match(
    //         //       /[\\/]node_modules[\\/](.*?)([\\/]|$)/
    //         //     )[1];
    //         //     // console.log("packageName:", packageName);
    //         //     return `npm.${packageName.replace('@', '')}`;
    //         //   }
    //       }
    //     }
    //   }
    // },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin({
        filename: env !== 'local' ? '[name].[contenthash:10].css' : '[name].css'
      }),
      // new ExtractCssChunksPlugin(),
      // new webpack.NamedModulesPlugin(),
      // new HtmlWebpackPlugin({
      //   template: path.resolve(__dirname, '../', 'index.html'),
      //   filename: 'index.html',
      //   favicon: path.resolve(__dirname, '../', 'public', 'favicon.ico')
      // }),
      new WebpackMd5Hash(),
      new CleanWebpackPlugin({}),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.VERSION': JSON.stringify(process.env.VERSION),
        'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM)
      })
      // new BundleAnalyzerPlugin()
    ]
  };
};

module.exports = config;
