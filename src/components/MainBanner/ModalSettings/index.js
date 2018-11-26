import { connect } from 'react-redux';
import {
  activateTask,
  changeBannerBgColor,
  changeBannerBgImage, filterCompletedTasks,
  sortTasks,
  typeNewTaskAction,
} from '../../../store/actions';
import ModalSettings from './ModalSettings';

const mapStateToProps = state => ({
  taskSettings: state.taskSettings,
});

const mapDispatchToProps = dispatch => ({
  handleActivateTask(bool) {
    dispatch(activateTask(bool));
  },
  handleTypeNewTask(bool) {
    dispatch(typeNewTaskAction(bool));
  },
  handleSortTask(criteria, todoId) {
    dispatch(sortTasks(criteria, todoId));
  },
  handleChangeColor(color, todoId) {
    dispatch(changeBannerBgColor(color, todoId));
  },
  handleChangeImage(image, todoId) {
    dispatch(changeBannerBgImage(image, todoId));
  },
  handleFilterCompletedTasks(bool) {
    dispatch(filterCompletedTasks(bool));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSettings);
