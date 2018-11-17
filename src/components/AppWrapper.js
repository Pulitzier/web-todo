import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import '../styles/index.css';
import { handleCollapseApp } from '../store/actions/index';
import CollapsedApp from './CollapsedApp';
import ExpandedApp from './ExpandedApp';
import BasicPanel from './BaseComponents/BasicPanel';

export default class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCollapse(bool) {
    const { store } = this.context;
    store.dispatch(handleCollapseApp(bool));
  }

  render() {
    const { store } = this.context;
    const { userSettings: { collapseApp } } = store.getState();

    return (
      <BasicPanel className="container">
        <CollapsedApp
          collapseApp={collapseApp}
          handleCollapse={bool => this.handleCollapse(bool)}
        />
        <ExpandedApp
          handleCollapse={bool => this.handleCollapse(bool)}
          collapseApp={collapseApp}
        />
      </BasicPanel>
    );
  }
}

AppWrapper.contextTypes = {
  store: PropTypes.object,
};
