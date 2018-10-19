import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import ButtonToImportance from './ButtonToImportance';
import {
  getStringDate,
  getActiveTodoList
} from '../helpers';
import {
  toggleTask,
  activateTaskSettings, handleTaskImportanance,
} from '../actionCreators';

export default class Task extends Component {

  renderLabel(task) {
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos, steps }} = state;
    let { todoListId: activeTodoId } = getActiveTodoList(todos);
    let { id: taskId, note, remindDate, dueDate, repeat } = task;

    const setLabelFromTodo = task => {
      switch (activeTodoId){
        case 0:
          if(task.todoIsParent) {
            return {
              text: 'Tasks',
              iconSrc: ''
            };
          } else if (task.parentId >= 3) {
            let taskParent = todos.find(todo => todo.todoListId === task.parentId);
            return {
              text: taskParent.title,
              iconSrc: taskParent.iconSource
            }
          }
          return;
        case 1:
          if(task.todoIsParent){
            if(task.myDay) {
              return {
                text: 'My Day • Tasks',
                iconSrc: 'far fa-sun'
              }
            } else {
              return {
                text: 'Tasks',
                iconSrc: ''
              }
            }
          }
          return;
        default:
          if(task.myDay) {
            return {
              text: 'My Day',
              iconSrc: 'far fa-sun'
            };
          }
          return;
      }
    };

    const countStepsForTask = taskId => {
      let allTaskSteps = steps.filter(step => step.taskId === taskId);
      let doneSteps = allTaskSteps.filter(step => step.done);
      if(allTaskSteps.length !== 0) {
        return (
          <p>{doneSteps.length} of {allTaskSteps.length}</p>
        );
      }
    };

    if(
      (note || remindDate || dueDate || repeat) ||
      countStepsForTask(taskId) ||
      setLabelFromTodo(task)
    ) {
      return (
        <div className="label-wrapper-for-task">
          <div className="list-of-labels">
            {
              countStepsForTask(taskId)
            }
            {
              setLabelFromTodo(task) &&
              <p className="todo-label-for-task">
                <i className={setLabelFromTodo(task).iconSrc}></i>
                {setLabelFromTodo(task).text}
              </p>
            }
            {
              dueDate &&
              (<p className="due-date-label">
                &#8226;&nbsp;&nbsp;
                <i className="far fa-calendar-alt"></i>
                {getStringDate(dueDate)}
              </p>)
            }
            {
              remindDate &&
              (<p className="remind-date-label">
                &#8226;&nbsp;&nbsp;
                <i className="far fa-clock"></i>
                {getStringDate(remindDate)}
              </p>)
            }
            {
              repeat &&
              (<p className="repeat-date-label">
                &#8226;&nbsp;&nbsp;
                <i className="fas fa-redo"></i>
              </p>)
            }
            {
              note &&
              (<p className="task-notes">
                &#8226;&nbsp;&nbsp;
                <i className="far fa-sticky-note"></i>
                Notes
              </p>)
            }
          </div>
        </div>
      )
    }
    return;
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const { userSettings: { turnOnSound }} = state;
    let { task } = this.props;
    let { id, done, taskText } = task;

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

    const handleImportance = (taskId) => {
      store.dispatch(handleTaskImportanance(taskId))
    };

    return (
      <div
        className="todo background-wrapper"
        onClick={() => activateSettings(id)}
      >
        <div className="added-todo">
          <label
            className={"toggleTodoLabel "+(done ? "done" : '')}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTodoTask(task);
            }}
          >
            <i className={done ? "fas fa-check-circle" : "far fa-check-circle"}></i>
          </label>
          <div className="task-title-wrapper">
            <p className={done ? 'lineThrough' : null}>{taskText}</p>
            {this.renderLabel(task)}
          </div>
          <ButtonToImportance
            task={task}
            setImportance={(id) => handleImportance(id)}
          />
        </div>
      </div>
    )
  }
};

Task.contextTypes = {
  store: PropTypes.object
};