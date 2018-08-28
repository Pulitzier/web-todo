import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import Panel from './Panel';
import List from './List';
import {
  addNewTodoList,
  chooseList,
  activateNewList,
  setNewListTitle,
  activateTask,
  openSearchPanel
} from "../actionCreators";
import { getTasksForTodo } from '../helpers';
import UserSettings from "./UserSettings";

export default class LeftPanel extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    })
  };

  componentWillUnmount(){
    this.unsubscribe();
  };

  componentDidUpdate() {
    this.newListTitleInput.focus();
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos, tasks } } = state;

    const addNewList = () => {
    let newListTitle = 'Untitled Task';
    todos.map(item => {
      if (item.title.indexOf('Untitled Task') !== -1) {
        if (isNaN(parseInt(item.title.replace( /[^\d.]/g, '' )))) {
          newListTitle = 'Untitled Task ' + 1;
        } else {
          let index = parseInt(item.title.replace( /[^\d.]/g, '' )) + 1;
          newListTitle = 'Untitled Task '+index;
        };
      }
    });
    store.dispatch(setNewListTitle(newListTitle));
    store.dispatch(activateNewList(true));
  };

  const pushNewListToState = () => {
    store.dispatch(activateNewList(false));
    store.dispatch(addNewTodoList(state.newListTitle))
    store.dispatch(setNewListTitle('Untitled Task'));
  };

  const typeNewListTitle = (e) => {
    let newListTitle = e.target.value;
    store.dispatch(setNewListTitle(newListTitle));
  };

  const chooseListItem = (todoId) => {
    store.dispatch(openSearchPanel(false));
    store.dispatch(activateTask(false));
    store.dispatch(chooseList(todoId))
  };

  return (
    <Panel className="col-md-4 leftPanel">
      <UserSettings />
      <List className="nav flex-column my-todo-list">
        {todos.map(todo => {
          if (todo.todoListId < 3) {
            return (
              <li className={"nav-item "+ (todo.active ? 'active' : '')} key={todo.todoListId}>
                <a
                  className={"nav-link " + (todo.active ? 'active' : '')}
                  onClick={() => chooseListItem(todo.todoListId)}
                >
                  <img
                    src={(() => {
                      if(todo.title === 'My Day') {
                        return './assets/sun.svg'
                      }
                      if(todo.title === 'Important') {
                        return './assets/star.svg'
                      }
                      if(todo.title === 'To-Do') {
                        return './assets/home.svg'
                      }
                      return '';
                    })()}
                    alt='Categories Icon'
                  />
                  <p>{todo.title}</p>
                  <span>{(() => getTasksForTodo(tasks, todo).length ? getTasksForTodo(tasks, todo).length : '')()}</span>
                </a>
              </li>
            )
          }
        })}
      </List>
      <hr />
      <List className="nav flex-column todo-list">
        {todos.map(todo => {
          if (todo.todoListId >= 3) {
            return (
              <li
                className={"nav-item "+ (todo.active ? 'active' : '')}
                key={todo.todoListId}
              >
                <a
                  className="nav-link"
                  onClick={() => chooseListItem(todo.todoListId)}
                >
                  {todo.title}
                  <span></span>
                </a>
              </li>
            )
          }
        })}
      </List>
      <div className="add-new-list" onBlur={() => pushNewListToState()}>
        <input
          type="text"
          ref={node => this.newListTitleInput = node}
          className={"add-new-list-label "+(state.activateNewList ? 'active' : 'inactive')}
          onChange={typeNewListTitle}
          value={state.newListTitle}
          autoFocus={state.activateNewList}
        />
        <a
          className="add-new-list-link"
          onClick={() => addNewList()}
        >
          <span>+</span> New List
        </a>
      </div>
    </Panel>
  );
  }
};

LeftPanel.contextTypes = {
  store: PropTypes.object,
};