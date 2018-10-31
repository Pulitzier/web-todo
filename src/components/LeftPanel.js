import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicPanel from './BasicPanel';
import List from './List';
import {
  addNewTodoList,
  chooseList,
  activateTask,
  openSearchPanel,
  activateTaskSettings, addStep
} from "../actionCreators";
import {getActiveTask, getTasksForTodo} from '../helpers';
import UserModalSettings from "./UserModalSettings";

export default class LeftPanel extends Component {
  constructor(props){
    super(props);
    this.activateNewList = this.activateNewList.bind(this);
    this.pushNewListToState = this.pushNewListToState.bind(this);
    this.chooseListItem = this.chooseListItem.bind(this);
    this.setNewListTitle = this.setNewListTitle.bind(this);
    this.addNewList = this.addNewList.bind(this);
    this.state = {
      activateList: false,
      newListTitle: 'Untitled Todo'
    };
  };

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  };

  activateNewList(bool) {
    this.setState({ activateList: bool })
  };

  setNewListTitle(title) {
    this.setState({ newListTitle: title })
  };

  pushNewListToState() {
    const { store } = this.context;
    this.activateNewList(false);
    store.dispatch(addNewTodoList(this.state.newListTitle));
    this.setNewListTitle('Untitled Todo');
  };

  chooseListItem(todoId) {
    const { store } = this.context;
    const { app: { tasks }} = store.getState();
    const { id: activeTaskId } = getActiveTask(tasks);
    store.dispatch(openSearchPanel(false));
    store.dispatch(activateTask(false));
    store.dispatch(activateTaskSettings(activeTaskId, false));
    store.dispatch(chooseList(todoId))
  };

  addNewList() {
    const { store } = this.context;
    const { app: { todos }} = store.getState();
    store.dispatch(openSearchPanel(false));
    let { newListTitle } = this.state;
    todos.map(todo => {
      if (todo.title.indexOf('Untitled Todo') !== -1) {
        if (isNaN(parseInt(todo.title.replace( /[^\d.]/g, '' )))) {
          newListTitle = 'Untitled Todo ' + 1;
        } else {
          let index = parseInt(todo.title.replace( /[^\d.]/g, '' )) + 1;
          newListTitle = 'Untitled Todo ' + index;
        };
      }
    });
    this.setNewListTitle(newListTitle);
    this.activateNewList(true);
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos, tasks } } = state;
    const { activateList, newListTitle } = this.state;

    const renderTodoIconSrc = (todoTitle) => {
      if(todoTitle === 'My Day') return "far fa-sun";
      if(todoTitle === 'Important') return "far fa-star";
      if(todoTitle === 'Tasks') return "fas fa-home";
      return
    };

    const addNewList = (event) => {
      let { key } = event;
      if (key === 'Enter') {
        this.pushNewListToState();
      }
    };

    return (
      <BasicPanel className="col-md-4 leftPanel">
        <UserModalSettings />
        <List className="nav flex-column my-todo-list">
          {todos.map(todo => {
            if (todo.todoListId < 3) {
              return (
                <li className={"nav-item "+ (todo.active ? 'active' : '')} key={todo.todoListId}>
                  <a
                    className={"nav-link " + (todo.active ? 'active' : '')}
                    onClick={() => this.chooseListItem(todo.todoListId)}
                  >
                    {
                      renderTodoIconSrc(todo.title) &&
                      <i className={renderTodoIconSrc(todo.title)}></i>
                    }
                    <p>{todo.title}</p>
                    <span>{(() =>
                      getTasksForTodo(tasks, todo).length ?
                        getTasksForTodo(tasks, todo).length :
                        ''
                    )()}</span>
                  </a>
                </li>
              )
            }
          })}
        </List>
        <hr />
        <BasicPanel className="custom-todo-list-wrapper">
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
                      onClick={() => this.chooseListItem(todo.todoListId)}
                    >
                      <i className={"fa " + todo.iconSource}></i>
                      {todo.title}
                      <span>{(() =>
                          getTasksForTodo(tasks, todo).length ?
                            getTasksForTodo(tasks, todo).length :
                            ''
                      )()}</span>
                    </a>
                  </li>
                )
              }
            })}
          </List>
          <div className="add-new-list" onBlur={() => this.pushNewListToState()}>
            {
              activateList &&
              <label className="add-new-list-label-wrapper">
                <i className="fas fa-list"></i>
                <input
                  type="text"
                  className="add-new-list-label"
                  onChange={(event) => this.setNewListTitle(event.target.value)}
                  onKeyPress={(event) => addNewList(event)}
                  value={newListTitle}
                  autoFocus={activateList}
                />
              </label>
            }
            <a
              className="add-new-list-link"
              onClick={() => this.addNewList()}
            >
              <span>+</span> New List
            </a>
          </div>
        </BasicPanel>
      </BasicPanel>
    );
  }
};

LeftPanel.contextTypes = {
  store: PropTypes.object,
};