import React, { Component, Fragment } from 'react';
import PropTypes from 'react-proptypes';
import OtherCategories from './OtherCategories';
import Steps from './Steps';
import DueDate from './DueDate';
import RemindMe from './RemindMe';
import Notes from './Notes';
import MyDayCategory from './MyDayCategory';

export default class LabelWrapper extends Component {
  static showDelimiter(index) {
    if (index !== 0) return <i className="fas fa-circle" />;
    return null;
  }

  constructor(props) {
    super(props);
    this.renderLabel = this.renderLabel.bind(this);
    this.getAllSubLabels = this.getAllSubLabels.bind(this);
  }

  getAllSubLabels() {
    const { categories, task, steps } = this.props;
    const myDayCategoryLabel = new MyDayCategory(categories, task);
    const categoryLabel = new OtherCategories(categories, task);
    const stepsLabel = new Steps(steps, task);
    const dueDateLabel = new DueDate(task);
    const notesLabel = new Notes(task);
    const remindLabel = new RemindMe(task);

    let labels = [];
    labels.push(myDayCategoryLabel);
    labels.push(categoryLabel);
    labels.push(stepsLabel);
    labels.push(dueDateLabel);
    labels.push(remindLabel);
    labels.push(notesLabel);
    return labels;
  };

  renderLabel() {
    let renderLabels = this.getAllSubLabels().filter(item => item.shouldBeRendered());
    if (renderLabels.length !== 0) {
      return (
        <div className="label-wrapper-for-task">
          <div className="list-of-labels">
            {
              renderLabels.map((label, index) => {
                return (
                  <Fragment key={index}>
                    {LabelWrapper.showDelimiter(index)}
                    {label.render()}
                  </Fragment>
                )
              })
            }
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    return this.renderLabel();
  }
}

LabelWrapper.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  task: PropTypes.shape({}).isRequired,
};
