import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicPanel from '../../BaseComponents/BasicPanel';

export default class SettingsModalView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  render() {
    const {
      activateSettings,
      activateSearch,
      handleExpandSettings,
      handleExpandSearch,
      handleActivateSettings,
    } = this.props;

    return (
      <BasicPanel className="user-info">
        <div
          id="userInfoButtons"
          className="user-info-buttons"
        >
          <button
            type="button"
            className="user-settings-button"
            onClick={handleActivateSettings}
          >
            <span>
              <i className="fas fa-user-tie" />
            </span>
            <p>Yuryi Baravy</p>
          </button>
          <button
            type="button"
            className="search"
            onClick={() => handleExpandSearch(!activateSearch)}
          >
            <i className="fas fa-search" />
          </button>
        </div>
        <div className="user-info-settings">
          <div className={`user-settings ${activateSettings ? 'active' : ''}`}>
            <div
              role="presentation"
              onClick={handleExpandSettings}
            >
              <i className="fa fa-cog" />
              <p>Settings</p>
            </div>
            <div>
              <i className="fa fa-sign-out-alt" />
              <p>Sign out</p>
            </div>
          </div>
        </div>
      </BasicPanel>
    );
  }
}

SettingsModalView.propTypes = {
  activateSettings: PropTypes.bool,
  activateSearch: PropTypes.bool,
  handleExpandSettings: PropTypes.func,
  handleExpandSearch: PropTypes.func,
  handleActivateSettings: PropTypes.func,
  handleCollapseSettings: PropTypes.func,
};

SettingsModalView.defaultProps = {
  activateSettings: false,
  activateSearch: false,
  handleExpandSettings: () => {},
  handleExpandSearch: () => {},
  handleActivateSettings: () => {},
  handleCollapseSettings: () => {},
};
