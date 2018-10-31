import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicPanel from './BasicPanel';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import {
  openUserSettings,
  confirmBeforeDelete,
  turnCompletionSound,
  handleSetLightTheme,
  handleSetDarkTheme
} from '../actionCreators';
import MicrosoftLabel from "./StatusBarPanel";
import BasicButton from "./BasicButton";

export default class UserSettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.setSound = this.setSound.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.checkDarkTheme = this.checkDarkTheme.bind(this);
    this.checkLightTheme = this.checkLightTheme.bind(this);
  };

  closeSettings(bool) {
    const { store } = this.context;
    store.dispatch(openUserSettings(!bool))
  };

  confirmDelete(bool) {
    const { store } = this.context;
    store.dispatch(confirmBeforeDelete(bool))
  };

  setSound(bool) {
    const { store } = this.context;
    store.dispatch(turnCompletionSound(bool))
  };

  checkLightTheme() {
    const { store } = this.context;
    store.dispatch(handleSetLightTheme())
  };

  checkDarkTheme() {
    const { store } = this.context;
    store.dispatch(handleSetDarkTheme())
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const { userSettings: {
      openSettings,
      confirmDeletion,
      turnOnSound,
      setLightTheme,
      setDarkTheme
    }} = state;

    return (
      <BasicPanel className={"user-settings-page " + (openSettings ? 'active' : 'inactive')}>
        <header className="settings-header">
          <BasicButton
            buttonClassName="close-settings"
            buttonOnClickAction={() => this.closeSettings(true)}
            iconClassName="fas fa-long-arrow-alt-left"
          />
          <h2>Settings</h2>
        </header>
        <hr />
        <section className="settings-general-info">
          <section className="user-manage">
            <span>
              <i className="fas fa-user-tie"></i>
            </span>
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
            <p>Confirm before deleting</p>
            <div className="toggle-wrapper">
              <Toggle
                checked={confirmDeletion}
                name='confirmDelete'
                value='yes'
                icons={false}
                onChange={() => this.confirmDelete(!confirmDeletion)}
              />
              {
                confirmDeletion ?
                  <p>On</p> :
                  <p>Off</p>
              }
            </div>
            <p>Turn on completion sound</p>
            <div className="toggle-wrapper">
              <Toggle
                checked={turnOnSound}
                name='turnSound'
                value='yes'
                icons={false}
                onChange={() => this.setSound(!turnOnSound)}
              />
              <p>{ turnOnSound ? "On" : "Off" }</p>
              </div>
          </section>
          <hr />
          <section className="theme-sets">
            <h5>Theme</h5>
            <label
              htmlFor="lightTheme"
              className={"ligthTheme-label " + (setLightTheme ? 'checked' : '')}
              onClick={() => this.checkLightTheme()}
            >
              <input
                id="lightTheme"
                type="checkbox"
              />
              <span></span>
            </label><p>Light Theme</p>
            <label
              htmlFor="darkTheme"
              className={"darkTheme-label " + (setDarkTheme ? 'checked' : '')}
              onClick={() => this.checkDarkTheme()}
            >
              <input
                id="darkTheme"
                type="checkbox"
              />
              <span></span>
            </label><p>Dark Theme</p>
          </section>
          <hr />
          <section className="import-todos">
            <h5>Import to-dos</h5>
            <p>Import your lists and to-dos from Wunderlist and start your day right from where you left off.</p>
            <a href="https://import.todo.microsoft.com/" target="_blank">Start importing now</a>
          </section>
          <hr />
          <section className="help-feedback">
            <h5>Help & Feedback</h5>
            <p>Everything's synced. Let's go!</p>
            <a href="https://todosupport.helpshift.com/a/microsoft-to-do/?p=winpc" target="_blank">Get support</a>
            <a href="https://todo.uservoice.com/" target="_blank">Suggest a feature via UserVoice</a>
            <a href="https://www.microsoft.com/store/productId/9NBLGGH5R558" target="_blank">Rate us</a>
          </section>
          <hr />
          <section className="about-section">
            <h5>About</h5>
            <p>My personal to-do manager</p>
            <p>2018, From QA to DEV</p>
            <p>1.23.4567.89 Version: 1.36.1807.20001; SessionId: 62435c0e-f24a-471c-8a6d-08025791b0f3.</p>
            <a href="https://privacy.microsoft.com/en-US/privacystatement" target="_blank">Privacy</a>
            <a href="https://todosupport.helpshift.com/a/microsoft-to-do/?p=all&s=privacy-and-compliance&f=how-can-i-export-my-lists-and-tasks-from-to-do&l=en" target="_blank">Export your content</a>
            <a href="https://support.office.com/legal?llcc=en-us&aid=MicrosoftTO-DOWINDOWSAPPS-Standalone(free)UseTerms_en-us.htm" target="_blank">Microsoft Software Licence Terms</a>
            <a
              href="#"
              data-toggle="modal"
              data-target="#thirdPartyNotices"
            >Third Party Notices</a>
            <a href="#">Copy Session ID</a>
          </section>
        </section>
        <div
          className="modal fade"
          id="thirdPartyNotices"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="thirdPartyNotices-label"
          aria-hidden="true"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Third Party Notices</h3>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
              </div>
              <div className="modal-body">
                <div>
                  <p>
                    Third-party notices are provided solely for
                    your information and include the original
                    copyright and license which Microsoft received
                    with the third-party software. While Microsoft
                    is not the original author of the third-party
                    materials, Microsoft licenses these third-party
                    materials to you under the terms set forth in
                    the agreement governing the Microsoft Offering,
                    except that components licensed under open source
                    licenses requiring that such components remain
                    under their original license, such as the GNU
                    General Public License (GPL) or the GNU Lesser
                    General Public License (LGPL), are being made
                    available to you by Microsoft under their original
                    licensing terms. Microsoft reserves all rights
                    not expressly granted herein, whether by
                    implication, estoppel or otherwise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasicPanel>
    )
  }
};

UserSettingsPanel.contextTypes = {
  store: PropTypes.object,
};