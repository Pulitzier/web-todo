import React from 'react';
import BasicPanel from './BasicPanel';
import BasicButton from './BasicButton';

const StatusBarPanel = (props) => {
  const { barType, collapseApp, handleCollapseApp } = props;
  const renderBarChild = (type) => {
    if (type && type === 'collapsed') return;
    return <p className="microsoft-label">Microsoft To-Do</p>;
  };
  return (
    <BasicPanel className="status-bar">
      {renderBarChild(barType)}
      <BasicButton
        buttonOnClickAction={() => handleCollapseApp(true)}
        disabled={collapseApp}
        buttonText="&#95;"
      />
      <BasicButton
        buttonOnClickAction={() => handleCollapseApp(false)}
        disabled={!collapseApp}
        iconClassName="far fa-square"
      />
      <BasicButton
        disabled
        iconClassName="fas fa-times"
      />
    </BasicPanel>
  );
};

export default StatusBarPanel;
