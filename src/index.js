import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import './index.css';
import App from './App';
import {
  taskListsReducer,
  activateSearchPanel,
  changeSearchInput,
  activateNewList,
  activateNewTask,
  setNewListTitle,
  setBannerForTodoState,
  typeNewTask
} from './reducers';
import { addNewTodoList } from './actionCreators';
import registerServiceWorker from './registerServiceWorker';

const appReducers = combineReducers({
  todos: taskListsReducer,
  activateSearch: activateSearchPanel,
  searchInput: changeSearchInput,
  activateNewList,
  newListTitle: setNewListTitle,
  bannerForTodoState: setBannerForTodoState,
  activateNewTask,
  typeNewTask
})

ReactDOM.render(
  <Provider store={
    createStore(
      appReducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
    >
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
