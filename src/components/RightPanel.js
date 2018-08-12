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
    const { app: { todos }, search: { activateSearch } } = state;
    const activeTodo = getActiveTodoList(todos);
    const { deleteTask, deleteTodo } = this.props;

    return (
      <Panel className="col-md-8 rightPanel">
        <div>
          {
            activateSearch && <SearchPanel />
          }
          <BannerForTodo
            className="panelBanner"
            close={state.activateThemeMenu}
            deleteList={deleteTodo}
          />
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