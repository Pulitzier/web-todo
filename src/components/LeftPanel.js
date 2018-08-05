import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import Panel from './Panel';
import List from './List';
import {
  addNewTodoList,
  chooseList,
  activateNewList,
  setNewListTitle,
  activateTask
} from "../actionCreators";
import UserSettings from "./UserSettings";

class LeftPanel extends Component {
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
    const todos = state.app.todos;

    const addNewList = () => {
    let newListTitle = 'Untitled Task';
    todos['toDoCategories'].map(item => {
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

  const chooseListItem = (element, listName) => {
    store.dispatch(activateTask(false));
    store.dispatch(chooseList(element, listName))
  }

  return (
    <Panel className="col-md-4 leftPanel">
      <UserSettings />
      <List className="nav flex-column my-todo-list">
        {todos['myPersonalToDo'].map((element) =>
          (
            <li className={"nav-item "+ (element.active ? 'active' : '')} key={element.title}>
              <a
                className={"nav-link " + (element.active ? 'active' : '')}
                onClick={() => chooseListItem(element, 'myPersonalToDo')}
              >
                <img
                  src={(() => {
                    if(element.title === 'My Day') {
                      return './assets/sun.svg'
                    }
                    if(element.title === 'Important') {
                      return './assets/star.svg'
                    }
                    if(element.title === 'To-Do') {
                      return './assets/home.svg'
                    }
                    return '';
                  })()}
                  alt='Categories Icon'
                />
                <p>{element.title}</p>
                <span>{element.tasksIds.length !== 0 ? element.tasksIds.length : ''}</span>
              </a>
            </li>
          )
        )
        }
      </List>
      <hr />
      <List className="nav flex-column todo-list">
        {todos['toDoCategories'].map( (element,i) =>
          (
            <li
              className={"nav-item "+ (element.active ? 'active' : '')}
              key={element.title}
            >
              <a
                className="nav-link"
                onClick={() => chooseListItem(element, 'toDoCategories')}
              >
                {element.title}
                <span></span>
              </a>
            </li>
          ))
        }
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

export default LeftPanel;