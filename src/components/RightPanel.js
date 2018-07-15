import React from 'react';
import PropTypes from 'react-proptypes';
import { getActiveTodoList } from "../helpers";
import BannerForTodo from './BannerForTodo.js';
import ToDoListOfTask from './ToDoListOfTask.js';
import Panel from './Panel';
import Button from './Button';
import {
  onChangeSearchInput,
  openSearchPanel,
} from '../actionCreators'

const RightPanel = ({ state }, { store }) => {

  const addNewTask = () => {
    this.setState((state, {toDoCategories}) => {
      let currentList = state.toDoCategories.filter((item) => item.active == true)[0];
      currentList.tasks.push(state.currentTask);
      state.currentTask = '';
      return state;
    })
  };

  const clearTaskInput = () => {
    this.setState((state) => {
      state.currentTask = '';
      return state;
    })
  };

  const handleChangeSearchInput = (e) => {
    let inputvalue = e.target.value;
    this.setState({
      searchInput: inputvalue
    });
    let arr = [];
    for (let key in this.state.todos) {
      this.state.todos[key].map(item => {
        arr = arr.concat(item.tasks)
      });
    }
  };

  return (
    <Panel className="col-md-8 rightPanel">
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
              className={"clearSearch "+(state.searchInput ? 'active' : 'inactive')}
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
        <hr />
        <div>
          <img src="./assets/ufo.jpg" alt="Nothing to Search"/>
        </div>
      </Panel>
      <BannerForTodo className="panelBanner" close={state.activateThemeMenu}>
        <h4>{(() => {
          let activeTodo = getActiveTodoList(state.todos);
          return activeTodo.title;
        })()}</h4>
        {state.todos['myPersonalToDo'][0].active ?
          <div className="date-time">{(() => {
            let today = new Date();
            let dateStringForBanner = today.toLocaleString('en-us', {  weekday: 'long' }) + ', ' +
              today.toLocaleString('en-us', {  month: 'long' }) + ' ' +
              today.toLocaleString('en-us', {  day: 'numeric' });
            return dateStringForBanner;
          })()}</div> :
          null
        }
      </BannerForTodo>
      <ToDoListOfTask
        todos={state.todos}
        currentTask={state.currentTask}
      />
    </Panel>
  )
};

RightPanel.contextTypes = {
  store: PropTypes.object,
}

export default RightPanel;