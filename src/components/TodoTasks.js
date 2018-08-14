import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import ButtonToImportance from './ButtonToImportance';
import {
  getTasksForTodo,
  getActiveTodoList, getStringDate
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

    const activateSettings = (taskId) => {
      store.dispatch(activateTaskSettings(taskId, true));
    };

    const setTaskLabel = (task) => {
      switch (activeTodo.todoListId){
        case 0:
          if(task.todoIsParent) {
            return (
              <p className="todo-label-for-task">To-Do</p>
            );
          }
          return (
              <p className="todo-label-for-task"></p>
            );
        case 1:
          let todoLabelForTask = task.todoIsParent ?
            task.myDay ? (<p className="todo-label-for-task">
                <img src="./assets/sun.svg" />My Day &#8226; To-Do</p>) :
              (<p className="todo-label-for-task">To-Do</p>) :
            (<p className="todo-label-for-task"></p>);
          return todoLabelForTask;
        case 2:
          if(task.myDay) {
            return (
              <p className="todo-label-for-task">
                <img src="./assets/sun.svg" />
                My Day
              </p>
            );
          }
          return (
            <p className="todo-label-for-task"></p>
          );
        default:
          if(task.myDay) {
            return (
              <p className="todo-label-for-task">
                <img src="./assets/sun.svg"/>My Day &#8226; {activeTodo.title}
              </p>
            );
          }
          return (
            <p className="todo-label-for-task"></p>
          );
      }
    };

    return getTasksForTodo(tasks, activeTodo)
      .map((task, i) => {
        let { id, done, taskText, note, remindDate, dueDate, repeat } = task;
        return (
          <div
            key={i}
            className="todos"
            onClick={() => activateSettings(id)}
          >
            <label
              className={
                "toggleTodoLabel " +
                (done ? "done" : '')
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
            <div className="task-title-wrapper">
              <p className={done ? 'lineThrough' : null}>{taskText}</p>
              <div className="label-wrapper-for-task">
                <div>
                  {
                    setTaskLabel(task)
                  }
                  {
                    note && (<p className="task-notes">
                      &#8226;&nbsp;&nbsp;<img src='./assets/writing.svg' />Notes</p>)
                  }
                  {
                    dueDate &&
                    (<p className="due-date-label">
                      &#8226;&nbsp;&nbsp;
                      <img src='./assets/calendar.svg' />
                      {getStringDate(dueDate)}
                    </p>)
                  }
                  {
                    remindDate &&
                    (<p className="remind-date-label">
                      &#8226;&nbsp;&nbsp;
                      <img src='./assets/clock.svg' />
                      {getStringDate(remindDate)}
                    </p>)
                  }
                </div>
              </div>
            </div>
            <ButtonToImportance task={task}/>
          </div>
        )
      })
  }
};

TodoTasks.contextTypes = {
  store: PropTypes.object
};