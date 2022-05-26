import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware'

import reducers from './reducers';

const promise = createPromise({ types: { fulfilled: 'success' } });
const middleware = applyMiddleware(promise, thunk);

export default createStore(reducers, middleware);