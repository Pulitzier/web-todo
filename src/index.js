import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import {
  appReducer,
  activateSearchPanel,
  activateNewList,
  setNewListTitle,
  setBannerForTodoState,
  setTaskSettings,
  activateUserSettings
} from './reducers';
import { loadState, saveState } from "./helpers";
import throttle from 'lodash/throttle';
import registerServiceWorker from './registerServiceWorker';

const persistedState = loadState();

const globalReducer = combineReducers({
  app: appReducer,
  activateSearch: activateSearchPanel,
  activateNewList,
  newListTitle: setNewListTitle,
  bannerForTodoState: setBannerForTodoState,
  taskSettings: setTaskSettings,
  userSettings: activateUserSettings
});

const store = createStore(
  globalReducer,
  persistedState
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

localStorage.clear();

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
