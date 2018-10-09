import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BannerForTodo from './BannerForTodo.js';
import ListOfTasks from './ListOfTasks.js';
import Panel from './Panel';
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
    this.rightPanelState = {
      activateGreetingsPanel: false,
    }
  };

  activateGreetingPanel() {
    this.setState(() => {
      return this.rightPanelState = {
        ...this.rightPanelState,
        activateGreetingsPanel: !this.rightPanelState.activateGreetingsPanel
      }
    })
  };

  componentDidMount() {
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos, tasks }, search: { activateSearch } } = state;
    const activeTodo = getActiveTodoList(todos);
    const { deleteTask, deleteTodo, deleteStep } = this.props;
    let { activateGreetingsPanel } = this.rightPanelState;
    const activeTask = getActiveTask(tasks);

    return (
      <Panel className="col-md-8 rightPanel">
        <Panel>
          {
            activateSearch && <SearchPanel />
          }
          {
            activateGreetingsPanel &&
            <GreetingsPanel
              activateGreetings={this.activateGreetingPanel}
            />
          }
          <BannerForTodo
            activeTask={activeTask}
            deleteList={deleteTodo}
            activateGreetings={this.activateGreetingPanel}
          />
          <ListOfTasks activeTodo={activeTodo}/>
        </Panel>
        {
          activeTask &&
          <TaskSettings
            handleDeleteTask={deleteTask}
            handleDeleteStep={deleteStep}
            activeTask={activeTask}
          />
        }
      </Panel>
    )
  }
};

RightPanel.contextTypes = {
  store: PropTypes.object,
};