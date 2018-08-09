import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getActiveTodoList } from "../helpers";
import { changeListTitle } from '../actionCreators';
import IconsMenu from "./IconsMenu";

export default class RenameList extends Component {
  constructor(props) {
    super(props);
    this.renameListState = {
      newListTitle: '',
      changeIcon: false,
    }
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

    const changeIconInRename = (bool) => {
      this.setState(() => {
        return this.renameListState = {
          ...this.renameListState,
          changeIcon: bool
        }
      })
    };

    return (
      <div
        className="rename-list-wrapper"
        onBlur={() => {
          changeIconInRename(false);
        }}
      >
        <button
          className="change-todo-icon"
          onClick={() => changeIconInRename(true)}
        >
          {
            iconSource ?
              <img src={iconSource} /> :
              <img src={'./assets/list.svg'} />
          }
        </button>
        {
          changeIcon &&
          <IconsMenu
            activateIcon={(bool) => changeIconInRename(bool)}
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