import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getTasksForTodo } from '../../helpers';
import Task from '../Task/index';
import BasicPanel from '../BaseComponents/BasicPanel';
import BasicInput from '../BaseComponents/BasicInput';
import BasicButton from '../BaseComponents/BasicButton';
import EmptyTasks from './EmptyTasksWrapper';

export default class ListOfTasksWrapper extends Component {
  constructor(props) {
    super(props);
    this.activateToDoTask = this.activateToDoTask.bind(this);
    this.handleTypeNewTask = this.handleTypeNewTask.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.state = {
      localToggleTask: false,
    };
  }

  activateToDoTask() {
    const {
      handleActivateTaskInput,
      handleDeactivateTaskInput,
      handleTypeNewTask,
    } = this.props;
    handleActivateTaskInput();
    document.addEventListener('dblclick', () => {
      handleDeactivateTaskInput();
      handleTypeNewTask(false);
      this.newTaskInput.value = '';
    });
  }

  handleTypeNewTask(bool) {
    const { handleTypeNewTask } = this.props;
    handleTypeNewTask(bool);
    !bool ? this.newTaskInput.value = '' : null;
  }

  addNewTask(activeTodo) {
    const { handleTypeNewTask, handleCreateNewTask } = this.props;
    const newTask = this.newTaskInput.value;
    handleCreateNewTask(newTask, activeTodo);
    handleTypeNewTask(false);
    this.newTaskInput.focus();
    this.newTaskInput.value = '';
  }

  render() {
    const {
      tasks,
      activeTodo,
      activeTask,
      greetingTasks,
      taskSettings: { activateNewTask, typeNewTask, showCompleted },
    } = this.props;
    const { localToggleTask } = this.state;

    const setHeight = () => {
      if (activeTask) {
        if (activeTodo.sortOrder && (greetingTasks && greetingTasks.length !== 0)) {
          return 322;
        } if ((greetingTasks && greetingTasks.length !== 0)) {
          return 382;
        } if (activeTodo.sortOrder) {
          return 390;
        }
        return 450;
      }
      if (activeTodo.sortOrder && (greetingTasks && greetingTasks.length !== 0)) {
        return 350;
      } if (activeTodo.sortOrder || (greetingTasks && greetingTasks.length !== 0)) {
        return 400;
      }

      return 450;
    };

    const addNewTaskOnEnter = (event, todo) => {
      const { key } = event;
      if (key === 'Enter' && this.newTaskInput.value) {
        this.addNewTask(todo);
      }
    };

    return (
      <BasicPanel
        className="todo-list-wrapper"
        style={{ height: setHeight() }}
      >
        <BasicPanel className="todo-list">
          {
            getTasksForTodo(tasks, activeTodo.todoListId).map((task, index) => {
              if (!showCompleted && task.done) {
                return;
              }
              return <Task key={index} task={task} />;
            })
          }
          <BasicInput
            inputType="task"
            labelClassName={
              `toggle-task-label-template ${
                activateNewTask ? 'active ' : 'inactive '
              }${activateNewTask && localToggleTask ? 'toggled' : 'untoggled'}`
            }
            iconClassName={`add-new-task-input ${activateNewTask ? 'activated' : 'inactive'}`}
            inputRef={component => this.newTaskInput = component}
            inputActions={{
              onKeyPress: event => addNewTaskOnEnter(event, activeTodo),
              onChange: () => this.handleTypeNewTask(true),
              onFocus: () => this.activateToDoTask(),
            }}
          >
            <BasicButton
              buttonClassName={`clearInput ${typeNewTask ? 'active' : 'inactive'}`}
              buttonOnClickAction={() => this.handleTypeNewTask(false)}
              iconClassName="fas fa-times"
            />
            <BasicButton
              buttonClassName={`add-new-todo-button ${typeNewTask ? 'active' : 'inactive'}`}
              buttonOnClickAction={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.addNewTask(activeTodo);
              }}
              buttonText="Add"
            />
          </BasicInput>
          <EmptyTasks numberOfTasks={getTasksForTodo(tasks, activeTodo.todoListId).length} />
        </BasicPanel>
      </BasicPanel>
    );
  }
}

ListOfTasksWrapper.propTypes = {
  tasks: PropTypes.array,
  taskSettings: PropTypes.shape({}),
  activeTodo: PropTypes.shape({}),
  activeTask: PropTypes.shape({}),
  greetingTasks: PropTypes.shape({}),
  handleActivateTaskInput: PropTypes.func,
  handleDeactivateTaskInput: PropTypes.func,
  handleTypeNewTask: PropTypes.func,
  handleCreateNewTask: PropTypes.func,
};

ListOfTasksWrapper.defaultProps = {
  tasks: [],
  taskSettings: {},
  activeTodo: {},
  activeTask: {},
  greetingTasks: {},
  handleActivateTaskInput: () => {},
  handleDeactivateTaskInput: () => {},
  handleTypeNewTask: () => {},
  handleCreateNewTask: () => {},
};
