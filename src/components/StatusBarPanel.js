import React from 'react';
import BasicPanel from "./BasicPanel";
import BasicButton from './BasicButton';

const StatusBarPanel = (props) => {
  let { barType, collapseApp, handleCollapseApp } = props;
  const renderBarChild = (type) => {
    if(type && type === "collapsed") return;
    return <p className="microsoft-label">Microsoft To-Do</p>
  };
  return (
    <BasicPanel className="status-bar">
      {renderBarChild(barType)}
      <button
        onClick={() => handleCollapseApp(true)}
        disabled={collapseApp}
      >
        <span>&#95;</span>
      </button>
      <button
        onClick={() => handleCollapseApp(false)}
        disabled={!collapseApp}
      >
        <i className="far fa-square"></i>
      </button>
      <button disabled>
        <i className="fas fa-times"></i>
      </button>
    </BasicPanel>
  )
};

export default StatusBarPanel;