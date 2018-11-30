import { connect } from 'react-redux';
import AppWrapper from './AppWrapper';
import './style.css';
import { deleteStep, deleteTask, deleteCategory } from '../../store/actions/index';

const mapStateToProps = state => ({
  userSettings: state.userSettings,
});

const mapDispatchToProps = dispatch => ({
  deleteTaskElement: (id) => {
    dispatch(deleteTask(id));
  },
  deleteCategoryElement: (id) => {
    dispatch(deleteCategory(id));
  },
  deleteStepElement: (id) => {
    dispatch(deleteStep(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppWrapper);
