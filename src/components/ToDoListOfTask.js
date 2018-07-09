import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import Button from './Button.js';
import { filterArray } from '../helpers.js';
import {
  activateTask,
  addNewTaskToList,
  typeNewTaskAction
} from '../actionCreators';

export default class ToDoListOfTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const activeTodo = filterArray(todos);

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

    return(
      <div className="todo-list-wrapper">
        <div className="todo-list">
          {(() => {
            return activeTodo.tasks.map((item, i) => (
              <div key={i} className="todos">{item}</div>
            ))
          })()}
          <div className="todos">
            <div className="add-new-todo">
              <div className="add-new-todo-wrapper">
                <div>
                  <label
                    htmlFor="toggleTodoCheckbox"
                    className={
                      "toggleTodoLabel " +
                      (state.activateNewTask ? 'active ' : 'inactive ') +
                      ((state.activateNewTask && this.state.toggleTodoTask) ? 'toggled' : 'untoggled')
                    }
                  >
                    <input
                      id="toggleTodoCheckbox"
                      type="checkbox"
                      onChange={this.toggleTodoTask}
                    />
                    <span></span>
                  </label>
                  <input
                    type="text"
                    name="add new task"
                    ref={node => this.newTaskInput = node}
                    placeholder={!state.activateNewTask ? "+ Add a to-do" : "Add a to-do"}
                    className={"add-new-todo-input " + (state.activateNewTask ? "activated" : "inactive")}
                    onFocus={() => activateToDoTask(true)}
                    onChange={() => typeNewTask(true)}
                    value={this.props.currentTask}
                  />
                  <Button className={"clearInput " +  (state.typeNewTask ? 'active' : 'inactive')} onClick={() => typeNewTask(false)} >x</Button>
                </div>
                <Button className={"add-new-todo-button " +  (state.typeNewTask ? 'active' : 'inactive')} onClick={() => addNewTask()} >Add</Button>
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