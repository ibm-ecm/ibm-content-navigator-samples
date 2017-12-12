import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';


const historyMiddleware = routerMiddleware(history);
const middleware = applyMiddleware(historyMiddleware);

export default createStore(reducers, middleware);
