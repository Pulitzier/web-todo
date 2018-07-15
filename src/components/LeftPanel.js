import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import Panel from './Panel';
import Button from './Button';
import List from './List';
import {
  addNewTodoList,
  openSearchPanel,
  chooseList,
  activateNewList,
  setNewListTitle,
  activateTask
} from "../actionCreators";

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
  const addNewList = () => {
    let newListTitle = 'Untitled Task';
    state.todos['toDoCategories'].map(item => {
      if (item.title.indexOf('Untitled Task') != -1) {
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

  const { store } = this.context;
  const state = store.getState();
    return (
        <Panel className="col-md-4 leftPanel">
          <Panel className="user-info">
            <img src="./assets/user-avatar.png" alt="User Avatar"/>
            <p>Yuryi Baravy</p>
            <Button className="search" onClick={() => {
              store.dispatch(openSearchPanel(true));
            }}>
              <img src="./assets/search.png" alt="Search Field"/>
            </Button>
          </Panel>
          <List className="nav flex-column my-todo-list">
            {state.todos['myPersonalToDo'].map( (element) =>
              (
                <li className={"nav-item "+ (element.active ? 'active' : '')} key={element.title}>
                  <a
                    className={"nav-link " + (element.active ? 'active' : '')}
                    onClick={() => chooseListItem(element, 'myPersonalToDo')}
                  >
                    <img src={element.title == 'My Day' ? './assets/sun.svg' : './assets/home.svg'} alt='Sun'/>
                    <p>{element.title}</p>
                    <span>{element.tasks.length != 0 ? element.tasks.length : ''}</span>
                  </a>
                </li>
              )
            )
            }
          </List>
          <hr />
          <List className="nav flex-column todo-list">
            {state.todos['toDoCategories'].map( (element,i) =>
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