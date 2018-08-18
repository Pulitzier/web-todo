import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { addStep } from '../actionCreators';

export default class StepInput extends Component {
  constructor(props){
    super(props);
    this.handleStepClick = this.handleStepClick.bind(this);
    this.stepState = {
      toggleStep: false,
      typeNewStep: false,
      stepText: '',
    }
  };

  componentDidMount() {
    document.getElementsByTagName('body')[0].addEventListener('click', this.handleStepClick, false);
    document.getElementById('toggleStepCheckbox').focus();
  };

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].removeEventListener('click', this.handleStepClick, false)
  };

  handleStepClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const { activateStep } = this.props;
    let { target } = event;
    if (
      this.stepNode &&
      this.stepNode.contains(target)
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

  render(){
    let { toggleStep } = this.stepState;
    let { stepText } = this.stepState;
    const { store } = this.context;
    const { activateStep, taskId } = this.props;
    const addNewStepToTask = (event) => {
      let { key } = event;
      if (key === 'Enter') {
        store.dispatch(addStep(taskId, stepText));
        activateStep();
      }
    };

    return (
      <div
        className="add-new-step-wrapper"
        ref={node => this.stepNode = node}
      >
        <div className="add-new-step">
          <label
            htmlFor="toggleStepCheckbox"
            className={
              "toggleStepLabel active " +
              (toggleStep ? 'toggled' : 'untoggled')
            }
          >
            <span></span>
          </label>
          <input
            type="text"
            name="add-new-step"
            id="toggleStepCheckbox"
            placeholder="Add a step"
            className="add-new-step-input activated"
            onKeyPress={(e) => addNewStepToTask(e)}
            onChange={(e) => this.handleTypingStep(e)}
          />
        </div>
      </div>
    )
  }
};

StepInput.contexTypes = {
  store: PropTypes.object
};