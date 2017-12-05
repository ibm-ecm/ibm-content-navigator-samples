import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';

const historyMiddleware = routerMiddleware(history);
const middleware = applyMiddleware(historyMiddleware, thunk, promise());

export default createStore(reducers, middleware);
