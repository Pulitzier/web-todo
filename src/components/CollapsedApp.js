import React from 'react';
import BasicPanel from "./BasicPanel";
import StatusBarPanel from "./StatusBarPanel";

const CollapsedApp = (props) => {
  const { collapseApp, handleCollapse } = props;

  const setOpacity = (collapseApp) => {
    if (collapseApp) return {
      opacity: 1,
      transition: 'opacity 0.5s ease'
    };
    return {
      opacity: 0,
      transition: 'opacity 0.5s ease'
    }
  };

  return (
    <BasicPanel
      className="collapsed-app"
      style={setOpacity(collapseApp)}
    >
      <StatusBarPanel
        barType="collapsed"
        collapseApp={collapseApp}
        handleCollapseApp={(bool) => handleCollapse(bool)}
      />
    </BasicPanel>
  )
};

export default CollapsedApp;