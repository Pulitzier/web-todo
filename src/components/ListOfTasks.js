import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import {
  activateTask,
  addNewTaskToList,
  typeNewTaskAction
} from '../actionCreators';
import { getTasksForTodo } from "../helpers";
import TodoTask from "./TodoTask";
import BasicPanel from "./BasicPanel";
import BasicInput from "./BasicInput";
import EmptyTaskWrapper from './EmptyTaskWrapper';
import BasicButton from "./BasicButton";

export default class ListOfTasks extends Component {
  constructor(props) {
    super(props);
    this.activateToDoTask = this.activateToDoTask.bind(this);
    this.handleTypeNewTask = this.handleTypeNewTask.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.todoState = {
      localToggleTask: false
    };
  };

  activateToDoTask(bool) {
    const { store } = this.context;
    store.dispatch(activateTask(bool));
    document.addEventListener('dblclick', () => {
      store.dispatch(activateTask(false));
      store.dispatch(typeNewTaskAction(false));
      this.newTaskInput.value = '';
    })
  };

  handleTypeNewTask(bool) {
    const { store } = this.context;
    store.dispatch(typeNewTaskAction(bool));
    !bool ? this.newTaskInput.value = '' : null;
  };

  addNewTask(activeTodo) {
    const { store } = this.context;
    let newTask = this.newTaskInput.value;
    store.dispatch(addNewTaskToList(newTask, activeTodo));
    store.dispatch(typeNewTaskAction(false));
    this.newTaskInput.focus();
    this.newTaskInput.value = '';
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const {
      app: { tasks },
      taskSettings: { activateNewTask, typeNewTask, showCompleted }
    } = state;
    const { activeTodo, activeTask, greetingTasks } = this.props;
    const { localToggleTask } = this.todoState;

    const setHeight = () => {
      if(activeTask) {
        if (activeTodo.sortOrder && (greetingTasks.length !== 0)) {
          return 322;
        } else if ((greetingTasks.length !== 0)) {
          return 382;
        } else if (activeTodo.sortOrder) {
          return 390;
        }
        return 450;
      } else {
        if (activeTodo.sortOrder && (greetingTasks.length !== 0)) {
          return 350;
        } else if (activeTodo.sortOrder || (greetingTasks.length !== 0)) {
          return 400;
        }
      }
      return 450;
    };

    const addNewTaskOnEnter = (event, todo) => {
      let { key } = event;
      if (key === 'Enter') {
        this.addNewTask(todo);
      }
    };

    return(
      <BasicPanel
        className="todo-list-wrapper"
        style={{ height: setHeight() }}
      >
        <BasicPanel className="todo-list">
          {
            getTasksForTodo(tasks, activeTodo).map((task, index) => {
              if ( !showCompleted && task.done ) {
                return;
              }
              return <TodoTask key={index} task={task} />
            })
          }
          <BasicInput
            inputType="task"
            labelClassName={
              "toggle-task-label-template " +
              (activateNewTask ? 'active ' : 'inactive ') +
              (activateNewTask && localToggleTask ? 'toggled' : 'untoggled')
            }
            iconClassName={"add-new-task-input " + (activateNewTask ? "activated" : "inactive")}
            inputRef={component => this.newTaskInput = component}
            inputActions={{
              onKeyPress: (event) => addNewTaskOnEnter(event, activeTodo),
              onChange: () => this.handleTypeNewTask(true),
              onFocus: () => this.activateToDoTask(true)
            }}
          >
            <BasicButton
              buttonClassName={"clearInput " +  (typeNewTask ? 'active' : 'inactive')}
              buttonOnClickAction={() => this.handleTypeNewTask(false)}
              iconClassName="fas fa-times"
            />
            <BasicButton
              buttonClassName={"add-new-todo-button " +  (typeNewTask ? 'active' : 'inactive')}
              buttonOnClickAction={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.addNewTask(activeTodo)
              }}
              buttonText='Add'
            />
          </BasicInput>
          <EmptyTaskWrapper numberOfEmptyTasks={getTasksForTodo(tasks, activeTodo).length}/>
        </BasicPanel>
      </BasicPanel>
    )
  }
};

ListOfTasks.contextTypes = {
  store: PropTypes.object
};