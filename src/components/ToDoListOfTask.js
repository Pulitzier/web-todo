import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import Button from './Button.js';
import { getActiveTodoList } from '../helpers.js';
import {
  activateTask,
  addNewTaskToList,
  typeNewTaskAction,
  toggleTask,
  activateTaskSettings
} from '../actionCreators';

export default class ToDoListOfTask extends Component {
  constructor(props) {
    super(props);
    this.todoState = {
      activateTodoTask: false,
      toggleTodoTask: false,
    }
  };
  componentDidMount() {
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  };
  componentWillUnmount() {
    this.unsubscribe();
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const todos = state.todos;
    const activeTodo = getActiveTodoList(todos);

    const activateToDoTask = (bool) => {
      store.dispatch(activateTask(bool));
      document.querySelector('body').addEventListener('dblclick', () => {
        store.dispatch(activateTask(false));
        store.dispatch(typeNewTaskAction(false));
        this.newTaskInput.value = '';
      })
    };

    const typeNewTask = (bool) => {
      store.dispatch(typeNewTaskAction(bool));
      !bool ? this.newTaskInput.value = '' : null;
    };

    const addNewTask = () => {
      let newTask = this.newTaskInput.value;
      store.dispatch(addNewTaskToList(newTask, activeTodo));
      store.dispatch(typeNewTaskAction(false));
      this.newTaskInput.focus();
      this.newTaskInput.value = '';
    };

    const toggleTodoTask = (task, listItemId) => {
      store.dispatch(toggleTask(task, listItemId));
    };

    const activateSettings = (task, bool) => {
      console.log(task, bool);
      store.dispatch(activateTaskSettings(task, bool));
    };

    return(
      <div className="todo-list-wrapper">
        <div className="todo-list">
          {(() => {
            return activeTodo.tasks.map((item, i) => (
                <div
                  key={i}
                  className="todos"
                  onClick={() => activateSettings(item, true)}
                >
                  <label
                    className={
                      "toggleTodoLabel " +
                      (item.done ? "done" : '')
                    }
                  >
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleTodoTask(item, activeTodo.todoListId);
                      }}
                    ></span>
                  </label>
                  <p className={item.done ? 'lineThrough' : null}>{item.task}</p>
                </div>
              ))
          })()}
          <div className="todos">
            <div className="add-new-todo">
              <div className="add-new-todo-wrapper">
                <div>
                  <label
                    htmlFor="toggleTodoCheckbox-template"
                    className={
                      "toggleTodoLabel-template " +
                      (state.tasks.activateNewTask ? 'active ' : 'inactive ') +
                      ((state.tasks.activateNewTask && this.todoState.toggleTodoTask) ? 'toggled' : 'untoggled')
                    }
                  >
                    <input
                      id="toggleTodoCheckbox-template"
                      type="checkbox"
                      onChange={this.toggleTodoTask}
                    />
                    <span></span>
                  </label>
                  <input
                    type="text"
                    name="add new task"
                    ref={node => this.newTaskInput = node}
                    placeholder={!state.tasks.activateNewTask ? "+ Add a to-do" : "Add a to-do"}
                    className={"add-new-todo-input " + (state.tasks.activateNewTask ? "activated" : "inactive")}
                    onFocus={() => activateToDoTask(true)}
                    onChange={() => typeNewTask(true)}
                    value={this.props.currentTask}
                  />
                  <Button className={"clearInput " +  (state.tasks.typeNewTask ? 'active' : 'inactive')} onClick={() => typeNewTask(false)} >x</Button>
                </div>
                <Button className={"add-new-todo-button " +  (state.tasks.typeNewTask ? 'active' : 'inactive')} onClick={() => addNewTask()} >Add</Button>
              </div>
            </div>
          </div>
          <div className="todos"></div>
          <div className="todos"></div>
          <div className="todos"></div>
          <div className="todos"></div>
          <div className="todos"></div>
          <div className="todos"></div>
        </div>
      </div>
    )
  }
};

ToDoListOfTask.contextTypes = {
  store: PropTypes.object
}