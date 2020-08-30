import React from 'react';
import ReactDOMServer from 'react-dom/server';
import flushChunks from 'webpack-flush-chunks';
import { flushChunkNames } from 'react-universal-component/server';
// import path from 'path';

import templateFn from './template';
import App from '../../src/App';

const ssrRender = ({ clientStats }) => (req, res, next) => {
  // const content = ReactDOMServer.renderToString(<App />);
  const content = ReactDOMServer.renderToString(<App />);
  const { js, styles, css, scripts } = flushChunks(clientStats, {
    chunkNames: flushChunkNames(),
    before: ['vendor', 'bootstrap'],
    after: ['client'],
    // outputPath: path.resolve(__dirname, '../', '../', 'dist')
  });
  console.log(js.toString());
  console.log(styles.toString());
  // console.log(css.toString());
  // console.log(scripts.toString());
  const loadAssets = { js, styles };

  const template = templateFn(content, loadAssets);
  return res.send(template);
};

export default ssrRender;
