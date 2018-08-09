import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getActiveTodoList } from "../helpers";
import { changeListTitle } from '../actionCreators';

export default class RenameList extends Component {
  constructor(props) {
    super(props);
    this.renameListState = {
      newListTitle: ''
    }
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos } } = state;
    const { title, todoListId } = getActiveTodoList(todos);
    const { activateRename } = this.props;
    let { newListTitle } = this.renameListState;

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
      <div>
        <button>icon</button>
        <input
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
        />
      </div>
    )
  }
};

RenameList.contextTypes = {
  store: PropTypes.object
};