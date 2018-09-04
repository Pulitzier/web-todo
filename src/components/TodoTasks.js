import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import ButtonToImportance from './ButtonToImportance';
import { getStringDate } from '../helpers';
import {
  toggleTask,
  activateTaskSettings,
} from '../actionCreators';

export default class TodoTasks extends Component {

  renderLabel(task) {
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos, steps }} = state;
    let { id: taskId, note, remindDate, dueDate, repeat } = task;

    const setLabelFromTodo = task => {
      switch (task.parentId){
        case 0:
          if(task.todoIsParent) {
            return {
              text: 'To-Do',
              imgSrc: ''
            };
          } else if (task.parentId >= 3) {
            let taskParent = todos.find(todo => todo.todoListId === task.parentId);
            return {
              text: taskParent.title,
              imgSrc: taskParent.iconSource
            }
          }
          return;
        case 1:
          if(task.todoIsParent){
            if(task.myDay) {
              return {
                text: 'My Day • To-Do',
                imgSrc: './assets/sun.svg'
              }
            } else {
              return {
                text: 'To-Do',
                imgSrc: ''
              }
            }
          }
          return;
        case 2:
          if(task.myDay) {
            return {
              text: 'My Day',
              imgSrc: './assets/sun.svg'
            };
          }
          return;
        default:
          if(task.myDay) {
            return {
              text: 'My Day',
              imgSrc: './assets/sun.svg'
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
                <img src={setLabelFromTodo(task).imgSrc}/>
                {setLabelFromTodo(task).text}
              </p>
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
            {
              repeat &&
              (<p className="repeat-date-label">
                &#8226;&nbsp;&nbsp;
                <img src='./assets/repeat.svg' />
              </p>)
            }
            {
              note &&
              (<p className="task-notes">
                &#8226;&nbsp;&nbsp;
                <img src='./assets/writing.svg' />
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
    const {
      userSettings: { turnOnSound },
      taskSettings: { showCompleted }
    } = state;
    let { tasks } = this.props;

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


    return tasks.map((task, i) => {
        let { id, done, taskText } = task;
        if ( !showCompleted && done ) {
          return;
        }
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
              {this.renderLabel(task)}
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