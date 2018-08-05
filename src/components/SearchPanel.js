import React, { Component } from 'react';
import PropTypes  from 'react-proptypes';
import Panel from './Panel';
import { toggleTask } from '../actionCreators';

export default class SearchPanel extends Component {
  constructor(){
    super();
    this.search = {
      word: '',
    }
  };

  setSearchWord = (e) => {
    let value = e.target.value;
    this.setState(() => {
      return this.search = {
        word: value
      }
    });
  };

  componentDidMount(){
    let { store } = this.context;
    store.subscribe(() => {
      this.forceUpdate();
    })
  };

  render(){
    let searchWord = this.search.word;
    const { store } = this.context;
    const state = store.getState();
    const { app: { tasks }, activateSearch } = state;

    const toggleTodoTask = (taskId) => {
      store.dispatch(toggleTask(taskId))
    };

    return (
      <Panel className={"search-modal " + (activateSearch ? "active" : "inactive")}>
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
            className="cancel-seacrh"
          >
            CANCEL
          </button>
        </div>
        <hr/>
        <div>
          <img className={searchWord ? "inactive" : "active"} src="./assets/ufo.jpg" alt="Nothing to Search"/>
          <ul className={"searchList " + (searchWord ? "active" : "inactive")}>
            {
              tasks.map((task, index) => {
                if (task.taskText.indexOf(searchWord) !== -1) {
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