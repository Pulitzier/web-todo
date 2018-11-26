import { connect } from 'react-redux';
import {
  activateTaskSettings,
  addNoteToTask,
  addTaskToMyDay,
  handleTaskImportanance,
  toggleStep,
  toggleTask,
} from '../../store/actions';
import TaskSettings from './TaskSettings';
import { playSoundWhenDone } from '../../helpers';

const mapStateToProps = ({ userSettings: { turnOnSound }, app: { steps } }) => ({
  playSound: turnOnSound,
  steps,
});

const mapDispatchToProps = dispatch => ({
  handleToggleTask(taskId) {
    dispatch(toggleTask(taskId));
  },
  handleToggleStep(stepId) {
    dispatch(toggleStep(stepId));
  },
  handleCreateNote(taskId, text) {
    dispatch(addNoteToTask(taskId, text));
  },
  deactivateSettings(taskId) {
    dispatch(activateTaskSettings(taskId, false));
  },
  handleSetMyDayParent(taskId, bool) {
    dispatch(addTaskToMyDay(taskId, bool));
  },
  handleSetImportantTask(taskId) {
    dispatch(handleTaskImportanance(taskId));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  setToggledTask: (taskId, done) => {
    const { playSound } = stateProps;
    const { handleToggleTask } = dispatchProps;
    if (playSound && !done) playSoundWhenDone();
    handleToggleTask(taskId);
  },
  setToggledStep: (stepId, done) => {
    const { playSound } = stateProps;
    const { handleToggleStep } = dispatchProps;
    if (playSound && !done) playSoundWhenDone();
    handleToggleStep(stepId);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskSettings);
