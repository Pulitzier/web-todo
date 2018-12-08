import React, { Component, Fragment } from 'react';
import PropTypes from 'react-proptypes';
import CategoryLabel from './CategoryLabel';
import StepsLabel from './StepsLabel';
import DueDateLabel from './DueDateLabel';
import RemindLabel from './RemindLabel';
import NotesLabel from './NotesLabel';

export default class MainLabel extends Component {
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
    const categoryLabel = new CategoryLabel(categories, task);
    const stepsLabel = new StepsLabel(steps, task);
    const dueDateLabel = new DueDateLabel(task);
    const notesLabel = new NotesLabel(task);
    const remindLabel = new RemindLabel(task);

    let labels = [];
    if (categoryLabel.setLabel()) labels.push(categoryLabel.setLabel());
    if (stepsLabel.setLabel()) labels.push(stepsLabel.setLabel());
    if (dueDateLabel.setLabel()) labels.push(dueDateLabel.setLabel());
    if (remindLabel.setLabel()) labels.push(remindLabel.setLabel());
    if (notesLabel.setLabel()) labels.push(notesLabel.setLabel());
    return labels;
  };

  renderLabel() {
    if (this.getAllSubLabels().length !== 0) {
      return (
        <div className="label-wrapper-for-task">
          <div className="list-of-labels">
            {
              this.getAllSubLabels().map((label, index) => {
                return (
                  <Fragment key={index}>
                    {MainLabel.showDelimiter(index)}
                    {label}
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

MainLabel.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  task: PropTypes.shape({}).isRequired,
};
