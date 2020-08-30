import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import App from './App';

console.log(process.env.VERSION);
console.log(process.env.PLATFORM);
console.log(process.env.NODE_ENV);

const render = (Component) => {
  ReactDOM.hydrate(<Component />, document.querySelector('#app'));
};

if (process.env.NODE_ENV !== 'local') {
  render(App);
} else {
  render(hot(App));
}
