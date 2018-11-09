import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicPanel from './BasicPanel';
import { setShowFilter } from '../actionCreators';
import TodoTask from './TodoTask';
import BasicButton from './BasicButton';

export default class SearchPanel extends Component {
  constructor() {
    super();
    this.openFilterMenu = this.openFilterMenu.bind(this);
    this.showCompletedTasks = this.showCompletedTasks.bind(this);
    this.renderFilterMenu = this.renderFilterMenu.bind(this);
    this.state = {
      word: '',
      openFilterMenu: false,
    };
  }

  setSearchWord = (e) => {
    const value = e.target.value;
    this.setState({ word: value });
  };

  openFilterMenu(bool) {
    this.setState({ openFilterMenu: bool });
  }

  showCompletedTasks(bool) {
    const { store } = this.context;
    store.dispatch(setShowFilter(bool));
  }

  renderFilterMenu(showCompleted) {
    return (
      <div className="filter-menu">
        <p onClick={() => this.showCompletedTasks(!showCompleted)}>
          {showCompleted ? 'Hide' : 'Show'}
          {' '}
completed to-dos
        </p>
      </div>
    );
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    const { app: { tasks }, search: { showCompleted } } = state;
    const { word: searchWord, openFilterMenu } = this.state;

    return (
      <BasicPanel className="search-modal">
        <div className="search-background-wrapper">
          <div className="search-input-wrapper">
            <input
              type="text"
              ref={node => this.searchTaskNode = node}
              onChange={e => this.setSearchWord(e)}
            />
            <BasicButton
              buttonClassName={`clearSearch ${searchWord ? 'active' : 'inactive'}`}
              iconClassName="fas fa-times"
              buttonOnClickAction={() => {
                this.searchTaskNode.value = '';
                this.setState({ word: '' });
              }}
            />
          </div>
          <BasicButton
            buttonClassName="set-filter"
            iconClassName="fas fa-ellipsis-h"
            buttonOnClickAction={() => this.openFilterMenu(!openFilterMenu)}
          />
          {
            openFilterMenu
            && this.renderFilterMenu(showCompleted)
          }
        </div>
        <hr />
        <div>
          <img className={searchWord ? 'inactive' : 'active'} src="./assets/ufo.jpg" alt="Nothing to Search" />
          <div className={`searchList ${searchWord ? 'active' : 'inactive'}`}>
            {
              tasks.map((task, index) => {
                if (task.taskText.indexOf(searchWord) !== -1) {
                  if (!showCompleted && task.done) {
                    return;
                  }
                  return <TodoTask key={index} task={task} />;
                }
              })
            }
          </div>
        </div>
      </BasicPanel>
    );
  }
}

SearchPanel.contextTypes = {
  store: PropTypes.object,
};
