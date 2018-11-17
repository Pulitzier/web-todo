import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BannerForTodo from './BannerForTodo.js';
import ListOfTasks from './ListOfTasks.js';
import BasicPanel from './BaseComponents/BasicPanel';
import TaskSettings from './TaskSettings';
import SearchPanel from './SearchPanel';
import GreetingsPanel from './GreetingsPanel';
import {
  getActiveTodoList,
  getActiveTask,
} from '../helpers';

export default class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.activateGreetingPanel = this.activateGreetingPanel.bind(this);
    this.filterSuggestedTasks = this.filterSuggestedTasks.bind(this);
    this.state = {
      activateGreetingsPanel: false,
    };
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  activateGreetingPanel() {
    this.setState({ activateGreetingsPanel: !this.state.activateGreetingsPanel });
  }

  filterSuggestedTasks(tasks) {
    const arr = tasks.filter(task => (task.showOnGreeting && task.todoIsParent));
    if (arr.length !== 0) {
      return arr;
    }
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    const { app: { categories, tasks }, search: { activateSearch } } = state;
    const activeTodo = getActiveTodoList(categories);
    const { deleteTask, deleteTodo, deleteStep } = this.props;
    const { activateGreetingsPanel } = this.state;
    const activeTask = getActiveTask(tasks);
    const suggestedTasks = this.filterSuggestedTasks(tasks);

    return (
      <BasicPanel className="col-md-8 rightPanel">
        <BasicPanel>
          {
            activateSearch && <SearchPanel />
          }
          {
            activateGreetingsPanel
            && (
            <GreetingsPanel
              greetingTasks={suggestedTasks}
              handleDeleteTask={deleteTask}
              activateGreetings={this.activateGreetingPanel}
            />
            )
          }
          <BannerForTodo
            activeTask={activeTask}
            deleteList={deleteTodo}
            activateGreetings={this.activateGreetingPanel}
            greetingTasks={suggestedTasks}
          />
          <ListOfTasks
            activeTodo={activeTodo}
            activeTask={activeTask}
            greetingTasks={suggestedTasks}
          />
        </BasicPanel>
        {
          activeTask
          && (
          <TaskSettings
            handleDeleteTask={deleteTask}
            handleDeleteStep={deleteStep}
            activeTask={activeTask}
          />
          )
        }
      </BasicPanel>
    );
  }
}

RightPanel.contextTypes = {
  store: PropTypes.object,
};
