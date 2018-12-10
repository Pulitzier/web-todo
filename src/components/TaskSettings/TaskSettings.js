import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { Button } from 'react-bootstrap';
import { DATE_OPTIONS } from '../../store/constants/index';
import ImportanceButton from '../ImportanceButton/index';
import ChildTaskSettings from './ChildTaskSettings/index';
import StepInput from './StepInput/index';
import BasicLabel from '../BaseComponents/BasicLabel';
import BasicButton from '../BaseComponents/BasicButton';
import BasicPanel from '../BaseComponents/BasicPanel';

export default class TaskSettings extends Component {
  constructor(props) {
    super(props);
    const { activeTask } = props;
    this.closeTaskSettings = this.closeTaskSettings.bind(this);
    this.activateStep = this.activateStep.bind(this);
    this.saveNoteForTask = this.saveNoteForTask.bind(this);
    this.typeNewNote = this.typeNewNote.bind(this);
    this.state = {
      activateStepInput: false,
      newNoteText: activeTask.note,
      showNoteControls: false,
    };
  }

  activateStep() {
    const { activateStepInput: oldActivate } = this.state;
    this.setState({ activateStepInput: !oldActivate });
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
    const { handleCreateNote } = this.props;
    const { newNoteText } = this.state;
    handleCreateNote(taskId, newNoteText);
    this.newNote.blur();
    this.setState({
      newNoteText: '',
      showNoteControls: false,
    });
  }

  closeTaskSettings(taskId) {
    const { deactivateSettings } = this.props;
    this.newNote.blur();
    deactivateSettings(taskId);
  }

  render() {
    const { activateStepInput, showNoteControls, newNoteText } = this.state;
    const {
      steps,
      handleDeleteTask,
      activeTask,
      handleDeleteStep,
      handleSetImportantTask,
      handleSetMyDayParent,
      setToggledTask,
      setToggledStep,
    } = this.props;
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
            labelOnClickAction={() => setToggledTask(activeTaskId, doneTask)}
            iconClassName={(doneTask ? 'fas fa-check-circle' : 'far fa-check-circle')}
          />
          <p>{taskText}</p>
          <ImportanceButton
            task={activeTask}
            setImportance={id => handleSetImportantTask(id)}
          />
        </BasicPanel>
        <BasicPanel className="task-middle-settings-wrapper">
          <BasicPanel>
            {
              getStepsForTask().map(step => (
                <BasicPanel key={step.stepId} className="step-title">
                  <BasicLabel
                    labelClassName={(`toggle-step-label ${step.done ? 'done' : ''}`)}
                    iconClassName={(step.done ? 'fas fa-check-circle' : 'far fa-check-circle')}
                    labelOnClickAction={() => setToggledStep(step.stepId, step.done)}
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
                    activateStep={() => this.activateStep}
                    taskId={activeTaskId}
                  />
                )
                : (
                  <Button
                    type="button"
                    className="activateStepInput"
                    onClick={() => this.activateStep()}
                  >
                    <span>+</span>
                    {' '}
Add Step
                  </Button>
                )
            }
            <div className="task-settings-add-to-my-day">
              <ul>
                <li
                  role="presentation"
                  className={`add-to-my-day ${myDay && 'active'}`}
                  onClick={() => handleSetMyDayParent(activeTaskId, true)}
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
                        handleSetMyDayParent(activeTaskId, false);
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
  steps: PropTypes.arrayOf(PropTypes.shape({})),
  activeTask: PropTypes.shape({}),
  handleDeleteTask: PropTypes.func,
  handleDeleteStep: PropTypes.func,
  handleSetImportantTask: PropTypes.func,
  handleSetMyDayParent: PropTypes.func,
  handleCreateNote: PropTypes.func,
  deactivateSettings: PropTypes.func,
  setToggledTask: PropTypes.func,
  setToggledStep: PropTypes.func,
};

TaskSettings.defaultProps = {
  steps: [],
  activeTask: {},
  handleDeleteTask: () => {},
  handleDeleteStep: () => {},
  handleSetImportantTask: () => {},
  handleSetMyDayParent: () => {},
  handleCreateNote: () => {},
  deactivateSettings: () => {},
  setToggledTask: () => {},
  setToggledStep: () => {},
};
