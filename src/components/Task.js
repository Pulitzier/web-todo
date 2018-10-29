import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import ImportanceButton from './ImportanceButton';
import {
  getStringDate,
  getActiveTodoList,
  playSoundWhenDone
} from '../helpers';
import {
  toggleTask,
  activateTaskSettings, handleTaskImportanance,
} from '../actionCreators';
import BasicLabel from "./BasicLabel";
import BasicPanel from "./BasicPanel";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.handleImportance = this.handleImportance.bind(this);
    this.activateSettings = this.activateSettings.bind(this);
    this.toggleTodoTask = this.toggleTodoTask.bind(this);
  };

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
              iconSrc: (taskParent.iconSource !== "fa-list" ? taskParent.iconSource : '')
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
          } else if (task.parentId >= 3) {
            let taskParent = todos.find(todo => todo.todoListId === task.parentId);
            return {
              text: taskParent.title,
              iconSrc: (taskParent.iconSource !== "fa-list" ? taskParent.iconSource : '')
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
        return {
          text: `${doneSteps.length} of ${allTaskSteps.length}`,
          iconSrc: ''
        }
      }
    };

    const generateLabels = (elem, src) => ({
      text: elem,
      iconSrc: src
    });
    const setLabelsCategories = (object, key) => {
      if(!(key in object)) object[key] = [];
      return (value) => object[key].push(value);
    };

    let labelsObject = {};
    setLabelFromTodo(task) && setLabelsCategories(labelsObject, "category")(setLabelFromTodo(task));
    countStepsForTask(taskId) && setLabelsCategories(labelsObject, "steps")(countStepsForTask(taskId));
    dueDate && setLabelsCategories(labelsObject, "dueDate")(generateLabels(getStringDate(dueDate), "far fa-calendar-alt"));
    repeat && setLabelsCategories(labelsObject, "dueDate")(generateLabels("", "fas fa-redo"));
    remindDate && setLabelsCategories(labelsObject, "remindDate")(generateLabels(getStringDate(remindDate),"far fa-clock"));
    note && setLabelsCategories(labelsObject, "notes")(generateLabels("","far fa-sticky-note"));

    const generateLabelsLayout = (object) => {
      let labelsCategories = Object.keys(object);
      if (labelsCategories.length === 1) {
        return object[labelsCategories[0]].map((label,i) => (
          <p key={i} className="label-for-task">
            { label.iconSrc && <i className={label.iconSrc}></i> }
            { label.text && <span>{label.text}</span> }
          </p>
        ))
      } else if (labelsCategories.length > 1) {
        let readyLabels = [],
          index = 0;
        for (let labelCategory in object) {
          object[labelCategory].map(label => {
            readyLabels.push(
              <p key={index} className="label-for-task">
                { (readyLabels.length !== 0) && <i className="fas fa-circle"></i> }
                { label.iconSrc && <i className={label.iconSrc}></i> }
                { label.text && <span>{label.text}</span> }
              </p>
            );
            index++;
          })
        }
        return readyLabels;
      }
    };

    if(Object.keys(labelsObject).length !== 0) {
      return (
        <div className="label-wrapper-for-task">
          <div className="list-of-labels">
            {generateLabelsLayout(labelsObject)}
          </div>
        </div>
      )
    }
    return;
  };

  toggleTodoTask(task, turnOnSound) {
    const { store } = this.context;
    let { id, done } = task;
    turnOnSound && playSoundWhenDone(done, turnOnSound);
    store.dispatch(toggleTask(id));
  };

  activateSettings(taskId) {
    const { store } = this.context;
    store.dispatch(activateTaskSettings(taskId, true));
  };

  handleImportance(taskId) {
    const { store } = this.context;
    store.dispatch(handleTaskImportanance(taskId))
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const { userSettings: { turnOnSound }} = state;
    let { task } = this.props;
    let { id, done, taskText } = task;

    const handleToggleLabel = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.toggleTodoTask(task, turnOnSound);
    };

    return (
      <div
        className="todo background-wrapper"
        onClick={() => this.activateSettings(id)}
      >
        <BasicPanel className="added-todo">
          <BasicLabel
            labelClassName={("toggle-todo-label "+(done ? "done" : ''))}
            iconClassName={(done ? "fas fa-check-circle" : "far fa-check-circle")}
            labelOnClickAction={(event) => handleToggleLabel(event)}
          />
          <div className="task-title-wrapper">
            <p className={done ? 'lineThrough' : null}>{taskText}</p>
            {this.renderLabel(task)}
          </div>
          <ImportanceButton
            task={task}
            setImportance={(id) => this.handleImportance(id)}
          />
        </BasicPanel>
      </div>
    )
  }
};

Task.contextTypes = {
  store: PropTypes.object
};