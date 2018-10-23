import React from 'react';
import BasicPanel from "./BasicPanel";

const StatusBarPanel = () => {
  return (
    <BasicPanel className="status-bar">
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
    </BasicPanel>
  )
};

export default StatusBarPanel;