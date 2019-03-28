import React, { Component, Fragment } from 'react';
import PropTypes from 'react-proptypes';
import MyDayCategory from './MyDayCategory';
import TasksCategory from './TasksCategory';
import UserCategory from './UserCategory';
import Steps from './Steps';
import DueDate from './DueDate';
import RemindMe from './RemindMe';
import Notes from './Notes';

export default class LabelWrapper extends Component {
  static showDelimiter(index) {
    if (index !== 0) return <i className="fas fa-circle" key={index}/>;
    return null;
  }

  constructor(props) {
    super(props);
    this.getAllSubLabels = this.getAllSubLabels.bind(this);
    this.renderThisLabels = this.renderThisLabels.bind(this);
  }

  getAllSubLabels() {
    const { categories, task, steps } = this.props;
    const myDayCategoryLabel = new MyDayCategory(categories, task);
    const taskCategory = new TasksCategory(categories, task);
    const userCategory = new UserCategory(categories, task);
    const stepsLabel = new Steps(steps, task);
    const dueDateLabel = new DueDate(task);
    const notesLabel = new Notes(task);
    const remindLabel = new RemindMe(task);

    return [
      myDayCategoryLabel,
      taskCategory,
      userCategory,
      stepsLabel,
      dueDateLabel,
      remindLabel,
      notesLabel
    ].filter(item => item.shouldBeRendered());
  };

  renderThisLabels() {
    return (
    <div className="label-wrapper-for-task">
      <div className="list-of-labels">
        { this.getAllSubLabels().map( (label, index) => [ LabelWrapper.showDelimiter(index), label.render(index)] )}
      </div>
    </div>
    )
  }

  render() {
    return (this.getAllSubLabels().length === 0) ? null : this.renderThisLabels();
  }
}

LabelWrapper.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  task: PropTypes.shape({}).isRequired,
};
