import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import ImportanceButton from '../ImportanceButton/index';
import BasicLabel from '../BaseComponents/BasicLabel';
import BasicPanel from '../BaseComponents/BasicPanel';
import Label from './Label/index';
import './style.css';

export default class Task extends Component {
  render() {
    const {
      task,
      handleActivateSettings,
      toggleTodoTask,
      handleSetImportance,
    } = this.props;
    const { id, done, taskText } = task;

    return (
      <div
        role="presentation"
        className="todo background-wrapper"
        onClick={() => handleActivateSettings(id, true)}
      >
        <BasicPanel className="added-todo">
          <BasicLabel
            labelClassName={(`toggle-todo-label ${done ? 'done' : ''}`)}
            iconClassName={(done ? 'fas fa-check-circle' : 'far fa-check-circle')}
            labelOnClickAction={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleTodoTask();
            }}
          />
          <BasicPanel className="task-title-wrapper">
            <p className={done ? 'lineThrough' : null}>{taskText}</p>
            <Label task={task} />
          </BasicPanel>
          <ImportanceButton
            task={task}
            setImportance={handleSetImportance}
          />
        </BasicPanel>
      </div>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({}).isRequired,
  handleActivateSettings: PropTypes.func.isRequired,
  toggleTodoTask: PropTypes.func.isRequired,
  handleSetImportance: PropTypes.func.isRequired,
};
