import { connect } from 'react-redux';
import TaskView from './Task';
import {
  activateTaskSettings,
  handleTaskImportanance,
  toggleTask,
} from '../../store/actions';
import { playSoundWhenDone } from '../../helpers';

const mapStateToProps = ({ userSettings: { turnOnSound } }) => ({
  playSound: turnOnSound,
});

const mapDispatchToProps = dispatch => ({
  handleActivateSettings(taskId, bool) {
    dispatch(activateTaskSettings(taskId, bool));
  },
  handleToggleTask(taskId) {
    dispatch(toggleTask(taskId));
  },
  handleSetImportance(taskId) {
    dispatch(handleTaskImportanance(taskId));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  toggleTodoTask: () => {
    const { playSound } = stateProps;
    const { handleToggleTask } = dispatchProps;
    const { task: { id, done } } = ownProps;
    if (playSound && !done) playSoundWhenDone();
    handleToggleTask(id);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskView);
