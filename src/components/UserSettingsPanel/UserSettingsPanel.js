import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import BasicButton from '../BaseComponents/BasicButton';
import BasicPanel from '../BaseComponents/BasicPanel';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default class UserSettingsPanel extends Component {
  static handleCopyToClipboard() {
    const sessionIdField = document.getElementById('session-id');
    sessionIdField.select();
    document.execCommand("copy");
    sessionIdField.blur();
  }

  constructor(props) {
    super(props);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
      show: false
    };
  }

  handleCloseModal() {
    this.setState({ show: false });
  }

  handleShowModal() {
    this.setState({ show: true });
  }

  render() {
    const {
      userSettings: {
        openSettings,
        confirmDeletion,
        turnOnSound,
        lightTheme,
        darkTheme,
      },
      setDarkTheme,
      setLightTheme,
      handleCloseSettings,
      handleSetCompleteSound,
      handleConfirmationBeforeDelete,
    } = this.props;
    const { show: showModal } = this.state;

    return (
      <BasicPanel className={`user-settings-page ${openSettings ? 'active' : 'inactive'}`}>
        <header className="settings-header">
          <BasicButton
            buttonClassName="close-settings"
            buttonOnClickAction={() => handleCloseSettings()}
            iconClassName="fas fa-long-arrow-alt-left"
          />
          <h2>Settings</h2>
        </header>
        <hr />
        <section className="settings-general-info">
          <section className="user-manage">
            <span>
              <i className="fas fa-user-tie" />
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
                name="confirmDelete"
                value="yes"
                icons={false}
                onChange={() => handleConfirmationBeforeDelete(!confirmDeletion)}
              />
              {
                confirmDeletion
                  ? <p>On</p>
                  : <p>Off</p>
              }
            </div>
            <p>Turn on completion sound</p>
            <div className="toggle-wrapper">
              <Toggle
                checked={turnOnSound}
                name="turnSound"
                value="yes"
                icons={false}
                onChange={() => handleSetCompleteSound(!turnOnSound)}
              />
              <p>{ turnOnSound ? 'On' : 'Off' }</p>
            </div>
          </section>
          <hr />
          <section className="theme-sets">
            <h5>Theme</h5>
            <label
              htmlFor="lightTheme"
              className={`lightTheme-label ${lightTheme ? 'checked' : ''}`}
              onClick={() => setLightTheme()}
            >
              <input
                id="lightTheme"
                type="checkbox"
              />
              <span />
            </label>
            <p>Light Theme</p>
            <label
              htmlFor="darkTheme"
              className={`darkTheme-label ${darkTheme ? 'checked' : ''}`}
              onClick={() => setDarkTheme()}
            >
              <input
                id="darkTheme"
                type="checkbox"
              />
              <span />
            </label>
            <p>Dark Theme</p>
          </section>
          <hr />
          <section className="import-todos">
            <h5>Import to-dos</h5>
            <p>
Import your lists and to-dos from&nbsp;
              Wunderlist and start your day right from&nbsp;
              where you left off.
            </p>
            <a
              href="https://import.todo.microsoft.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start importing now
            </a>
          </section>
          <hr />
          <section className="help-feedback">
            <h5>Help & Feedback</h5>
            <p>Everything&apos;s synced. Let&apos;s go!</p>
            <a
              href="https://todosupport.helpshift.com/a/microsoft-to-do/?p=winpc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get support
            </a>
            <a
              href="https://todo.uservoice.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Suggest a feature via UserVoice
            </a>
            <a
              href="https://www.microsoft.com/store/productId/9NBLGGH5R558"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rate us
            </a>
          </section>
          <hr />
          <section className="about-section">
            <h5>About</h5>
            <p>My personal to-do manager</p>
            <p>2018, From QA to DEV</p>
            <p>
              1.23.4567.89 Version: 1.36.1807.20001; SessionId:
            </p>
            <input
              id="session-id"
              defaultValue="62435c0e-f24a-471c-8a6d-08025791b0f3"
            />
            <a href="https://privacy.microsoft.com/en-US/privacystatement" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="https://todosupport.helpshift.com/a/microsoft-to-do/?p=all&s=privacy-and-compliance&f=how-can-i-export-my-lists-and-tasks-from-to-do&l=en" target="_blank" rel="noopener noreferrer">Export your content</a>
            <a href="https://support.office.com/legal?llcc=en-us&aid=MicrosoftTO-DOWINDOWSAPPS-Standalone(free)UseTerms_en-us.htm" target="_blank" rel="noopener noreferrer">Microsoft Software Licence Terms</a>
            <Button color="link" onClick={this.handleShowModal}>
              Third Party Notices
            </Button>
            <Button color="link" onClick={UserSettingsPanel.handleCopyToClipboard}>Copy Session ID</Button>
          </section>
          <Modal
            isOpen={showModal}
            toggle={this.handleCloseModal}
          >
            <ModalHeader>
              Third-party notices
              <Button className="close" onClick={this.handleCloseModal}>??</Button>
            </ModalHeader>
            <ModalBody>
              <p>
                Third-party notices are provided solely for
                your information and include the original
                copyright and license which Microsoft supply
                with the it's software. While Microsoft
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
            </ModalBody>
          </Modal>
        </section>
      </BasicPanel>
    );
  }
}

UserSettingsPanel.propTypes = {
  userSettings: PropTypes.shape({}),
  setDarkTheme: PropTypes.func,
  setLightTheme: PropTypes.func,
  handleCloseSettings: PropTypes.func,
  handleSetCompleteSound: PropTypes.func,
  handleConfirmationBeforeDelete: PropTypes.func,
};

UserSettingsPanel.defaultProps = {
  userSettings: {},
  setDarkTheme: () => {},
  setLightTheme: () => {},
  handleCloseSettings: () => {},
  handleSetCompleteSound: () => {},
  handleConfirmationBeforeDelete: () => {},
};
