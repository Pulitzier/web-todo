import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import '../index.css';
import Settings from "./Settings";
import audioFile from './blip.wav';

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
          <audio id="soundOnComplete">
            <source  src={audioFile} type='audio/wav' />
          </audio>
        </div>
      </div>
    );
  }
};

App.contextTypes = {
  store: PropTypes.object,
};