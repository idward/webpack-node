import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';

const enhancer =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

let initialState;
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__;
} else {
  initialState = { product: { title: 'AAAA' } };
}

console.log('initialState:', initialState);

const store = createStore(
  reducers,
  initialState,
  enhancer(applyMiddleware(thunk))
);

// if (module.hot) {
//   module.hot.accept('./reducer', () => {
//     store.replaceReducer(require('./reducer').product);
//   });
// }

export default store;
