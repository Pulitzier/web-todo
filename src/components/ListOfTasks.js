import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import {
  activateTask,
  addNewTaskToList,
  typeNewTaskAction
} from '../actionCreators';
import { getTasksForTodo } from "../helpers";
import Task from "./Task";
import Panel from "./Panel";
import BasicInput from "./BasicInput";
import EmptyTaskWrapper from './EmptyTaskWrapper';

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
    const { activeTodo } = this.props;
    const { localToggleTask } = this.todoState;

    const setHeight = () => {
      if(activeTodo.sortOrder) {
        return 400;
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
      <div
        className="todo-list-wrapper"
        style={{ height: setHeight() }}
      >
        <Panel className="todo-list">
          {
            getTasksForTodo(tasks, activeTodo).map((task, index) => {
              if ( !showCompleted && task.done ) {
                return;
              }
              return <Task key={index} task={task} />
            })
          }
          <BasicInput
            inputType="task"
            labelChangeClassCondition={{
              optionOne: activateNewTask,
              optionTwo: localToggleTask
            }}
            inputRef={component => this.newTaskInput = component}
            inputActions={{
              onKeyPress: (event) => addNewTaskOnEnter(event, activeTodo),
              onChange: () => this.handleTypeNewTask(true),
              onFocus: () => this.activateToDoTask(true)
            }}
          >
            <button
              className={"clearInput " +  (typeNewTask ? 'active' : 'inactive')}
              onClick={() => this.handleTypeNewTask(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <button
              className={"add-new-todo-button " +  (typeNewTask ? 'active' : 'inactive')}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.addNewTask(activeTodo)
              }}
            >
              Add
            </button>
          </BasicInput>
          <EmptyTaskWrapper numberOfTasks={getTasksForTodo(tasks, activeTodo).length}/>
        </Panel>
      </div>
    )
  }
};

ListOfTasks.contextTypes = {
  store: PropTypes.object
};