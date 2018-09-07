import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  activateUserSettings,
  openUserSettings,
  openSearchPanel
} from "../actionCreators";
import Panel from './Panel';

export default class UserSettings extends Component {

  render() {
    let { store } = this.context;
    let state = store.getState();
    let activateSettings = state.userSettings.activateSettings;

    const openSettings = (bool) => {
      store.dispatch(openSearchPanel(false));
      store.dispatch(activateUserSettings(false));
      store.dispatch(openUserSettings(bool))
    };

    return (
      <Panel className="user-info">
        <div className="user-info-buttons">
          <button
            className="user-settings-button"
            onClick={() => store.dispatch(activateUserSettings(!activateSettings))}
          >
            <img src="./assets/user-avatar.png" alt="User Avatar"/>
            <p>Yuryi Baravy</p>
          </button>
          <button className="search" onClick={() => store.dispatch(openSearchPanel(true)) }>
            <img src="./assets/search.png" alt="Search Field"/>
          </button>
        </div>
        <div className="user-info-settings">
          <div className={"user-settings " + (activateSettings ? 'active' : 'inactive')}>
            <div onClick={() => openSettings(true)}>
              <img src="./assets/toggle.svg" alt="Settings"/>
              <p>Settings</p>
            </div>
            <hr />
            <div>
              <img src="./assets/icon.svg" alt="Sign out"/>
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