import { connect } from 'react-redux';
import SettingsModal from './SettingsModal';
import { activateUserSettings, openSearchPanel, openUserSettings } from '../../../store/actions';

const mapStateToProps = ({ userSettings }) => ({
  activateSettings: userSettings.activateSettings,
  activateSearch: userSettings.activateSearch,
});

const mapDispatchToProps = dispatch => ({
  setActivateSettings: (activate) => {
    dispatch(activateUserSettings(activate));
  },
  handleExpandSettings: () => {
    dispatch(openSearchPanel(false));
    dispatch(activateUserSettings(false));
    dispatch(openUserSettings(true));
  },
  handleExpandSearch: (bool) => {
    dispatch(activateUserSettings(false));
    dispatch(openSearchPanel(bool));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleActivateSettings: () => {
    dispatchProps.setActivateSettings(!stateProps.activateSettings);
  },
  handleCollapseSettings: () => {
    dispatchProps.setActivateSettings(false);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingsModal);
