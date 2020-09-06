import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import flushChunks from 'webpack-flush-chunks';
import { flushChunkNames } from 'react-universal-component/server';
import { Provider } from 'react-redux';
import store from '../../src/store';
import { fetchTitleAsyn } from '../../src/store/action';
import 'isomorphic-fetch';
// import path from 'path';

import templateFn from './template';
import App from '../../src/App';

const renderTemplate = (clientStats, req, res, next) => {
  console.log('url:', req.url);
  const content = ReactDOMServer.renderToString(
    /**
     * if use Context like Provider etc,
     * data-reactroot attribute will be disppeared
     */
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  );
  console.log(content);
  const { js, styles, css, scripts } = flushChunks(clientStats, {
    chunkNames: flushChunkNames(),
    before: ['vendor', 'bootstrap'],
    after: ['client']
    // outputPath: path.resolve(__dirname, '../', '../', 'dist')
  });
  // console.log(js.toString());
  // console.log(styles.toString());
  // console.log(css.toString());
  // console.log(scripts.toString());
  const loadAssets = { js, styles };

  const template = templateFn(content, loadAssets, store.getState());
  return res.send(template);
};

const renderAll = async (clientStats, req, res, next) => {
  // load page data in server side
  await store.dispatch(fetchTitleAsyn('This is product page'));
  // render final html page in server side with data
  renderTemplate(clientStats, req, res, next);
};

const ssrRender = ({ clientStats }) => (req, res, next) => {
  console.log('initialState111:', store.getState());
  renderAll(clientStats, req, res, next);
};

export default ssrRender;
