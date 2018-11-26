import { connect } from 'react-redux';
import RepeatDatePicker from './RepeatDatePicker';
import { setRepeat } from '../../../store/actions';

const mapDispatchToProps = dispatch => ({
  setRepeatDate: (taskId, date) => {
    dispatch(setRepeat(taskId, date));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleFormSubmit: (date) => {
    const { setRepeatDate } = dispatchProps;
    const { taskId, showCustomRepeat, updateDueDate } = ownProps;
    setRepeatDate(taskId, date);
    updateDueDate(taskId);
    showCustomRepeat(false);
  },
  handleFormReset: (date) => {
    const { setRepeatDate } = dispatchProps;
    const { taskId, showCustomRepeat } = ownProps;
    setRepeatDate(taskId, date);
    showCustomRepeat(false);
  },
});

export default connect(null, mapDispatchToProps, mergeProps)(RepeatDatePicker);
