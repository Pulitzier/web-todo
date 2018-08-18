import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { handleTaskImportanance } from "../actionCreators";

export default class ButtonToImportance extends Component {
  render(){
    const { store } = this.context;
    const { id, important } = this.props.task;
    const handleImportance = (taskId) => {
      store.dispatch(handleTaskImportanance(taskId))
    };

    return (
      <button
        className="important-icon"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleImportance(id);
        }}
      >
        {
          important ?
            (<img src="./assets/star-fill.svg"/>) :
            (<img src="./assets/star.svg"/>)
        }
      </button>
    )
  }
};

ButtonToImportance.contextTypes = {
  store: PropTypes.object
};