import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getActiveTodoList } from "../helpers";
import BannerForTodo from './BannerForTodo.js';
import ToDoListOfTask from './ToDoListOfTask.js';
import Panel from './Panel';
import Button from './Button';
import TaskSettings from './TaskSettings';
import {
  onChangeSearchInput,
  openSearchPanel,
} from '../actionCreators'

export default class RightPanel extends Component {
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
    let activeTask = activeTodo.tasks.find(task => task.active === true)  || '';

    return (
      <Panel className="col-md-8 rightPanel">
        <div>
          <Panel className={"search-modal " + (state.activateSearch ? "active" : "inactive")}>
            <div className="background-wrapper">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  value={state.searchInput}
                  onChange={(e) => {
                    let value = e.target.value;
                    store.dispatch(onChangeSearchInput(value));
                  }}
                />
                <Button
                  className={"clearSearch " + (state.searchInput ? 'active' : 'inactive')}
                  onClick={() => {
                    store.dispatch(onChangeSearchInput(''))
                  }}
                >x</Button>
              </div>
              <Button
                className="cancel-seacrh"
                onClick={() => store.dispatch(openSearchPanel(false))}
              >CANCEL</Button>
            </div>
            <hr/>
            <div>
              <img src="./assets/ufo.jpg" alt="Nothing to Search"/>
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
        <TaskSettings activeTask={activeTask}/>
      </Panel>
    )
  }
};

RightPanel.contextTypes = {
  store: PropTypes.object,
};