import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import './App.css';

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
    let state = this.context.store.getState();
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