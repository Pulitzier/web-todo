import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  getTasksForTodo,
  getActiveTodoList
} from '../helpers';
import {
  toggleTask,
  activateTaskSettings,
  handleTaskImportanance,
} from '../actionCreators';

export default class TodoTasks extends Component {
  render() {
    const { store } = this.context;
    const state = store.getState();
    const { app: { tasks, todos }, userSettings: { turnOnSound } } = state;
    const activeTodo = getActiveTodoList(todos);

    const playSoundWhenDone = (taskDone) => {
      let audio = document.getElementById("soundOnComplete");
      if (turnOnSound && !taskDone) audio.play();
    };

    const toggleTodoTask = (task) => {
      turnOnSound ? playSoundWhenDone(task.done) : null;
      store.dispatch(toggleTask(task.id));
    };

    const handleImportance = (taskId) => {
      store.dispatch(handleTaskImportanance(taskId))
    };

    const activateSettings = (taskId) => {
      store.dispatch(activateTaskSettings(taskId, true));
    };

    return getTasksForTodo(tasks, activeTodo)
      .map((task, i) => {
        return (
          <div
            key={i}
            className="todos"
            onClick={() => activateSettings(task.id)}
          >
            <label
              className={
                "toggleTodoLabel " +
                (task.done ? "done" : '')
              }
            >
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTodoTask(task);
            }}
          ></span>
            </label>
            <p className={task.done ? 'lineThrough' : null}>{task.taskText}</p>
            <button
              className="important-icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleImportance(task.id);
              }}
            >
              {
                task.important ?
                  (<img src="./assets/star-fill.svg"/>) :
                  (<img src="./assets/star.svg"/>)
              }
            </button>
          </div>
        )
      })
  }
};

TodoTasks.contextTypes = {
  store: PropTypes.object
};