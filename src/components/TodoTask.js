import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import ImportanceButton from './ImportanceButton';
import {
  getStringDate,
  getActiveTodoList,
  playSoundWhenDone,
} from '../helpers';
import {
  toggleTask,
  activateTaskSettings,
  handleTaskImportanance,
} from '../store/actions/index';
import BasicLabel from './BaseComponents/BasicLabel';
import BasicPanel from './BaseComponents/BasicPanel';

export default class TodoTask extends Component {
  constructor(props) {
    super(props);
    this.handleImportance = this.handleImportance.bind(this);
    this.activateSettings = this.activateSettings.bind(this);
    this.toggleTodoTask = this.toggleTodoTask.bind(this);
  }

  handleImportance(taskId) {
    const { store } = this.context;
    store.dispatch(handleTaskImportanance(taskId));
  }

  toggleTodoTask(task, turnOnSound) {
    const { store } = this.context;
    const { id, done } = task;
    turnOnSound && playSoundWhenDone(done, turnOnSound);
    store.dispatch(toggleTask(id));
  }

  activateSettings(taskId) {
    const { store } = this.context;
    store.dispatch(activateTaskSettings(taskId, true));
  }

  renderLabel(task) { // eslint-disable-line no-shadow
    const { store } = this.context;
    const state = store.getState();
    const { app: { categories, steps } } = state;
    const { todoListId: activeTodoId } = getActiveTodoList(categories);
    const {
      id: taskId, note, remindDate, dueDate, repeat,
    } = task;

    const setLabelFromTodo = (task) => {
      switch (activeTodoId) {
        case 0:
          if (task.todoIsParent) {
            return {
              text: 'Tasks',
              iconSrc: '',
            };
          }
          if (task.parentId >= 3) {
            const taskParent = categories.find(todo => todo.todoListId === task.parentId);
            return {
              text: taskParent.title,
              iconSrc: (taskParent.iconSource !== 'fa-list' ? taskParent.iconSource : ''),
            };
          }
          return;
        case 1:
          if (task.todoIsParent) {
            if (task.myDay) {
              return {
                text: 'My Day • Tasks',
                iconSrc: 'far fa-sun',
              };
            }
            return {
              text: 'Tasks',
              iconSrc: '',
            };
          }
          if (task.parentId >= 3) {
            const taskParent = categories.find(todo => todo.todoListId === task.parentId);
            return {
              text: taskParent.title,
              iconSrc: (taskParent.iconSource !== 'fa-list' ? taskParent.iconSource : ''),
            };
          }
          return;
        default:
          if (task.myDay) {
            return {
              text: 'My Day',
              iconSrc: 'far fa-sun',
            };
          }
      }
    };

    const countStepsForTask = (taskId) => {
      const allTaskSteps = steps.filter(step => step.taskId === taskId);
      const doneSteps = allTaskSteps.filter(step => step.done);
      if (allTaskSteps.length !== 0) {
        return {
          text: `${doneSteps.length} of ${allTaskSteps.length}`,
          iconSrc: '',
        };
      }
    };

    const generateLabels = (elem, src) => ({
      text: elem,
      iconSrc: src,
    });
    const setLabelsCategories = (object, key) => {
      if (!(key in object)) object[key] = [];
      return value => object[key].push(value);
    };

    const labelsObject = {};
    setLabelFromTodo(task) && setLabelsCategories(labelsObject, 'category')(setLabelFromTodo(task));
    countStepsForTask(taskId) && setLabelsCategories(labelsObject, 'steps')(countStepsForTask(taskId));
    dueDate && setLabelsCategories(labelsObject, 'dueDate')(generateLabels(getStringDate(dueDate), 'far fa-calendar-alt'));
    repeat && setLabelsCategories(labelsObject, 'dueDate')(generateLabels('', 'fas fa-redo'));
    remindDate && setLabelsCategories(labelsObject, 'remindDate')(generateLabels(getStringDate(remindDate), 'far fa-clock'));
    note && setLabelsCategories(labelsObject, 'notes')(generateLabels('', 'far fa-sticky-note'));

    const generateLabelsLayout = (object) => {
      const labelsCategories = Object.keys(object);
      if (labelsCategories.length === 1) {
        return object[labelsCategories[0]].map((label, i) => (
          <p key={i} className="label-for-task">
            {label.iconSrc && <i className={label.iconSrc} />}
            {label.text && <span>{label.text}</span>}
          </p>
        ));
      }
      if (labelsCategories.length > 1) {
        const readyLabels = [];

        let index = 0;
        for (const labelCategory in object) {
          object[labelCategory].map((label) => {
            readyLabels.push(
              <p key={index} className="label-for-task">
                {(readyLabels.length !== 0) && <i className="fas fa-circle" />}
                {label.iconSrc && <i className={label.iconSrc} />}
                {label.text && <span>{label.text}</span>}
              </p>,
            );
            index++;
          });
        }
        return readyLabels;
      }
    };

    if (Object.keys(labelsObject).length !== 0) {
      return (
        <div className="label-wrapper-for-task">
          <div className="list-of-labels">
            {generateLabelsLayout(labelsObject)}
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    const { userSettings: { turnOnSound } } = state;
    const { task } = this.props;
    const { id, done, taskText } = task;

    const handleToggleLabel = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.toggleTodoTask(task, turnOnSound);
    };

    return (
      <div
        role="presentation"
        className="todo background-wrapper"
        onClick={() => this.activateSettings(id)}
      >
        <BasicPanel className="added-todo">
          <BasicLabel
            labelClassName={(`toggle-todo-label ${done ? 'done' : ''}`)}
            iconClassName={(done ? 'fas fa-check-circle' : 'far fa-check-circle')}
            labelOnClickAction={event => handleToggleLabel(event)}
          />
          <BasicPanel className="task-title-wrapper">
            <p className={done ? 'lineThrough' : null}>{taskText}</p>
            {this.renderLabel(task)}
          </BasicPanel>
          <ImportanceButton
            task={task}
            setImportance={id => this.handleImportance(id)}
          />
        </BasicPanel>
      </div>
    );
  }
}

TodoTask.propTypes = {
  task: PropTypes.shape({}).isRequired,
};

TodoTask.contextTypes = {
  store: PropTypes.shape({}),
};
