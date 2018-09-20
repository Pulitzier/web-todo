import React, { Component } from 'react';
import PropTypes  from 'react-proptypes';
import Panel from './Panel';
import {
  toggleTask,
  setShowFilter
} from '../actionCreators';

export default class SearchPanel extends Component {
  constructor(){
    super();
    this.openFilterMenu = this.openFilterMenu.bind(this);
    this.search = {
      word: '',
      openFilterMenu: false
    };
  };

  setSearchWord = (e) => {
    let value = e.target.value;
    this.setState(() => {
      return this.search = {
        word: value
      }
    });
  };

  openFilterMenu(bool) {
    this.setState(() => {
      return this.search = {
        ...this.search,
        openFilterMenu: bool
      }
    })
  }

  render(){
    let searchWord = this.search.word;
    const { store } = this.context;
    const state = store.getState();
    const { app: { tasks }, search: { showCompleted } } = state;
    let { openFilterMenu } = this.search;

    const toggleTodoTask = (taskId) => {
      store.dispatch(toggleTask(taskId))
    };

    const showCompletedTasks = (bool) => {
      store.dispatch(setShowFilter(bool))
    };

    return (
      <Panel className="search-modal">
        <div className="background-wrapper">
          <div className="search-input-wrapper">
            <input
              type="text"
              ref={node => this.searchTaskNode = node}
              onChange={(e) => this.setSearchWord(e)}
            />
            <button
              className={"clearSearch " + (searchWord ? 'active' : 'inactive')}
              onClick={() => {
                this.searchTaskNode.value = '';
                this.setState(() => {
                  return this.search = {
                    word: ''
                  }
                })
              }}
            >x</button>
          </div>
          <button
            className="set-filter"
            onClick={() => this.openFilterMenu(!openFilterMenu)}
          >
            <span>&bull;&bull;&bull;</span>
          </button>
          {
            openFilterMenu &&
            (
              <div className="filter-menu">
                {
                  showCompleted ?
                    (<p onClick={() => showCompletedTasks(false)}>
                      Hide completed to-dos
                    </p>) :
                    (<p onClick={() => showCompletedTasks(true)}>
                      Show completed to-dos
                    </p>)
                }
              </div>
            )
          }
        </div>
        <hr/>
        <div>
          <img className={searchWord ? "inactive" : "active"} src="./assets/ufo.jpg" alt="Nothing to Search"/>
          <ul className={"searchList " + (searchWord ? "active" : "inactive")}>
            {
              tasks.map((task, index) => {
                if (task.taskText.indexOf(searchWord) !== -1) {
                  if (!showCompleted && task.done) {
                    return;
                  }
                  return (
                    <li key={index}>
                      <label
                        htmlFor="searchTaskCheckbox"
                        className={
                          "searchTaskLabel " +
                          (task.done ? 'toggled' : '')
                        }
                      >
                        <input
                          id="searchTaskCheckbox"
                          type="checkbox"
                          onChange={() => toggleTodoTask(task.id)}
                        />
                        <span></span>
                      </label>
                      <p className={task.done ? 'lineThrough' : null}>{task.taskText}</p>
                    </li>
                  )
                }
              })
            }
          </ul>
        </div>
      </Panel>
    )
  }
};

SearchPanel.contextTypes = {
  store: PropTypes.object,
};