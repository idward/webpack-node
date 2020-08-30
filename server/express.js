import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import expressStaticGzip from 'express-static-gzip';

import webpackDevConfig from '../config/webpack.client.dev';
import webpackProdConfig from '../config/webpack.client.prod';

console.log('env:', process.env.NODE_ENV);
console.log('port:', process.env.PORT);
const isProd = process.env.NODE_ENV === 'staging';

const app = express();

const port = process.env.PORT || 8080;

const config = isProd ? webpackProdConfig : webpackDevConfig;
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    writeToDisk: isProd
  })
);
if (!isProd) {
  // 开发环境开启热替换模式
  app.use(webpackHotMiddleware(compiler));
}

// const staticMiddleware = express.static(path.resolve(__dirname, '../dist'));
// app.use(staticMiddleware);

app.get('/about', (req, res) => {
  debugger;
  return res.json('done');
});

// 生产模式开启gzip压缩模式
app.use(expressStaticGzip(path.resolve(__dirname, '../dist')));

app.listen(port, () => {
  console.log(`Server is starting up at port ${port}`);
});
