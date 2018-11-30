import { connect } from 'react-redux';
import { revertTasks, sortTasks } from '../../../store/actions';
import SortPopUp from './SortPopUp';

const mapDispatchToProps = dispatch => ({
  handleRevertTasks: () => {
    dispatch(revertTasks());
  },
  setSortCriteria: (sortCriteria, todoListId) => {
    dispatch(sortTasks(sortCriteria, todoListId));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleSortTasks(sortCriteria) {
    const { todoListId } = ownProps;
    const { setSortCriteria } = dispatchProps;
    setSortCriteria(sortCriteria, todoListId);
  },
});

export default connect(null, mapDispatchToProps, mergeProps)(SortPopUp);
