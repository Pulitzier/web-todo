import { connect } from 'react-redux';
import AppWrapper from './AppWrapper';
import './style.css';
import {
  deleteStep,
  deleteTask,
  deleteCategory,
  activateUserSettings,
  openSearchPanel, openUserSettings
} from '../../store/actions/index';

const mapStateToProps = state => ({
  userSettings: state.userSettings,
});

const mapDispatchToProps = dispatch => ({
  deleteTaskElement: (id) => {
    dispatch(deleteTask(id));
  },
  deleteTodoElement: (id) => {
    dispatch(deleteCategory(id));
  },
  deleteStepElement: (id) => {
    dispatch(deleteStep(id));
  },
  setActivateSettings: (activate) => {
    dispatch(activateUserSettings(activate));
  },
  handleExpandSettings: () => {
    dispatch(openSearchPanel(false));
    dispatch(activateUserSettings(false));
    dispatch(openUserSettings(true));
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  deleteElement: (type, id) => {
    const { deleteTaskElement, deleteTodoElement, deleteStepElement } = dispatchProps;
    switch (type) {
      case 'task':
        return deleteTaskElement(id);
      case 'todo':
        return deleteTodoElement(id);
      case 'step':
        return deleteStepElement(id);
      default:
        return;
    }
  },
  handleActivateSettings: () => {
    dispatchProps.setActivateSettings(!stateProps.userSettings.activateSettings);
  },
  handleCollapseSettings: () => {
    dispatchProps.setActivateSettings(false);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AppWrapper);
