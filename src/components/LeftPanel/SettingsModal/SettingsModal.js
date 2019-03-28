import React from 'react';
import BasicPanel from '../../BaseComponents/BasicPanel';

function SettingsModal(props) {
  const {
    activateSettings,
    activateSearch,
    handleExpandSettings,
    handleExpandSearch,
    handleActivateSettings,
  } = props;

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

export default SettingsModal;