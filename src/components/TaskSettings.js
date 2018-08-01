import React, { Component } from 'react';
import PropTypes from "react-proptypes";
import { activateTaskSettings } from '../actionCreators';

export default class TaskSettings extends Component {
  constructor() {
    super();
    this.taskState = {
      activateStepInput: false,
      toggleStep: false,
      typeNewStep: false,
      newStepText: ''
    }
  };

  componentDidMount(){
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    })
  };

  activateStep = (bool) => {
    this.setState(() => {
      return this.taskState = {
        ...this.taskState,
        activateStepInput: bool
      }
    })
  };

  typeNewStep = (e) => {
    let step = e.target.value;
    this.setState(() => {
      return this.taskState = {
        ...this.taskState,
        typeNewStep: true,
        newStepText: step
      }
    })
  };

  clearStepInput = () => {
    this.setState(() => {
      return this.taskState = {
        ...this.taskState,
        typeNewStep: false,
        newStepText: ''
      }
    })
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const tasks = state.app.tasks;
    const activeTask = tasks.length !== 0 ? (tasks.find(task => task.active === true) || '') : '';

    const closeTaskSettings = (taskId) => {
      store.dispatch(activateTaskSettings(taskId, false))
    };

    return (
      <div className={"task-settings " + (activeTask ? 'active' : 'inactive')}>
        <div className="task-settings-title">
          <label
            className={
              "toggleTaskLabel " +
              (activeTask.done ? "done" : '')
            }
          >
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          ></span>
          </label>
          <p>{activeTask.taskText}</p>
        </div>
        <div className="add-new-step-wrapper">
          <div className="add-new-step">
            <div>
              <label
                htmlFor="addStepCheckbox-template"
                className={
                  "addStepLabel-template " +
                  (this.taskState.activateStepInput ? 'active ' : 'inactive ') +
                  ((this.taskState.activateStepInput && this.taskState.toggleStep) ? 'toggled' : 'untoggled')
                }
              >
                <input
                  id="addStepCheckbox-template"
                  type="checkbox"
                />
                <span></span>
              </label>
              <input
                type="text"
                name="add-new-step"
                placeholder={!this.taskState.activateStepInput ? "+ Add a step" : "Add a step"}
                className={"add-new-step-input " + (this.taskState.activateStepInput ? "activated" : "inactive")}
                onFocus={() => this.activateStep(true)}
                onChange={(e) => this.typeNewStep(e)}
              />
            </div>
          </div>
        </div>
        <div className="task-settings-add-to-my-day">
          <ul>
            <li>
              <img src="./assets/sun.svg" />
              <p>Add to My to-do</p>
            </li>
          </ul>
        </div>
        <div className="task-settings-additional">
          <ul>
            <li>
              <img src="./assets/clock.svg" />
              <p>Remind me</p>
            </li>
            <li>
              <img src="./assets/calendar.svg" />
              <p>Add due date</p>
            </li>
            <li>
              <img src="./assets/repeat.svg" />
              <p>Repeat</p>
            </li>
          </ul>
        </div>
        <div className="task-settings-add-note">
          <textarea placeholder="Add a note" cols="34" rows="5"></textarea>
        </div>
        <div className='task-settings-footer'>
          <button
            className="task-settings-arrow-right"
            onClick={() => closeTaskSettings(activeTask.id)}>
            <img src="./assets/right.svg" />
          </button>
          <p>{(() => {
            let today = new Date();
            let footerDate = today.toLocaleString('en-us', {weekday: 'long'}) + ', ' +
              today.toLocaleString('en-us', {month: 'long'}) + ' ' +
              today.toLocaleString('en-us', {day: 'numeric'});
            return footerDate;
          })()}</p>
          <button className="task-settings-trash">
            <img src="./assets/garbage.svg" />
          </button>
        </div>
      </div>
    )
  }
};

TaskSettings.contextTypes = {
  store: PropTypes.object,
};