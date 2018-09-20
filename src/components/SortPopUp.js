import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { revertTasks, sortTasks } from '../actionCreators';

export default class SortPopUp extends Component {
  constructor(props) {
    super(props);
    this.handleSortTasks = this.handleSortTasks.bind(this);
    this.setSortMessage = this.setSortMessage.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
    this.sortState = {
      reverseTasks: false
    }
  };

  handleSortTasks(sortCriteria) {
    const { store } = this.context;
    let { todoListId } = this.props;
    store.dispatch(sortTasks(sortCriteria, todoListId))
  };

  setSortMessage() {
    let { sortBy } = this.props;
    switch(sortBy) {
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
        return 'Sorted by default'
    }
  };

  changeSortOrder() {
    const { store } = this.context;
    this.setState(() => {
      return this.sortState = {
        ...this.sortState,
        reverseTasks: !this.sortState.reverseTasks
      }
    });
    store.dispatch(revertTasks());
  };

  render() {
    let { bgColor } = this.props;
    let { reverseTasks } = this.sortState;

    return(
      <section
        className="banner-sort"
        style={{backgroundColor: bgColor}}
      >
        <p>{this.setSortMessage()}</p>
        <button
          className={"change-sort-order " + (reverseTasks ? 'up' : 'down')}
          onClick={() => this.changeSortOrder()}
        >
          <img src="./assets/right.svg"/>
        </button>
        <button className="clear-banner-sort" onClick={() => this.handleSortTasks('')}>x</button>
      </section>
    )
  }
};

SortPopUp.contextTypes = {
  store: PropTypes.object
};