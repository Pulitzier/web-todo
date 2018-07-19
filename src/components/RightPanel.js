import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getActiveTodoList } from "../helpers";
import BannerForTodo from './BannerForTodo.js';
import ToDoListOfTask from './ToDoListOfTask.js';
import Panel from './Panel';
import Button from './Button';
import TaskSettings from './TaskSettings';
import {
  openSearchPanel,
} from '../actionCreators'

export default class RightPanel extends Component {
  constructor(){
    super();
    this.searchState = {
      searchTask: false,
      searchedTasks: [],
    }
  }

  componentDidMount(){
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    })
  };

  render() {
    let { store } = this.context;
    let state = store.getState();
    let activeTodo = getActiveTodoList(state.todos);

    let getAllTasks = state => {
      let allTasks=[];
      for (let key in state.todos) {
        if (key === 'myPersonalToDo') {
          allTasks = allTasks.concat(state.todos[key][1].tasks);
        } else {
          state.todos[key].map(todo => allTasks = allTasks.concat(todo.tasks));
        }
      };
      return allTasks;
    };

    let filterTasksBySearch = (searchWord, state) => {
      let tasks = [];
      searchWord ?
        getAllTasks(state).map(taskItem => {
          if (taskItem.task.indexOf(searchWord) !== -1) {
            tasks.push(taskItem);
          }
        }) :
        null;
      return tasks;
    };

    return (
      <Panel className="col-md-8 rightPanel">
        <div>
          <Panel className={"search-modal " + (state.activateSearch ? "active" : "inactive")}>
            <div className="background-wrapper">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  ref={node => this.searchTaskNode = node}
                  onChange={(e) => {
                    let value = e.target.value;
                    console.log(filterTasksBySearch(value, state));
                    this.setState(() => {
                      return this.searchState = {
                        searchTask: true,
                        searchedTasks: filterTasksBySearch(value, state)
                      }
                    });
                  }}
                />
                <button
                  className={"clearSearch " + (this.searchState.searchTask ? 'active' : 'inactive')}
                  onClick={() => {
                    this.searchTaskNode.value = '';
                    this.setState(() => {
                      return this.searchState = {
                        searchTask: false,
                        searchedTasks: []
                      }
                    })
                  }}
                >x</button>
              </div>
              <Button
                className="cancel-seacrh"
                onClick={() => store.dispatch(openSearchPanel(false))}
              >CANCEL</Button>
            </div>
            <hr/>
            <div>
              <img className={this.searchState.searchTask ? "inactive" : "active"} src="./assets/ufo.jpg" alt="Nothing to Search"/>
              <ul className={this.searchState.searchTask ? "active" : "inactive"}>
                {this.searchState.searchedTasks.map((taskItem, index) => {
                  return (
                    <li key={index}>{taskItem.task}</li>
                  )
                })}
              </ul>
            </div>
          </Panel>
          <BannerForTodo className="panelBanner" close={state.activateThemeMenu} activeTodoId={activeTodo.todoListId}>
            <h4>{(() => {
              return activeTodo.title;
            })()}</h4>
            {state.todos['myPersonalToDo'][0].active ?
              <div className="date-time">{(() => {
                let today = new Date();
                let dateStringForBanner = today.toLocaleString('en-us', {weekday: 'long'}) + ', ' +
                  today.toLocaleString('en-us', {month: 'long'}) + ' ' +
                  today.toLocaleString('en-us', {day: 'numeric'});
                return dateStringForBanner;
              })()}</div> :
              null
            }
          </BannerForTodo>
          <ToDoListOfTask
            todos={state.todos}
            currentTask={state.currentTask}
          />
        </div>
        <TaskSettings />
      </Panel>
    )
  }
};

RightPanel.contextTypes = {
  store: PropTypes.object,
};