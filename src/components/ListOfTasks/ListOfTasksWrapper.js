import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getTasksForTodo } from '../../helpers';
import Task from '../Task/index';
import BasicPanel from '../BaseComponents/BasicPanel';
import BasicInput from '../BaseComponents/BasicInput';
import BasicButton from '../BaseComponents/BasicButton';
import EmptyTasks from './EmptyTasksWrapper';
import { Transition } from 'react-transition-group';

const defaultStyle = {
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1, transition: 'all 0.1s ease-out' },
};

export default class ListOfTasksWrapper extends Component {
  constructor(props) {
    super(props);
    this.activateToDoTask = this.activateToDoTask.bind(this);
    this.handleTypeNewTask = this.handleTypeNewTask.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.state = {
      localToggleTask: false,
      animateTasks: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.activeTodo.title !== nextProps.activeTodo.title) {
      this.setState({ animateTasks: false });
      setTimeout(() => this.setState({ animateTasks: true }), 100);
    }
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
    return !bool ? this.newTaskInput.value = '' : null;
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
    const { localToggleTask, animateTasks } = this.state;

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
          <Transition
            in={animateTasks}
            timeout={50}
            mountOnEnter
          >
            {state =>
              <BasicPanel style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                {
                  getTasksForTodo(tasks, activeTodo.id).map(
                    task => (showCompleted && <Task key={task.id} task={task}/>)
                  )
                }
              </BasicPanel>
            }
          </Transition>
          <BasicInput
            inputType="task"
            labelClassName={
              `toggle-task-label-template ${
                activateNewTask ? 'active ' : 'inactive '
              }${activateNewTask && localToggleTask ? 'toggled' : 'untoggled'}`
            }
            iconClassName={`add-new-task-input ${activateNewTask ? 'activated' : 'inactive'}`}
            inputRef={(component) => { this.newTaskInput = component; }}
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
          <EmptyTasks numberOfTasks={getTasksForTodo(tasks, activeTodo.id).length} />
        </BasicPanel>
      </BasicPanel>
    );
  }
}

ListOfTasksWrapper.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({})),
  taskSettings: PropTypes.shape({}),
  activeTodo: PropTypes.shape({}),
  activeTask: PropTypes.shape({}),
  greetingTasks: PropTypes.arrayOf(PropTypes.shape({})),
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
  greetingTasks: [],
  handleActivateTaskInput: () => {},
  handleDeactivateTaskInput: () => {},
  handleTypeNewTask: () => {},
  handleCreateNewTask: () => {},
};
