import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import connect from 'react-redux/es/connect/connect';
import { getActiveTodoList, getStringDate } from '../../helpers';

const mapStateToProps = ({ app }) => ({
  categories: app.categories,
  steps: app.steps,
});

class TaskLabelView extends Component {
  renderLabel(task) { // eslint-disable-line no-shadow
    const { categories, steps } = this.props;
    const { todoListId: activeTodoId } = getActiveTodoList(categories);
    const {
      id: taskId, note, remindDate, dueDate, repeat,
    } = task;

    const setLabelFromTodo = ({ myDay, parentId, todoIsParent }) => {
      const taskParent = categories.find(todo => todo.todoListId === parentId);
      switch (activeTodoId) {
        case 0:
          if (todoIsParent) {
            return {
              text: 'Tasks',
              iconSrc: '',
            };
          }
          if (parentId >= 3) {
            return {
              text: taskParent.title,
              iconSrc: (taskParent.iconSource !== 'fa-list' ? taskParent.iconSource : ''),
            };
          }
          return null;
        case 1:
          if (todoIsParent) {
            if (myDay) {
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
          if (parentId >= 3) {
            return {
              text: taskParent.title,
              iconSrc: (taskParent.iconSource !== 'fa-list' ? taskParent.iconSource : ''),
            };
          }
          return null;
        default:
          if (myDay) {
            return {
              text: 'My Day',
              iconSrc: 'far fa-sun',
            };
          }
      }
      return null;
    };

    const countStepsForTask = (parentId) => {
      const allTaskSteps = steps.filter(step => step.taskId === parentId);
      const doneSteps = allTaskSteps.filter(step => step.done);
      if (allTaskSteps.length !== 0) {
        return {
          text: `${doneSteps.length} of ${allTaskSteps.length}`,
          iconSrc: '',
        };
      }
      return null;
    };

    const generateLabels = (elem, src) => ({
      text: elem,
      iconSrc: src,
    });
    /* eslint-disable */

    const setLabelsCategories = (object, key) => {
      if (!(key in object)) {
        object[key] = [];
      }
      return value => object[key].push(value);
    };

    const labelsObject = Object.create(null);

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
          /* eslint-enable */
        }
        return readyLabels;
      }
      return null;
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
    const { task } = this.props;
    return this.renderLabel(task);
  }
}

TaskLabelView.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  task: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, null)(TaskLabelView);
