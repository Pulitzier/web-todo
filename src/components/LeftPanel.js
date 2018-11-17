import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicPanel from './BaseComponents/BasicPanel';
import List from './List';
import {
  addNewTodoList,
  chooseList,
  activateTask,
  openSearchPanel,
  activateTaskSettings,
} from '../store/actions/index';
import { getActiveTask, getTasksForTodo } from '../helpers';
import UserModalSettings from './UserModalSettings';

export default class LeftPanel extends Component {
  constructor(props) {
    super(props);
    this.activateNewList = this.activateNewList.bind(this);
    this.pushNewListToState = this.pushNewListToState.bind(this);
    this.chooseListItem = this.chooseListItem.bind(this);
    this.setNewListTitle = this.setNewListTitle.bind(this);
    this.addNewList = this.addNewList.bind(this);
    this.state = {
      activateList: false,
      newListTitle: 'Untitled Todo',
    };
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  activateNewList(bool) {
    this.setState({ activateList: bool });
  }

  setNewListTitle(title) {
    this.setState({ newListTitle: title });
  }

  pushNewListToState() {
    const { store } = this.context;
    this.activateNewList(false);
    store.dispatch(addNewTodoList(this.state.newListTitle));
    this.setNewListTitle('Untitled Todo');
  }

  chooseListItem(todoId) {
    const { store } = this.context;
    const { app: { tasks } } = store.getState();
    const { id: activeTaskId } = getActiveTask(tasks);
    store.dispatch(openSearchPanel(false));
    store.dispatch(activateTask(false));
    store.dispatch(activateTaskSettings(activeTaskId, false));
    store.dispatch(chooseList(todoId));
  }

  addNewList() {
    const { store } = this.context;
    const { app: { categories } } = store.getState();
    store.dispatch(openSearchPanel(false));
    let { newListTitle } = this.state;
    categories.map((todo) => {
      if (todo.title.indexOf('Untitled Todo') !== -1) {
        if (isNaN(parseInt(todo.title.replace(/[^\d.]/g, ''), 10))) {
          newListTitle = `Untitled Todo ${1}`;
        } else {
          const index = parseInt(todo.title.replace(/[^\d.]/g, ''), 10) + 1;
          newListTitle = `Untitled Todo ${index}`;
        }
      }
    });
    this.setNewListTitle(newListTitle);
    this.activateNewList(true);
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    const { app: { categories, tasks } } = state;
    const { activateList, newListTitle } = this.state;

    const addNewList = (event) => {
      const { key } = event;
      if (key === 'Enter') {
        this.pushNewListToState();
      }
    };

    const renderTodoTaskNumber = (tasks, todoListId) => {
      if (getTasksForTodo(tasks, todoListId).length === 0) return;
      return getTasksForTodo(tasks, todoListId).length;
    };

    return (
      <BasicPanel className="col-md-4 leftPanel">
        <UserModalSettings />
        <List className="nav flex-column my-todo-list">
          {categories.map(({ title, todoListId, active, iconSource }) => {
            if (todoListId < 3) {
              return (
                <li className={`nav-item ${active ? 'active' : ''}`} key={todoListId}>
                  <a
                    className={`nav-link ${active ? 'active' : ''}`}
                    onClick={() => this.chooseListItem(todoListId)}
                  >
                    <i className={iconSource} />
                    <p>{title}</p>
                    <span>
                      {renderTodoTaskNumber(tasks, todoListId)}
                    </span>
                  </a>
                </li>
              );
            }
          })}
        </List>
        <hr />
        <BasicPanel className="custom-todo-list-wrapper">
          <List className="nav flex-column todo-list">
            {categories.map(({ title, todoListId, active, iconSource }) => {
              if (todoListId >= 3) {
                return (
                  <li
                    className={`nav-item ${active ? 'active' : ''}`}
                    key={todoListId}
                  >
                    <a
                      className="nav-link"
                      onClick={() => this.chooseListItem(todoListId)}
                    >
                      <i className={`fa ${iconSource}`} />
                      {title}
                      <span>
                        {renderTodoTaskNumber(tasks, todoListId)}
                      </span>
                    </a>
                  </li>
                );
              }
            })}
          </List>
          <div className="add-new-list" onBlur={() => this.pushNewListToState()}>
            {
              activateList
              && (
              <label className="add-new-list-label-wrapper">
                <i className="fas fa-list" />
                <input
                  type="text"
                  className="add-new-list-label"
                  onChange={event => this.setNewListTitle(event.target.value)}
                  onKeyPress={event => addNewList(event)}
                  value={newListTitle}
                  autoFocus={activateList}
                />
              </label>
              )
            }
            <a
              className="add-new-list-link"
              onClick={() => this.addNewList()}
            >
              <span>+</span>
              {' '}
New List
            </a>
          </div>
        </BasicPanel>
      </BasicPanel>
    );
  }
}

LeftPanel.contextTypes = {
  store: PropTypes.object,
};
