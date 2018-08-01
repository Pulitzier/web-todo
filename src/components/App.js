import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import '../index.css';
import Settings from "./Settings";

export default class App extends Component {

  componentDidMount() {
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <LeftPanel />
          <RightPanel />
          <Settings />
        </div>
      </div>
    );
  }
};

App.contextTypes = {
  store: PropTypes.object,
};