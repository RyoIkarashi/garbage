import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools'

const configureStore = (initialState = {}) => {

  const enhancer = compose(
    applyMiddleware(
      thunk,
      routerMiddleware(browserHistory),
      createLogger()
    ),
    DevTools.instrument()
  );

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
