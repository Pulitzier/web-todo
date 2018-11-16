import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  activateTaskSettings,
  toggleTask,
  toggleStep,
  addTaskToMyDay,
  addNoteToTask,
  handleTaskImportanance,
} from '../store/actions/actionCreators';
import { DATE_OPTIONS } from '../store/constants/constants';
import { playSoundWhenDone } from '../helpers';
import ImportanceButton from './ImportanceButton';
import ChildTaskSettings from './ChildTaskSettings';
import StepInput from './StepInput';
import BasicLabel from './BasicLabel';
import BasicButton from './BasicButton';
import BasicPanel from './BasicPanel';

export default class TaskSettings extends Component {
  constructor(props) {
    super(props);
    const { activeTask } = props;
    this.closeTaskSettings = this.closeTaskSettings.bind(this);
    this.setToggledTask = this.setToggledTask.bind(this);
    this.setToggledStep = this.setToggledStep.bind(this);
    this.addCustomToMyDay = this.addCustomToMyDay.bind(this);
    this.handleImportance = this.handleImportance.bind(this);
    this.state = {
      activateStepInput: false,
      newNoteText: activeTask.note,
      showNoteControls: false,
    };
  }

  setToggledTask(taskId, done) {
    const { store } = this.context;
    const { userSettings: { turnOnSound } } = store.getState();
    turnOnSound && playSoundWhenDone(done, turnOnSound);
    store.dispatch(toggleTask(taskId));
  }

  setToggledStep(stepId, done) {
    const { store } = this.context;
    const { userSettings: { turnOnSound } } = store.getState();
    turnOnSound && playSoundWhenDone(done, turnOnSound);
    return store.dispatch(toggleStep(stepId));
  }

  activateStep = () => {
    this.setState({ activateStepInput: !this.state.activateStepInput });
  };

  typeNewNote(event) {
    const { activeTask: { note } } = this.props;
    if (event) {
      const { target: { value } } = event;
      this.setState({
        newNoteText: value,
        showNoteControls: true,
      });
      return;
    }
    this.newNote.blur();
    this.setState({
      newNoteText: note,
      showNoteControls: false,
    });
  }

  saveNoteForTask(taskId) {
    const { store } = this.context;
    const { newNoteText } = this.state;
    store.dispatch(addNoteToTask(taskId, newNoteText));
    this.newNote.blur();
    this.setState({
      newNoteText: '',
      showNoteControls: false,
    });
  }

  closeTaskSettings(taskId) {
    const { store } = this.context;
    this.newNote.blur();
    store.dispatch(activateTaskSettings(taskId, false));
  }

  addCustomToMyDay(taskId, bool) {
    const { store } = this.context;
    store.dispatch(addTaskToMyDay(taskId, bool));
  }

  handleImportance(taskId) {
    const { store } = this.context;
    store.dispatch(handleTaskImportanance(taskId));
  }

  render() {
    const { store } = this.context;
    const { app: { steps } } = store.getState();
    const { activateStepInput, showNoteControls, newNoteText } = this.state;
    const { handleDeleteTask, activeTask, handleDeleteStep } = this.props;
    const {
      id: activeTaskId, done: doneTask, taskText, createdAt, myDay, note: taskNote,
    } = activeTask;

    const getStepsForTask = () => steps.filter(step => step.taskId === activeTaskId);

    const setCreationDate = () => `Created on ${(new Date(createdAt)).toLocaleString('en-us', DATE_OPTIONS)}`;

    return (
      <BasicPanel className="task-settings">
        <BasicPanel className="task-settings-title">
          <BasicLabel
            labelClassName={(`toggleTaskLabel ${doneTask ? 'done' : ''}`)}
            labelOnClickAction={() => this.setToggledTask(activeTaskId, doneTask)}
            iconClassName={(doneTask ? 'fas fa-check-circle' : 'far fa-check-circle')}
          />
          <p>{taskText}</p>
          <ImportanceButton
            task={activeTask}
            setImportance={id => this.handleImportance(id)}
          />
        </BasicPanel>
        <BasicPanel className="task-middle-settings-wrapper">
          <BasicPanel>
            {
              getStepsForTask().map((step, i) => (
                <BasicPanel key={i} className="step-title">
                  <BasicLabel
                    labelClassName={(`toggle-step-label ${step.done ? 'done' : ''}`)}
                    iconClassName={(step.done ? 'fas fa-check-circle' : 'far fa-check-circle')}
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
              activateStepInput
                ? (
                  <StepInput
                    activateStep={this.activateStep}
                    taskId={activeTaskId}
                  />
                )
                : (
                  <p
                    role="presentation"
                    className="activateStepInput"
                    onClick={() => this.activateStep()}
                  >
                    <span>+</span>
                    {' '}
Add Step
                  </p>
                )
            }
            <div className="task-settings-add-to-my-day">
              <ul>
                <li
                  role="presentation"
                  className={`add-to-my-day ${myDay && 'active'}`}
                  onClick={() => this.addCustomToMyDay(activeTaskId, true)}
                >
                  <i className="far fa-sun" />
                  {
                    myDay
                      ? (<p className="added">Added to My to-do</p>)
                      : (<p className="need-to-add">Add to My to-do</p>)
                  }
                  {
                    myDay
                    && (
                    <BasicButton
                      buttonClassName="clear-from-my-day"
                      buttonOnClickAction={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.addCustomToMyDay(activeTaskId, false);
                      }}
                      iconClassName="fas fa-times"
                    />
                    )
                  }
                </li>
              </ul>
            </div>
            <ChildTaskSettings activeTask={activeTask} />
            <div className="task-settings-add-note">
              <textarea
                rows="5"
                cols="30"
                ref={(node) => {
                  this.newNote = node;
                }}
                placeholder="Add a note"
                value={showNoteControls ? newNoteText : taskNote}
                onChange={e => this.typeNewNote(e)}
              />
              {
                showNoteControls
                && (
                <BasicPanel className="btn-group">
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

                </BasicPanel>
                )
              }
            </div>
          </BasicPanel>
        </BasicPanel>
        <BasicPanel className="task-settings-footer">
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
    );
  }
}

TaskSettings.propTypes = {
  activeTask: PropTypes.shape({}),
  handleDeleteTask: PropTypes.func,
  handleDeleteStep: PropTypes.func,
};

TaskSettings.defaultProps = {
  activeTask: {},
  handleDeleteTask: () => {},
  handleDeleteStep: () => {},
};

TaskSettings.contextTypes = {
  store: PropTypes.shape({}),
};
