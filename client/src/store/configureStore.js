import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

const initialiseSagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line no-underscore-dangle
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk, initialiseSagaMiddleware)),
);

export default store;
