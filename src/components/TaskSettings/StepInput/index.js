import { connect } from 'react-redux';
import StepInput from './StepInput';
import { addStep } from '../../../store/actions';

const mapDispatchToProps = dispatch => ({
  addNewStep: (taskId, stepText) => {
    dispatch(addStep(taskId, stepText));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleAddNewStep: (stepText) => {
    const { taskId, activateStep } = ownProps;
    const { addNewStep } = dispatchProps;
    addNewStep(taskId, stepText);
    activateStep();
  },
});

export default connect(null, mapDispatchToProps, mergeProps)(StepInput);
