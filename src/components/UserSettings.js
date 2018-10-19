import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  activateUserSettings,
  openUserSettings,
  openSearchPanel
} from "../actionCreators";
import Panel from './Panel';
import MicrosoftLabel from "./StatusBarPanel";

export default class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  };

  componentDidMount(){
    document.addEventListener('click', this.handleClick, false);
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  };

  handleClick(event) {
    let { store } = this.context;
    let { target } = event;
    if (!this.userSettings.contains(target)) {
      return store.dispatch(activateUserSettings(false));
    }
  };

  render() {
    let { store } = this.context;
    let state = store.getState();
    let activateSettings = state.userSettings.activateSettings;

    const openSettings = (bool) => {
      store.dispatch(openSearchPanel(false));
      store.dispatch(activateUserSettings(false));
      store.dispatch(openUserSettings(bool))
    };

    const openSearch = () => {
      store.dispatch(openSearchPanel(true));
      store.dispatch(activateUserSettings(false));
    };

    return (
      <Panel className="user-info">
        <div
          className="user-info-buttons"
          ref={node => this.userSettings = node}
        >
          <button
            className="user-settings-button"
            onClick={() => store.dispatch(activateUserSettings(!activateSettings))}
          >
            <span>
              <i className="fas fa-user-tie"></i>
            </span>
            <p>Yuryi Baravy</p>
          </button>
          <button className="search" onClick={() => openSearch() }>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="user-info-settings">
          <div className={"user-settings " + (activateSettings ? 'active' : 'inactive')}>
            <div onClick={() => openSettings(true)}>
              <i className="fa fa-cog"></i>
              <p>Settings</p>
            </div>
            <div>
              <i className="fa fa-sign-out-alt"></i>
              <p>Sign out</p>
            </div>
          </div>
        </div>
      </Panel>
    )
  }
};

UserSettings.contextTypes = {
  store: PropTypes.object,
};