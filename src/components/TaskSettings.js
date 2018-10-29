import React, { Component } from 'react';
import PropTypes from "react-proptypes";
import {
  activateTaskSettings,
  toggleTask,
  toggleStep,
  addTaskToMyDay,
  addNoteToTask,
  handleTaskImportanance
} from '../actionCreators';
import { playSoundWhenDone } from '../helpers';
import ImportanceButton from './ImportanceButton';
import ChildTaskSettings from './ChildTaskSettings';
import StepInput from "./StepInput";
import BasicLabel from './BasicLabel';
import BasicButton from './BasicButton';
import BasicPanel from "./BasicPanel";

export default class TaskSettings extends Component {
  constructor(props) {
    super(props);
    const { activeTask } = props;
    this.closeTaskSettings = this.closeTaskSettings.bind(this);
    this.setToggledTask = this.setToggledTask.bind(this);
    this.setToggledStep = this.setToggledStep.bind(this);
    this.addCustomToMyDay = this.addCustomToMyDay.bind(this);
    this.handleImportance = this.handleImportance.bind(this);
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

  closeTaskSettings(taskId) {
    let { store } = this.context;
    this.newNote.blur();
    store.dispatch(activateTaskSettings(taskId, false))
  };

  setToggledTask(taskId, done) {
    let { store } = this.context;
    const { userSettings: { turnOnSound } } = store.getState();
    turnOnSound && playSoundWhenDone(done, turnOnSound);
    store.dispatch(toggleTask(taskId))
  };

  setToggledStep(stepId, done) {
    let { store } = this.context;
    const { userSettings: { turnOnSound } } = store.getState();
    turnOnSound && playSoundWhenDone(done, turnOnSound);
    store.dispatch(toggleStep(stepId))
  };

  addCustomToMyDay(taskId, bool) {
    let { store } = this.context;
    store.dispatch(addTaskToMyDay(taskId, bool))
  };

  handleImportance(taskId) {
    let { store } = this.context;
    store.dispatch(handleTaskImportanance(taskId))
  };

  render() {
    const { store } = this.context;
    const { app: { steps } } = store.getState();
    const { activateStepInput, showNoteControls, newNoteText } = this.taskState;
    const { handleDeleteTask, activeTask, handleDeleteStep } = this.props;
    let { id: activeTaskId, done: doneTask, taskText, createdAt, myDay, note: taskNote } = activeTask;

    const getStepsForTask = () => {
      return steps.filter(step => step.taskId === activeTaskId);
    };

    const setCreationDate = () => {
      let options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      };
      return `Created on ${(new Date(createdAt)).toLocaleString('en-us', options)}`;
    };

    return (
      <BasicPanel className="task-settings">
        <BasicPanel className="task-settings-title">
          <BasicLabel
            labelClassName={("toggleTaskLabel "+(doneTask ? "done" : ''))}
            labelOnClickAction={() => this.setToggledTask(activeTaskId, doneTask)}
            iconClassName={(doneTask ? "fas fa-check-circle" : "far fa-check-circle")}
          />
          <p>{taskText}</p>
          <ImportanceButton
            task={activeTask}
            setImportance={(id) => this.handleImportance(id)}
          />
        </BasicPanel>
        <BasicPanel className="task-middle-settings-wrapper">
          <BasicPanel>
            {
              getStepsForTask().map((step, i) => (
                <BasicPanel key={i} className="step-title">
                  <BasicLabel
                    labelClassName={("toggle-step-label "+(step.done ? "done" : ''))}
                    iconClassName={(step.done ? "fas fa-check-circle" : "far fa-check-circle")}
                    labelOnClickAction={() => this.setToggledStep(step.stepId, step.done)}
                  />
                  <p>{step.stepText}</p>
                  <BasicButton
                    buttonClassName="steps-trash"
                    buttonOnClickAction={() => handleDeleteStep(step)}
                    iconClassName="fas fa-trash-alt"
                  />
                </BasicPanel>
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
                  onClick={() => this.addCustomToMyDay(activeTaskId, true)}
                >
                  <i className="far fa-sun"></i>
                  {
                    myDay ?
                      (<p className="added">Added to My to-do</p>) :
                      (<p className="need-to-add">Add to My to-do</p>)
                  }
                  {
                    myDay &&
                    <BasicButton
                      buttonClassName="clear-from-my-day"
                      buttonOnClickAction={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.addCustomToMyDay(activeTaskId, false)
                      }}
                      iconClassName="fas fa-times"
                    />
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
                (<BasicPanel className="btn-group">
                  <BasicButton
                    buttonClassName="btn-default"
                    buttonOnClickAction={() => this.typeNewNote(false)}
                    buttonText="Cancel"
                  />
                  <BasicButton
                    buttonClassName="btn-primary"
                    buttonOnClickAction={() => this.saveNoteForTask(activeTaskId)}
                    buttonText="Save"
                  />

                </BasicPanel>)
              }
            </div>
          </BasicPanel>
        </BasicPanel>
        <BasicPanel className='task-settings-footer'>
          <BasicButton
            buttonClassName="task-settings-arrow-right"
            buttonOnClickAction={() => this.closeTaskSettings(activeTaskId)}
            iconClassName="fas fa-angle-right"
          />
          <p>{setCreationDate()}</p>
          <BasicButton
            buttonClassName="task-settings-trash"
            buttonOnClickAction={() => handleDeleteTask(activeTask)}
            iconClassName="fas fa-trash-alt"
          />
        </BasicPanel>
      </BasicPanel>
    )
  }
};

TaskSettings.contextTypes = {
  store: PropTypes.object,
};