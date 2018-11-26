import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import MainBanner from '../MainBanner/index';
import ListOfTasks from '../ListOfTasks/index';
import BasicPanel from '../BaseComponents/BasicPanel';
import TaskSettings from '../TaskSettings/index';
import SearchPanel from '../SearchPanel/index';
import GreetingsPanel from '../GreetingPanel/index';
import {
  getActiveTodoList,
  getActiveTask,
} from '../../helpers';

export default class RightPanel extends Component {
  static filterSuggestedTasks(tasks) {
    const arr = tasks.filter(task => (task.showOnGreeting && task.todoIsParent));
    if (arr.length !== 0) {
      return arr;
    }
  }

  constructor(props) {
    super(props);
    this.activateGreetingPanel = this.activateGreetingPanel.bind(this);
    this.state = {
      activateGreetingsPanel: false,
    };
  }

  activateGreetingPanel() {
    const { activateGreetingsPanel: oldActive } = this.state;
    this.setState({ activateGreetingsPanel: !oldActive });
  }

  render() {
    const {
      categories,
      tasks,
      activateSearchFlag,
      deleteTask,
      deleteTodo,
      deleteStep,
    } = this.props;
    const activeTodo = getActiveTodoList(categories);
    const { activateGreetingsPanel } = this.state;
    const activeTask = getActiveTask(tasks);
    const suggestedTasks = RightPanel.filterSuggestedTasks(tasks);

    return (
      <BasicPanel className="col-md-8 rightPanel">
        <BasicPanel>
          {
            activateSearchFlag && <SearchPanel tasks={tasks} />
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
          <MainBanner
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
          && activeTask.active
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

RightPanel.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  tasks: PropTypes.arrayOf(PropTypes.shape({})),
  activateSearchFlag: PropTypes.bool,
  deleteTask: PropTypes.func,
  deleteTodo: PropTypes.func,
  deleteStep: PropTypes.func,
};

RightPanel.defaultProps = {
  categories: [],
  tasks: [],
  activateSearchFlag: false,
  deleteTask: () => {},
  deleteTodo: () => {},
  deleteStep: () => {},
};
