import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { addStep } from '../actionCreators';
import BasicInput from './BasicInput';

export default class StepInput extends Component {
  constructor(props) {
    super(props);
    this.handleStepClick = this.handleStepClick.bind(this);
    this.handleTypingStep = this.handleTypingStep.bind(this);
    this.addNewStepToTask = this.addNewStepToTask.bind(this);
    this.state = {
      toggleStep: false,
      typeNewStep: false,
      stepText: '',
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleStepClick, false);
    document.getElementById('toggle-step-checkbox-template').focus();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleStepClick, false);
  }

  handleStepClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const { activateStep } = this.props;
    const { target } = event;
    if (
      this.bannerModal
      && this.bannerModal.contains(target)
    ) {
      return;
    }
    return activateStep();
  }

  handleTypingStep = (event) => {
    const { target: { value: step } } = event;
    this.setState({
      typeNewStep: true,
      stepText: step,
    });
  };

  addNewStepToTask(event) {
    const { store } = this.context;
    const { activateStep, taskId } = this.props;
    const { stepText } = this.state;
    const { key } = event;
    if (key === 'Enter' && stepText) {
      store.dispatch(addStep(taskId, stepText));
      activateStep();
    }
  }

  render() {
    const { toggleStep } = this.state;

    return (
      <BasicInput
        inputType="step"
        labelClassName={
          `toggle-step-label-template ${
            toggleStep ? 'toggled' : 'untoggled'}`
        }
        iconClassName={`add-new-step-input ${toggleStep ? 'activated' : 'inactive'}`}
        inputActions={{
          onKeyPress: e => this.addNewStepToTask(e),
          onChange: e => this.handleTypingStep(e),
        }}
      />
    );
  }
}

StepInput.contextTypes = {
  store: PropTypes.object,
};
