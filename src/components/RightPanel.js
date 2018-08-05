import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getActiveTodoList } from "../helpers";
import BannerForTodo from './BannerForTodo.js';
import ToDoListOfTask from './ToDoListOfTask.js';
import Panel from './Panel';
import TaskSettings from './TaskSettings';
import SearchPanel from './SearchPanel';

export default class RightPanel extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    let { store } = this.context;
    store.subscribe(() => {
      this.forceUpdate();
    })
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const todos = state.app.todos;
    const activeTodo = getActiveTodoList(todos);
    const { deleteTask, deleteTodo } = this.props;

    return (
      <Panel className="col-md-8 rightPanel">
        <div>
          <SearchPanel />
          <BannerForTodo
            className="panelBanner"
            close={state.activateThemeMenu}
            activeTodo={activeTodo}
            deleteList={deleteTodo}
          >
            <h4>{(() => {
              return activeTodo.title;
            })()}</h4>
            {todos['myPersonalToDo'][0].active ?
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
          <ToDoListOfTask activeTodo={activeTodo}/>
        </div>
        <TaskSettings handleDeleteTask={deleteTask}/>
      </Panel>
    )
  }
};

RightPanel.contextTypes = {
  store: PropTypes.object,
};