import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import './styles/index.css';
import throttle from 'lodash/throttle';
import AppWrapper from './components/AppWrapper';
import {
  appReducer,
  setSearchState,
  setTaskSettings,
  handleUserSettings,
} from './reducers';
import { loadState, saveState } from './helpers';
import registerServiceWorker from './registerServiceWorker';

const persistedState = loadState();

const globalReducer = combineReducers({
  app: appReducer,
  search: setSearchState,
  taskSettings: setTaskSettings,
  userSettings: handleUserSettings,
});

const store = createStore(
  globalReducer,
  persistedState,
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

localStorage.clear();

ReactDOM.render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
