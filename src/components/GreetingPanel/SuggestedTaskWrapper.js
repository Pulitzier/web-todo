import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicButton from '../BaseComponents/BasicButton';
import BasicPanel from '../BaseComponents/BasicPanel';

export default class SuggestedTask extends Component {
  constructor(props) {
    super(props);
    this.showSuggestedTasksMenu = this.showSuggestedTasksMenu.bind(this);
    this.state = {
      showTaskOptions: false,
    };
  }

  showSuggestedTasksMenu() {
    const { showTaskOptions: oldShowOptions } = this.state;
    this.setState({ showTaskOptions: !oldShowOptions });
  }

  render() {
    const { showTaskOptions } = this.state;
    const {
      task,
      taskParent,
      addTaskToMyDay,
      handleDeleteTask,
      setToggledTask,
    } = this.props;

    return (
      <BasicPanel className="suggested-tasks">
        <BasicButton
          buttonClassName="add-me-btn"
          buttonOnClickAction={() => addTaskToMyDay(task.id)}
          buttonText="+"
        />
        <BasicPanel>
          <p className="task-text">{task.taskText}</p>
          <p className="task-parent-title">
            <i className={(taskParent.iconSource !== 'fa-list') ? taskParent.iconSource : ''} />
            {taskParent.title}
          </p>
        </BasicPanel>
        {
          showTaskOptions
          && (
          <BasicPanel className="suggested-tasks-settings">
            <div
              role="presentation"
              onClick={() => setToggledTask(task.id, task.done)}
            >
              <i className="far fa-check-circle" />
              <p>Mark as completed</p>
            </div>
            <div
              role="presentation"
              onClick={() => handleDeleteTask(task.id)}
            >
              <i className="far fa-trash-alt" />
              <p>Delete task</p>
            </div>
          </BasicPanel>
          )
        }
        <BasicButton
          buttonClassName="tasks-settings-btn"
          buttonOnClickAction={() => this.showSuggestedTasksMenu()}
          iconClassName="fas fa-ellipsis-h"
        />
      </BasicPanel>
    );
  }
}

SuggestedTask.propTypes = {
  task: PropTypes.shape({}),
  taskParent: PropTypes.shape({}),
  addTaskToMyDay: PropTypes.func,
  handleDeleteTask: PropTypes.func,
  setToggledTask: PropTypes.func,
};

SuggestedTask.defaultProps = {
  task: {},
  taskParent: {},
  addTaskToMyDay: () => {},
  handleDeleteTask: () => {},
  setToggledTask: () => {},
};
