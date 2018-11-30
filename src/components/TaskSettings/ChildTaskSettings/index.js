import { connect } from 'react-redux';
import {
  setDueDate,
  setRemindMeDate,
  setRepeat,
  shouldShowGreetings,
  updateTimestamp,
} from '../../../store/actions';
import ChildTaskSettings from './ChildTaskSettings';

const mapStateToProps = ({ taskSettings }) => ({
  greetingTimestamp: taskSettings.greetingTimestamp,
  showGreetingPopup: taskSettings.showGreetingPopup,
});

const mapDispatchToProps = dispatch => ({
  handleSetRepeat: (id, date) => {
    dispatch(setRepeat(id, date));
  },
  handleSetDueDate: (id, date) => {
    dispatch(setDueDate(id, date));
  },
  handleUpdateTimestamp: (time) => {
    dispatch(updateTimestamp(time));
  },
  handleShowGreeting: () => {
    dispatch(shouldShowGreetings(true));
  },
  handleSetRemindMeDate: (id, date) => {
    dispatch(setRemindMeDate(id, date));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  clearDueDate: () => {
    const { activeTask: { id } } = ownProps;
    const {
      handleSetRepeat,
      handleSetDueDate,
    } = dispatchProps;
    handleSetRepeat(id, '');
    handleSetDueDate(id, '');
  },
  setRemindMeDate: (date) => {
    const { activeTask: { id } } = ownProps;
    const { handleSetRemindMeDate } = dispatchProps;
    handleSetRemindMeDate(id, date);
  },
  setDueDate: (date) => {
    const { activeTask: { id } } = ownProps;
    const { handleSetDueDate } = dispatchProps;
    handleSetDueDate(id, date);
  },
  setRepeat: (date) => {
    const { activeTask: { id } } = ownProps;
    const { handleSetRepeat } = dispatchProps;
    handleSetRepeat(id, date);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ChildTaskSettings);
