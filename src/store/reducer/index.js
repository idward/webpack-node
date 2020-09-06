import { combineReducers } from 'redux';
import productReducer from './product.reducer';

const rootReducers = combineReducers({
  product: productReducer
});

export default rootReducers;
