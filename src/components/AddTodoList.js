import React, { Component } from 'react';
import { addNewTodoList } from "../actionCreators";

let AddTodoList = ({dispatch}) => {
  return (
    <div className="add-new-list" onBlur={this.addNewTaskToList}>
      <input
        className="add-new-list-label"
        type="text"
        ref={node => this.inputField = node}
      />
      <a
        className="add-new-list-link"
        onClick={() => {
          let title = this.inputField.value;
          dispatch(addNewTodoList(title));
          this.inputField.value = '';
        }}
      >
        <span>+</span> New List
      </a>
    </div>
  );
};

export default AddTodoList;