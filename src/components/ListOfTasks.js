import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import {
  activateTask,
  addNewTaskToList,
  typeNewTaskAction
} from '../actionCreators';
import Task from "./Task";
import { getTasksForTodo } from "../helpers";

export default class ListOfTasks extends Component {
  constructor(props) {
    super(props);
    this.todoState = {
      activateTodoTask: false,
      localToggleTask: false,
    };
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

    const activateToDoTask = (bool) => {
      store.dispatch(activateTask(bool));
      document.addEventListener('dblclick', () => {
        store.dispatch(activateTask(false));
        store.dispatch(typeNewTaskAction(false));
        this.newTaskInput.value = '';
      })
    };

    const handleTypeNewTask = (bool) => {
      store.dispatch(typeNewTaskAction(bool));
      !bool ? this.newTaskInput.value = '' : null;
    };

    const addNewTask = (activeTodo) => {
      let newTask = this.newTaskInput.value;
      store.dispatch(addNewTaskToList(newTask, activeTodo));
      store.dispatch(typeNewTaskAction(false));
      this.newTaskInput.focus();
      this.newTaskInput.value = '';
    };

    const setHeight = () => {
      if(activeTodo.sortOrder) {
        return 400;
      }
      return 450;
    };

    const addNewTaskOnEnter = (event, todo) => {
      let { key } = event;
      if (key === 'Enter') {
        addNewTask(todo);
      }
    };

    return(
      <div
        className="todo-list-wrapper"
        style={{ height: setHeight() }}
      >
        <div className="todo-list">
          {
            getTasksForTodo(tasks, activeTodo).map((task, index) => {
              if ( !showCompleted && task.done ) {
                return;
              }
              return <Task key={index} task={task} />
            })
          }
          <div className="add-new-todo-wrapper">
            <label
              htmlFor="toggleTodoCheckbox-template"
              className={
                "toggleTodoLabel-template " +
                (activateNewTask ? 'active ' : 'inactive ') +
                ((activateNewTask && localToggleTask) ? 'toggled' : 'untoggled')
              }
            >
              <span></span>
            </label>
            <input
              id="toggleTodoCheckbox-template"
              type="text"
              name="add-new-task"
              ref={node => this.newTaskInput = node}
              placeholder="Add a to-do"
              className={"add-new-todo-input " + (activateNewTask ? "activated" : "inactive")}
              onFocus={() => activateToDoTask(true)}
              onChange={() => handleTypeNewTask(true)}
              onKeyPress={(event) => addNewTaskOnEnter(event, activeTodo)}
            />
            <button
              className={"clearInput " +  (typeNewTask ? 'active' : 'inactive')}
              onClick={() => handleTypeNewTask(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <button
              className={"add-new-todo-button " +  (typeNewTask ? 'active' : 'inactive')}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addNewTask(activeTodo)
              }}
            >
              Add
            </button>
          </div>
          <div className="todo"></div>
          <div className="todo"></div>
          <div className="todo"></div>
          <div className="todo"></div>
          <div className="todo"></div>
          <div className="todo"></div>
        </div>
      </div>
    )
  }
};

ListOfTasks.contextTypes = {
  store: PropTypes.object
};