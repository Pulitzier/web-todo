import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import '../index.css';

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
    const state = this.context.store.getState();
    return (
      <div className="container">
        <div className="row">
          <LeftPanel state={state}/>
          <RightPanel state={state}/>
        </div>
      </div>
    );
  }
};

App.contextTypes = {
  store: PropTypes.object,
};