import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import Panel from './Panel';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import {
  openUserSettings,
  confirmBeforeDelete,
  turnCompletionSound,
  handleSetLightTheme,
  handleSetDarkTheme
} from '../actionCreators';

export default class Settings extends Component {
  componentDidMount() {
    let { store } = this.context;
    store.subscribe(() => {
      this.forceUpdate();
    })
  };

  render() {
    let { store } = this.context;
    let state = store.getState();
    let {
      openSettings,
      confirmDeletion,
      turnOnSound,
      setLightTheme,
      setDarkTheme
    } = state.userSettings;

    const closeSettings = (bool) => {
      store.dispatch(openUserSettings(!bool))
    };

    const confirmDelete = () => {
      store.dispatch(confirmBeforeDelete(!confirmDeletion))
    };

    const setSound = () => {
      store.dispatch(turnCompletionSound(!turnOnSound))
    };

    const checkLightTheme = () => {
      store.dispatch(handleSetLightTheme())
    };

    const checkDarkTheme = () => {
      store.dispatch(handleSetDarkTheme())
    };

    console.log(confirmDelete);

    return (
      <Panel className={"user-settings-page " + (openSettings ? 'active' : 'inactive')}>
        <header className="settings-header">
          <button onClick={() => closeSettings(true)}>
            <img src="./assets/left-arrow.svg" alt="Back"/>
          </button>
          <h2>Settings</h2>
        </header>
        <hr />
        <section className="settings-general-info">
          <section className="user-manage">
            <img src="./assets/user-avatar.png" alt="User Avatar"/>
            <div>
              <h2>Yuryi Baravy</h2>
              <p>ybaravy@klika-tech.com</p>
            </div>
            <a href="https://account.microsoft.com/account/Account?ru=https%3A%2F%2Faccount.microsoft.com%2F&destrt=home-index">
              Manage Account
            </a>
          </section>
          <hr />
          <section className="general-sets">
            <h5>General</h5>
            <br />
            <p>Confirm before deleting</p>
            <Toggle
              checked={confirmDeletion}
              name='confirmDelete'
              value='yes'
              icons={false}
              onChange={() => confirmDelete()}
            />
            <p>Turn on completion sound</p>
            <Toggle
              checked={turnOnSound}
              name='turnSound'
              value='yes'
              icons={false}
              onChange={() => setSound()}
            />
          </section>
          <hr />
          <section className="theme-sets">
            <h5>Theme</h5>
            <br />
            <label
              htmlFor="lightTheme"
              className={"ligthTheme-label " + (setLightTheme ? 'checked' : '')}>
              <input
                id="lightTheme"
                type="checkbox"
              />
              <span
                onClick={() => checkLightTheme()}
              ></span>
            </label><p>Light Theme</p>
            <label
              htmlFor="darkTheme"
              className={"darkTheme-label " + (setDarkTheme ? 'checked' : '')}>
              <input
                id="darkTheme"
                type="checkbox"
              />
              <span
                onClick={() => checkDarkTheme()}
              ></span>
            </label><p>Dark Theme</p>
          </section>
          <hr />
          <section className="import-todos">
            <h5>Import to-dos</h5>
            <br />
            <p>Import your lists and to-dos from Wunderlist and start your day right from where you left off.</p>
            <a href="https://import.todo.microsoft.com/" target="_blank">Start importing now</a>
          </section>
          <hr />
          <section className="help-feedback">
            <h5>Help & Feedback</h5>
            <br />
            <p>Everything's synced. Let's go!</p>
            <a href="https://todosupport.helpshift.com/a/microsoft-to-do/?p=winpc" target="_blank">Get support</a>
            <a href="https://todo.uservoice.com/" target="_blank">Suggest a feature via UserVoice</a>
            <a href="https://www.microsoft.com/store/productId/9NBLGGH5R558" target="_blank">Rate us</a>
          </section>
          <hr />
          <section className="about-section">
            <h5>About</h5>
            <br />
            <p>My personal to-do manager</p>
            <p>2018, From QA to DEV</p>
            <p>1.23.4567.89 Version: 1.36.1807.20001; SessionId: 62435c0e-f24a-471c-8a6d-08025791b0f3.</p>
            <a href="https://privacy.microsoft.com/en-US/privacystatement" target="_blank">Privacy</a>
            <a href="https://todosupport.helpshift.com/a/microsoft-to-do/?p=all&s=privacy-and-compliance&f=how-can-i-export-my-lists-and-tasks-from-to-do&l=en" target="_blank">Export your content</a>
            <a href="https://support.office.com/legal?llcc=en-us&aid=MicrosoftTO-DOWINDOWSAPPS-Standalone(free)UseTerms_en-us.htm" target="_blank">Microsoft Software Licence Terms</a>
            <a href="#" target="_blank">Third Party Notices</a>
            <a href="#" target="_blank">Copy Session ID</a>
          </section>
        </section>
      </Panel>
    )
  }
};

Settings.contextTypes = {
  store: PropTypes.object,
};