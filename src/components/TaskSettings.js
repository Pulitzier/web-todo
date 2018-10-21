import React, { Component } from 'react';
import PropTypes from "react-proptypes";
import ButtonToImportance from './ButtonToImportance';
import ChildTaskSettings from './ChildTaskSettings';
import {
  activateTaskSettings,
  toggleTask,
  toggleStep,
  addTaskToMyDay,
  addNoteToTask, handleTaskImportanance
} from '../actionCreators';
import StepInput from "./StepInput";

export default class TaskSettings extends Component {
  constructor(props) {
    super(props);
    const { activeTask } = props;
    this.taskState = {
      showConfirmMessage: false,
      activateStepInput: false,
      toggleStep: false,
      newStepText: '',
      newNoteText: activeTask.note,
      showNoteControls: false
    }
  };

  activateStep = () => {
    this.setState(() => {
      return this.taskState = {
        ...this.taskState,
        activateStepInput: !this.taskState.activateStepInput
      }
    });
  };

  typeNewNote(event) {
    let { activeTask: { note }} = this.props;
    if(event) {
      let { target: { value }} = event;
      this.setState(() => {
        return this.taskState = {
          ...this.taskState,
          newNoteText: value,
          showNoteControls: true
        }
      });
      return;
    }
    this.newNote.blur();
    this.setState(() => {
      return this.taskState = {
        ...this.taskState,
        newNoteText: note,
        showNoteControls: false
      }
    });
  };

  saveNoteForTask(taskId) {
    const { store } = this.context;
    let { newNoteText } = this.taskState;
    store.dispatch(addNoteToTask(taskId, newNoteText));
    this.newNote.blur();
    this.setState(() => {
      return this.taskState = {
        ...this.taskState,
        newNoteText: '',
        showNoteControls: false
      }
    });
  };

  render() {
    const { store } = this.context;
    const { app: { steps }} = store.getState();
    const { activateStepInput, showNoteControls, newNoteText } = this.taskState;
    const { handleDeleteTask, activeTask, handleDeleteStep } = this.props;
    let { id: activeTaskId, done, taskText, createdAt, myDay, note: taskNote } = activeTask;

    const closeTaskSettings = (taskId) => {
      this.newNote.blur();
      store.dispatch(activateTaskSettings(taskId, false))
    };

    const setToggledTask = (taskId) => {
      store.dispatch(toggleTask(taskId))
    };

    const setToggledStep = (stepId) => {
      store.dispatch(toggleStep(stepId))
    };

    const addCustomToMyDay = (taskId, bool) => {
      store.dispatch(addTaskToMyDay(taskId, bool))
    };

    const getStepsForTask = () => {
      return steps.filter(step => step.taskId === activeTaskId);
    };

    const handleImportance = (taskId) => {
      store.dispatch(handleTaskImportanance(taskId))
    };

    return (
      <div className="task-settings">
        <div className="task-settings-title">
          <label
            className={"toggleTaskLabel "+(done ? "done" : '')}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setToggledTask(activeTaskId);
            }}
          >
            <i className={done ? "fas fa-check-circle" : "far fa-check-circle"}></i>
          </label>
          <p>{taskText}</p>
          <ButtonToImportance
            task={activeTask}
            setImportance={(id) => handleImportance(id)}
          />
        </div>
        <div className="task-middle-settings-wrapper">
          <div>
            {
              getStepsForTask().map((step, i) => (
                <div key={i} className="step-title">
                  <label
                    className={"toggle-step-label "+(step.done ? "done" : '')}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setToggledStep(step.stepId);
                    }}
                  >
                    <i className={step.done ? "fas fa-check-circle" : "far fa-check-circle"}></i>
                  </label>
                  <p>{step.stepText}</p>
                  <button
                    className="steps-trash"
                    onClick={() => handleDeleteStep(step)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))
            }
            {
              activateStepInput ?
                <StepInput
                  activateStep={this.activateStep}
                  taskId={activeTaskId}
                /> :
                (<p
                    className="activateStepInput"
                    onClick={() => this.activateStep()}
                  >
                    <span>+</span> Add Step
                </p>)
            }
            <div className="task-settings-add-to-my-day">
              <ul>
                <li
                  className={"add-to-my-day " + (myDay && "active")}
                  onClick={() => addCustomToMyDay(activeTaskId, true)}
                >
                  <i className="far fa-sun"></i>
                  {
                    myDay ?
                      (<p className="added">Added to My to-do</p>) :
                      (<p className="need-to-add">Add to My to-do</p>)
                  }
                  {
                    myDay && (
                      <button
                        className="clear-from-my-day"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addCustomToMyDay(activeTaskId, false)
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )
                  }
                </li>
              </ul>
            </div>
            <ChildTaskSettings activeTask={activeTask}/>
            <div className="task-settings-add-note">
            <textarea
              rows="5"
              cols="30"
              ref={node => this.newNote = node}
              placeholder="Add a note"
              value={showNoteControls ? newNoteText : taskNote}
              onChange={(e) => this.typeNewNote(e)}
            ></textarea>
              {
                showNoteControls &&
                (<div className="btn-group">
                  <button
                    className="btn-default"
                    onClick={() => this.typeNewNote(false)}
                  >Cancel</button>
                  <button
                    className="btn-primary"
                    onClick={() => this.saveNoteForTask(activeTaskId)}
                  >Save</button>
                </div>)
              }
            </div>
          </div>
        </div>
        <div className='task-settings-footer'>
          <button
            className="task-settings-arrow-right"
            onClick={() => closeTaskSettings(activeTaskId)}>
            <i className="fas fa-angle-right"></i>
          </button>
          <p>{(() => {
            return `Created on ${(new Date(createdAt)).toLocaleString('en-us', {weekday: 'short', month: 'short', day: 'numeric'})}`;
          })()}</p>
          <button
            className="task-settings-trash"
            onClick={() => handleDeleteTask(activeTask)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    )
  }
};

TaskSettings.contextTypes = {
  store: PropTypes.object,
};