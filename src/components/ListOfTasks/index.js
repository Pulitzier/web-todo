import { connect } from 'react-redux';
import { activateTask, addNewTaskToList, typeNewTaskAction } from '../../store/actions';
import ListOfTasks from './ListOfTasksWrapper/index';

const mapStateToProps = ({ app, taskSettings }) => ({
  tasks: app.tasks,
  taskSettings,
});

const mapDispatchToProps = dispatch => ({
  handleActivateTaskInput() {
    dispatch(activateTask(true));
  },
  handleDeactivateTaskInput() {
    dispatch(activateTask(false));
  },
  handleTypeNewTask(bool) {
    dispatch(typeNewTaskAction(bool));
  },
  handleCreateNewTask(newTask, activeTodo) {
    dispatch(addNewTaskToList(newTask, activeTodo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOfTasks);
