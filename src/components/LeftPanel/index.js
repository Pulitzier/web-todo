import { connect } from 'react-redux';
import LeftPanel from './LeftPanelWrapper';
import {
  activateTask,
  activateTaskSettings,
  addNewTodoList,
  chooseList,
  openSearchPanel,
} from '../../store/actions';
import './style.css';

const mapStateToProps = ({ app: { categories, tasks } }) => ({
  categories,
  tasks,
});

const mapDispatchToProps = dispatch => ({
  handleCreateNewCategory(categoryTitle) {
    dispatch(addNewTodoList(categoryTitle));
  },
  handleCloseSearchPanel() {
    dispatch(openSearchPanel(false));
  },
  handleDeactivateTaskInput() {
    dispatch(activateTask(false));
  },
  handleDeactivateTaskSettings(taskId) {
    dispatch(activateTaskSettings(taskId, false));
  },
  handleChooseCategory(todoId, taskId) {
    dispatch(openSearchPanel(false));
    dispatch(activateTask(false));
    if (taskId !== '') dispatch(activateTaskSettings(taskId, false));
    dispatch(chooseList(todoId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
