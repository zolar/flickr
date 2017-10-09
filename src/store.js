import _get from 'lodash/get';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const middleware = [thunkMiddleware];
// GET ENV VALUES FROM THE window to know which middleware to use.
const isDevelopment = _get(window, 'CONFIG.development');
const middlewareLogsOff = _get(window, 'CONFIG.middlewareLogsOff');

if (isDevelopment && !middlewareLogsOff) {
  const loggerMiddleware = createLogger();
  middleware.push(loggerMiddleware);
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default createStoreWithMiddleware(reducers);
