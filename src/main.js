import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';

import App from './App';

console.log(process.env.VERSION);
console.log(process.env.PLATFORM);
console.log(process.env.NODE_ENV);

const render = (Component) => {
  /** use hydrate() to explicitly tell React to
   * hydrate existing HTML. Then it won't depend on
   * whether data-reactroot exists or not. */
  ReactDOM.hydrate(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    document.querySelector('#app')
  );
};

if (process.env.NODE_ENV !== 'local') {
  render(App);
} else {
  render(hot(App));
}
