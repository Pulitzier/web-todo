import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import './index.css';
import App from './components/App';
import {
  todosReducer,
  activateSearchPanel,
  changeSearchInput,
  activateNewList,
  setNewListTitle,
  setBannerForTodoState,
  tasksReducer
} from './reducers';
import { addNewTodoList } from './actionCreators';
import registerServiceWorker from './registerServiceWorker';

const appReducers = combineReducers({
  todos: todosReducer,
  activateSearch: activateSearchPanel,
  searchInput: changeSearchInput,
  activateNewList,
  newListTitle: setNewListTitle,
  bannerForTodoState: setBannerForTodoState,
  tasks: tasksReducer
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
