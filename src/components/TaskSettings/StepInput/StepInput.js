import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicInput from '../../BaseComponents/BasicInput';

export default class StepInput extends Component {
  constructor(props) {
    super(props);
    this.handleStepClick = this.handleStepClick.bind(this);
    this.handleTypingStep = this.handleTypingStep.bind(this);
    this.addNewStepToTask = this.addNewStepToTask.bind(this);
    this.state = {
      toggleStep: false,
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

  handleTypingStep = (event) => {
    const { target: { value } } = event;
    this.setState({ stepText: value });
  };

  handleStepClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const { activateStep } = this.props;
    const { target } = event;
    if (
      this.bannerModal
      && this.bannerModal.contains(target)
    ) return undefined;
    return activateStep();
  }

  addNewStepToTask(event) {
    const { handleAddNewStep } = this.props;
    const { stepText } = this.state;
    const { key } = event;
    if (key === 'Enter' && stepText) {
      handleAddNewStep(stepText);
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

StepInput.propTypes = {
  activateStep: PropTypes.func,
  handleAddNewStep: PropTypes.func,
};

StepInput.defaultProps = {
  activateStep: () => {},
  handleAddNewStep: () => {},
};
