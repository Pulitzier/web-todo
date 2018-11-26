import { connect } from 'react-redux';
import {
  activateTaskSettings,
  addTaskToMyDay,
  clearSuggestedField,
  deleteTask,
  toggleTask,
} from '../../store/actions';
import GreetingsPanel from './GreetingPanelView';

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

export default connect(mapStateToProps, mapDispatchToProps)(GreetingsPanel);
