import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getActiveTodoList } from "../helpers";
import { changeListTitle } from '../actionCreators';
import RenameList from "./RenameList";

export default class RenameListWrapper extends Component {
  constructor(props) {
    super(props);
    const { todoTitle } = props;
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeListTitle = this.handleChangeListTitle.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    this.state = {
      newListTitle: todoTitle,
      changeIcon: false,
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  };

  handleChangeInput({ target: { value } }) {
    this.setState({ newListTitle: value });
  };

  handleChangeListTitle(todoId, title) {
    const { store } = this.context;
    store.dispatch(changeListTitle(todoId, title));
  };

  handleInputKeyPress({ key }) {
    const { store } = this.context;
    const { app: { todos } } = store.getState();
    const { todoListId } = getActiveTodoList(todos);
    const { newListTitle } = this.state;
    const { activateRename } = this.props;
    if (key === 'Enter') {
      activateRename(false);
      this.handleChangeListTitle(todoListId, newListTitle);
    }
  };

  handleClick({ target }) {
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos } } = state;
    const { title, todoListId } = getActiveTodoList(todos);
    const { newListTitle } = this.state;
    const { activateRename } = this.props;
    if (
      this.renameList &&
      !this.renameList.contains(target)
    ) {
      activateRename(false);
      this.handleChangeListTitle(todoListId, newListTitle || title);
    }
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos } } = state;
    const { title, iconSource } = getActiveTodoList(todos);
    const { activateIconsMenu, shouldRenameList } = this.props;
    const { newListTitle } = this.state;

    return (
      <RenameList
        renameRef={node => this.renameList = node}
        title={title}
        shouldRenameList={shouldRenameList}
        iconSource={iconSource}
        activateIconsMenu={activateIconsMenu}
        handleChangeInput={this.handleChangeInput}
        handleInputKeyPress={this.handleInputKeyPress}
        newListTitle={newListTitle}
      />
    )
  }
};

RenameListWrapper.contextTypes = {
  store: PropTypes.object
};