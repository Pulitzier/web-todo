import React, { Component } from 'react';
import BasicPanel from "./BasicPanel";
import StatusBarPanel from "./StatusBarPanel";

export default class CollapsedApp extends Component {
  render() {
    let { collapseApp, handleCollapse } = this.props;
    return (
      <BasicPanel className="collapsed-app">
        <StatusBarPanel
          barType="collapsed"
          collapseApp={collapseApp}
          handleCollapseApp={(bool) => handleCollapse(bool)}
        />
      </BasicPanel>
    )
  }
};