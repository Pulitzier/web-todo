import React, { Component } from 'react';
import PropTypes from "react-proptypes";

let TaskSettings = (props, { store }) => {
  let state = store.getState();

  return (
    <div className={"task-settings " + (props.activeTask ? 'active' : 'inactive')}>
      <div>
        <p>{props.activeTask.task}</p>
      </div>
    </div>
  )
};

TaskSettings.contextTypes = {
  store: PropTypes.object,
};

export default TaskSettings;