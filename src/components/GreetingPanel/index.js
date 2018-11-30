import { connect } from 'react-redux';
import {
  activateTaskSettings,
  addTaskToMyDay,
  clearSuggestedField,
  deleteTask,
  toggleTask,
} from '../../store/actions';
import GreetingsPanel from './GreetingPanelView';
import { playSoundWhenDone } from '../../helpers';

const mapStateToProps = ({ app, userSettings }) => ({
  categories: app.categories,
  tasks: app.tasks,
  playSound: userSettings.turnOnSound,
});

const mapDispatchToProps = dispatch => ({
  handleAddTaskToMyDay(taskId) {
    dispatch(clearSuggestedField(taskId));
    dispatch(addTaskToMyDay(taskId, true));
  },
  handleToggleTask(taskId) {
    dispatch(toggleTask(taskId));
  },
  handleActivateSettings(taskId) {
    dispatch(activateTaskSettings(taskId, true));
  },
  handleDeleteTask(taskId) {
    dispatch(deleteTask(taskId));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  setToggledTask(taskId, done) {
    const { userSettings: { turnOnSound: playSound } } = stateProps;
    const { handleToggleTask } = dispatchProps;
    if (playSound && done) playSoundWhenDone();
    handleToggleTask(taskId);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(GreetingsPanel);
