import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  activateUserSettings,
  openUserSettings,
  openSearchPanel
} from "../actionCreators";
import BasicPanel from './BasicPanel';
import MicrosoftLabel from "./StatusBarPanel";

export default class UserModalSettings extends Component {
  constructor(props) {
    super(props);
    this.expandSettingsButton = this.expandSettingsButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.openSearch = this.openSearch.bind(this);
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

  expandSettingsButton() {
    let { store } = this.context;
    let { activateSettings } = store.getState().userSettings;
    store.dispatch(activateUserSettings(!activateSettings))
  }

  openSettings(bool) {
    let { store } = this.context;
    store.dispatch(openSearchPanel(false));
    store.dispatch(activateUserSettings(false));
    store.dispatch(openUserSettings(bool))
  };

  openSearch(bool) {
    let { store } = this.context;
    store.dispatch(openSearchPanel(bool));
    store.dispatch(activateUserSettings(false));
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const { activateSettings, activateSearch } = state.userSettings;

    return (
      <BasicPanel className="user-info">
        <div
          className="user-info-buttons"
          ref={node => this.userSettings = node}
        >
          <button
            className="user-settings-button"
            onClick={() => this.expandSettingsButton()}
          >
            <span>
              <i className="fas fa-user-tie"></i>
            </span>
            <p>Yuryi Baravy</p>
          </button>
          <button className="search" onClick={() => this.openSearch(!activateSearch)}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="user-info-settings">
          <div className={"user-settings " + (activateSettings ? 'active' : 'inactive')}>
            <div onClick={() => this.openSettings(true)}>
              <i className="fa fa-cog"></i>
              <p>Settings</p>
            </div>
            <div>
              <i className="fa fa-sign-out-alt"></i>
              <p>Sign out</p>
            </div>
          </div>
        </div>
      </BasicPanel>
    )
  }
};

UserModalSettings.contextTypes = {
  store: PropTypes.object,
};