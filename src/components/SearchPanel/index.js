import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicPanel from '../BaseComponents/BasicPanel';
import Task from '../Task/index';
import BasicButton from '../BaseComponents/BasicButton';

export default class SearchPanelView extends Component {
  constructor() {
    super();
    this.openFilterMenu = this.openFilterMenu.bind(this);
    this.showCompletedTasks = this.showCompletedTasks.bind(this);
    this.renderFilterMenu = this.renderFilterMenu.bind(this);
    this.state = {
      word: '',
      openFilterMenu: false,
      showCompleted: true,
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
    this.setState({ showCompleted: bool });
  }

  renderFilterMenu(showCompleted) {
    return (
      <div className="filter-menu">
        <p
          role="presentation"
          onClick={() => this.showCompletedTasks(!showCompleted)}
        >
          {showCompleted ? 'Hide' : 'Show'}
          {' '}
completed to-dos
        </p>
      </div>
    );
  }

  render() {
    const { tasks } = this.props;
    const { word: searchWord, openFilterMenu, showCompleted } = this.state;

    return (
      <BasicPanel className="search-modal">
        <div className="search-background-wrapper">
          <div className="search-input-wrapper">
            <input
              type="text"
              ref={(node) => { this.searchTaskNode = node; }}
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
              tasks.map((task) => {
                if (task.taskText.indexOf(searchWord) !== -1) {
                  if (!showCompleted && task.done) {
                    return;
                  }
                  return <Task key={task.id} task={task} />;
                }
              })
            }
          </div>
        </div>
      </BasicPanel>
    );
  }
}

SearchPanelView.protoTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
