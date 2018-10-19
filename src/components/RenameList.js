import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getActiveTodoList, setInitialIconWhenRename } from "../helpers";
import { changeListTitle, setIconForTodo } from '../actionCreators';
import IconsMenu from "./IconsMenu";

export default class RenameList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.changeIconInRename = this.changeIconInRename.bind(this);
    this.renameListState = {
      newListTitle: '',
      changeIcon: false,
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  };

  changeIconInRename = (bool) => {
    this.setState(() => {
      return this.renameListState = {
        ...this.renameListState,
        changeIcon: bool
      }
    })
  };

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const { store } = this.context;
    const { app: { todos } } = store.getState();
    const { todoListId } = getActiveTodoList(todos);
    const { activateRename } = this.props;
    let { target } = event;
    if (
      this.renameList &&
      this.renameList.contains(target)
    ) {
      if (target.localName === 'i') {
        target.classList[1] !== 'fa-plus-circle' ?
          store.dispatch(setIconForTodo(todoListId, target.classList[1])) :
          null;
        return this.changeIconInRename(!this.renameListState.changeIcon);
      }
      store.dispatch(setIconForTodo(todoListId, ""));
      this.changeIconInRename(false);
      return activateRename(false);
    }
    this.changeIconInRename(false);
    return activateRename(false);
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos } } = state;
    const { title, todoListId, iconSource } = getActiveTodoList(todos);
    const { activateRename } = this.props;
    let { newListTitle, changeIcon } = this.renameListState;

    const handleChangeInput = (event) => {
      let { target: { value } } = event;
      this.setState(() => {
        return this.renameListState = {
          ...this.renameListState,
          newListTitle: value
        }
      })
    };

    const handleChangeListTitle = (todoId, title) => {
      store.dispatch(changeListTitle(todoId, title));
    };

    return (
      <div
        ref={node => this.renameList = node}
        className="rename-list-wrapper"
      >
        <button className="change-todo-icon">
          <i className={"fa " + setInitialIconWhenRename(iconSource)}></i>
        </button>
        {
          changeIcon &&
          <IconsMenu
            activateIcon={(bool) => this.changeIconInRename(bool)}
            activeTodoId={todoListId}
          />
        }
        <input
          className="rename-list"
          value={
            newListTitle ?
              newListTitle :
              title
          }
          onChange={(event) => handleChangeInput(event)}
          onKeyPress={(event) => {
            let { key } = event;
            if (key === 'Enter') {
              activateRename(false);
              handleChangeListTitle(todoListId, newListTitle);
            }
          }}
          autoFocus={true}
        />
      </div>
    )
  }
};

RenameList.contextTypes = {
  store: PropTypes.object
};