import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BannerForTodo from './BannerForTodo.js';
import ListOfTasks from './ListOfTasks.js';
import BasicPanel from './BasicPanel';
import TaskSettings from './TaskSettings';
import SearchPanel from './SearchPanel';
import GreetingsPanel from "./GreetingsPanel";
import {
  getActiveTodoList,
  getActiveTask
} from "../helpers";

export default class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.activateGreetingPanel = this.activateGreetingPanel.bind(this);
    this.getLatestTasks = this.getLatestTasks.bind(this);
    this.rightPanelState = {
      activateGreetingsPanel: false,
    }
  };

  componentDidMount() {
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  };

  activateGreetingPanel() {
    this.setState(() => {
      return this.rightPanelState = {
        ...this.rightPanelState,
        activateGreetingsPanel: !this.rightPanelState.activateGreetingsPanel
      }
    })
  };

  getLatestTasks(tasks) {
    return tasks.filter(task => task.showOnGreeting);
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos, tasks }, search: { activateSearch } } = state;
    const activeTodo = getActiveTodoList(todos);
    const { deleteTask, deleteTodo, deleteStep } = this.props;
    let { activateGreetingsPanel } = this.rightPanelState;
    const activeTask = getActiveTask(tasks);

    return (
      <BasicPanel className="col-md-8 rightPanel">
        <BasicPanel>
          {
            activateSearch && <SearchPanel />
          }
          {
            activateGreetingsPanel &&
            <GreetingsPanel
              handleDeleteTask={deleteTask}
              activateGreetings={this.activateGreetingPanel}
            />
          }
          <BannerForTodo
            activeTask={activeTask}
            deleteList={deleteTodo}
            activateGreetings={this.activateGreetingPanel}
            greetingTasks={this.getLatestTasks(tasks)}
          />
          <ListOfTasks
            activeTodo={activeTodo}
            activeTask={activeTask}
            greetingTasks={this.getLatestTasks(tasks)}
          />
        </BasicPanel>
        {
          activeTask &&
          <TaskSettings
            handleDeleteTask={deleteTask}
            handleDeleteStep={deleteStep}
            activeTask={activeTask}
          />
        }
      </BasicPanel>
    )
  }
};

RightPanel.contextTypes = {
  store: PropTypes.object,
};