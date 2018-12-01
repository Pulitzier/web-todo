import { connect } from 'react-redux';
import {
  confirmBeforeDelete,
  handleSetDarkTheme,
  handleSetLightTheme,
  openUserSettings,
  turnCompletionSound,
} from '../../store/actions';
import UserSettingsPanel from './UserSettingsPanel';
import './style.css';

const mapStateToProps = state => ({
  userSettings: state.userSettings,
});

const mapDispatchToProps = dispatch => ({
  handleSetCompleteSound(bool) {
    dispatch(turnCompletionSound(bool));
  },
  handleConfirmationBeforeDelete(bool) {
    dispatch(confirmBeforeDelete(bool));
  },
  handleCloseSettings() {
    dispatch(openUserSettings(false));
  },
  setLightTheme() {
    dispatch(handleSetLightTheme());
  },
  setDarkTheme() {
    dispatch(handleSetDarkTheme());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsPanel);
