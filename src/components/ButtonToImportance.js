import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { handleTaskImportanance } from "../actionCreators";

export default class ButtonToImportance extends Component {
  render(){
    const { task: { id, important }, setImportance } = this.props;

    return (
      <button
        className="important-icon"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setImportance(id);
        }}
      >
        <i className={important ? "fas fa-star" : "far fa-star"}></i>
      </button>
    )
  }
};

ButtonToImportance.contextTypes = {
  store: PropTypes.object
};