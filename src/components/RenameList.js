import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getActiveTodoList, setInitialIconWhenRename } from "../helpers";
import { changeListTitle, setIconForTodo } from '../actionCreators';
import IconsMenu from "./IconsMenu";
import BasicButton from "./BasicButton";

export default class RenameList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.changeIconInRename = this.changeIconInRename.bind(this);
    this.handleChangeListTitle = this.handleChangeListTitle.bind(this);
    this.state = {
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
    this.setState({ changeIcon: bool })
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
        return this.changeIconInRename(!this.state.changeIcon);
      }
      store.dispatch(setIconForTodo(todoListId, ""));
      this.changeIconInRename(false);
      return activateRename(false);
    }
    this.changeIconInRename(false);
    return activateRename(false);
  };

  handleChangeInput(event) {
    let { target: { value } } = event;
    this.setState({ newListTitle: value })
  };

  handleChangeListTitle(todoId, title) {
    let { store } = this.context;
    store.dispatch(changeListTitle(todoId, title));
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos } } = state;
    const { title, todoListId, iconSource } = getActiveTodoList(todos);
    const { activateRename } = this.props;
    const { newListTitle, changeIcon } = this.state;

    return (
      <div
        ref={node => this.renameList = node}
        className="rename-list-wrapper"
      >
        <BasicButton
          buttonClassName="change-todo-icon"
          iconClassName={"fa " + setInitialIconWhenRename(iconSource)}
        />
        {
          changeIcon &&
          <IconsMenu
            activateIcon={(bool) => this.changeIconInRename(bool)}
            activeTodoId={todoListId}
          />
        }
        <input
          className="rename-list"
          value={ newListTitle || title }
          onChange={(event) => this.handleChangeInput(event)}
          onKeyPress={(event) => {
            let { key } = event;
            if (key === 'Enter') {
              activateRename(false);
              this.handleChangeListTitle(todoListId, newListTitle);
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