import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicButton from '../../BaseComponents/BasicButton';

export default class SortPopUp extends Component {
  constructor(props) {
    super(props);
    this.setSortMessage = this.setSortMessage.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
    this.state = {
      reverseTasks: false,
    };
  }

  setSortMessage() {
    const { sortBy } = this.props;
    switch (sortBy) {
      case 'ABC':
        return 'Sorted alphabetically';
      case 'DUE_DATE':
        return 'Sorted by due date';
      case 'CREATED_AT':
        return 'Sorted by creation date';
      case 'COMPLETED':
        return 'Sorted by completed';
      case 'ADDED_TO_MY_DAY':
        return 'Sort by default';
      case 'IMPORTANT':
        return 'Sorted by importance';
      default:
        return 'Sorted by default';
    }
  }

  changeSortOrder() {
    const { handleRevertTasks } = this.props;
    const { reverseTasks: oldRevert } = this.state;
    this.setState({ reverseTasks: !oldRevert });
    handleRevertTasks();
  }

  render() {
    const { bgColor, handleSortTasks } = this.props;
    const { reverseTasks } = this.state;

    return (
      <section
        className="banner-sort"
        style={{ backgroundColor: bgColor }}
      >
        <p>{this.setSortMessage()}</p>
        <BasicButton
          buttonClassName={(`change-sort-order ${reverseTasks ? 'up' : 'down'}`)}
          buttonOnClickAction={() => this.changeSortOrder()}
          iconClassName={(`fas fa-angle-down ${reverseTasks && 'reversed'}`)}
        />
        <BasicButton
          buttonClassName="clear-banner-sort"
          buttonOnClickAction={() => handleSortTasks('')}
          iconClassName="fas fa-times"
        />
      </section>
    );
  }
}

SortPopUp.propTypes = {
  bgColor: PropTypes.string,
  sortBy: PropTypes.string,
  handleSortTasks: PropTypes.func,
  handleRevertTasks: PropTypes.func,
};

SortPopUp.defaultProps = {
  bgColor: '',
  sortBy: '',
  handleSortTasks: () => {},
  handleRevertTasks: () => {},
};
