import express from 'express';
import path from 'path';
import webpack from 'webpack';

import expressStaticGzip from 'express-static-gzip';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import webpackClientDevConfig from '../config/webpack.client.dev';
import webpackClientProdConfig from '../config/webpack.client.prod';
import webpackServerDevConfig from '../config/webpack.server.dev';
import webpackServerProdConfig from '../config/webpack.server.prod';

console.log('env:', process.env.NODE_ENV);
console.log('port:', process.env.PORT);
const isProd = process.env.NODE_ENV === 'staging';

const app = express();

const port = process.env.PORT || 8080;

app.get('/product/:title', (req, res) => {
  const title = req.params.title || 'FFFFFF';
  // console.log('title:', title);
  res.send({ title });
});

if (!isProd) {
  const compiler = webpack([webpackClientDevConfig, webpackServerDevConfig]);
  const clientCompiler = compiler.compilers[0];
  //   const serverCompiler = compiler.compilers[1];

  const { publicPath, path } = webpackClientDevConfig.output;

  // 优化热更新重复编译和动态创建文件的问题
  //   require('webpack-mild-compile')(compiler);

  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    serverSideRender: true,
    publicPath
  });

  const webpackHotMiddleware = require('webpack-hot-middleware')(
    clientCompiler
  );

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);

  app.use(
    webpackHotServerMiddleware(compiler, {
      chunkName: 'server',
      serverRendererOptions: {
        outputPath: path
      }
    })
  );
} else {
  webpack([webpackClientProdConfig, webpackServerProdConfig]).run(
    (err, stats) => {
      const ssrRender = require('../build/server.bundle.js').default;
      const clientStats = stats.toJson().children[0];

      // 生产模式开启gzip压缩模式
      app.use(expressStaticGzip(path.resolve(__dirname, '../dist')));

      app.use(ssrRender({ clientStats }));
    }
  );
}

// app.use(express.static(path.resolve(__dirname, '../', 'dist')));

app.listen(port, () => {
  console.log(`Server is starting up at port ${port}`);
});
