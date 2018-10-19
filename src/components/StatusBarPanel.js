import React from 'react';
import Panel from "./Panel";

const StatusBarPanel = () => {
  return (
    <Panel className="status-bar">
      <p className="microsoft-label">Microsoft To-Do</p>
      <button>
        <span>&#95;</span>
      </button>
      <button>
        <i className="far fa-square"></i>
      </button>
      <button>
        <i className="fas fa-times"></i>
      </button>
    </Panel>
  )
};

export default StatusBarPanel;