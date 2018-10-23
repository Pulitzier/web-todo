import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { addStep } from '../actionCreators';
import BasicInput from "./BasicInput";

export default class StepInput extends Component {
  constructor(props){
    super(props);
    this.handleStepClick = this.handleStepClick.bind(this);
    this.handleTypingStep = this.handleTypingStep.bind(this);
    this.addNewStepToTask = this.addNewStepToTask.bind(this);
    this.stepState = {
      toggleStep: false,
      typeNewStep: false,
      stepText: '',
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleStepClick, false);
    document.getElementById('toggle-step-checkbox-template').focus();
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleStepClick, false)
  };

  handleStepClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const { activateStep } = this.props;
    let { target } = event;
    if (
      this.bannerModal &&
      this.bannerModal.contains(target)
    ) {
      return;
    }
    return activateStep();
  };

  handleTypingStep = (event) => {
    let { target: { value: step }} = event;
    this.setState(() => {
      return this.stepState = {
        ...this.stepState,
        typeNewStep: true,
        stepText: step
      }
    })
  };

  addNewStepToTask(event) {
    const { store } = this.context;
    const { activateStep, taskId } = this.props;
    let { stepText } = this.stepState;
    let { key } = event;
    if (key === 'Enter' && stepText) {
      store.dispatch(addStep(taskId, stepText));
      activateStep();
    }
  };

  render(){
    let { toggleStep } = this.stepState;

    return (
      <BasicInput
        inputType="step"
        labelClassName={
          "toggle-step-label-template " +
          (toggleStep ? 'toggled' : 'untoggled')
        }
        iconClassName={"add-new-step-input " + (toggleStep ? "activated" : "inactive")}
        inputActions={{
          onKeyPress: (e) => this.addNewStepToTask(e),
          onChange: (e) => this.handleTypingStep(e)
        }}
      />
    )
  }
};

StepInput.contextTypes = {
  store: PropTypes.object
};