import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { revertTasks, sortTasks } from '../../store/actions/index';
import BasicButton from '../BaseComponents/BasicButton';

export default class SortPopUp extends Component {
  constructor(props) {
    super(props);
    this.handleSortTasks = this.handleSortTasks.bind(this);
    this.setSortMessage = this.setSortMessage.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
    this.state = {
      reverseTasks: false,
    };
  }

  handleSortTasks(sortCriteria) {
    const { store } = this.context;
    const { todoListId } = this.props;
    store.dispatch(sortTasks(sortCriteria, todoListId));
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
    const { store } = this.context;
    this.setState({ reverseTasks: !this.state.reverseTasks });
    store.dispatch(revertTasks());
  }

  render() {
    const { bgColor } = this.props;
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
          buttonOnClickAction={() => this.handleSortTasks('')}
          iconClassName="fas fa-times"
        />
      </section>
    );
  }
}

SortPopUp.contextTypes = {
  store: PropTypes.object,
};
