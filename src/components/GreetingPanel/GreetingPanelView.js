import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicPanel from '../BaseComponents/BasicPanel';
import BasicButton from '../BaseComponents/BasicButton';
import SuggestedTask from './SuggestedTaskWrapper';

export default class GreetingsPanel extends Component {
  static getDayPeriod() {
    const today = new Date();
    if (today.getHours() < 11) {
      return 'Good Morning';
    }
    if (today.getHours() < 18) {
      return 'Hi';
    }
    if (today.getHours() < 23) {
      return 'Good Evening';
    }
    return 'Hello';
  }

  static getTaskForSuggest(tasks) {
    return tasks.filter(task => task.suggestForMyDay === true);
  }

  static getYesterdayTasks(tasks) {
    const suggest = [];
    const today = new Date();
    tasks.map((task) => {
      if ((today.getDate() - (new Date(task.createdAt)).getDate()) >= 1) {
        suggest.push(task);
      }
    });
    return suggest;
  }

  constructor(props) {
    super(props);
    this.setToggledTask = this.setToggledTask.bind(this);
    this.collapseYesterday = this.collapseYesterday.bind(this);
    this.collapseSuggestion = this.collapseSuggestion.bind(this);
    this.state = {
      collapsedSuggestions: true,
      collapsedYesterday: true,
    };
  }

  collapseSuggestion() {
    const { collapsedSuggestions: oldSuggestions } = this.state;
    this.setState({ collapsedSuggestions: !oldSuggestions });
  }

  setToggledTask () {
    alert("toggle");
  }

  collapseYesterday() {
    const { collapsedYesterday: oldCollapsed } = this.state;
    this.setState({ collapsedYesterday: !oldCollapsed });
  }

  render() {
    const {
      tasks,
      categories,
      activateGreetings,
      handleDeleteTask,
      handleAddTaskToMyDay,
    } = this.props;
    const { collapsedSuggestions, collapsedYesterday } = this.state;
    const suggestedTasks = GreetingsPanel.getTaskForSuggest(tasks);
    const yesterdayTasks = GreetingsPanel.getYesterdayTasks(tasks);
    const yesterdayWidth = (() => {
      if (yesterdayTasks.length !== 0) {
        return (100 * yesterdayTasks.map(task => task.done === true).length)
          / (yesterdayTasks.map(task => task.done === true).length);
      }
      return 0;
    })();

    const getTaskParent = task => categories.find(todo => todo.id === task.parentId) || '';

    GreetingsPanel.getYesterdayTasks(tasks);

    const getUniqueParentsTasks = (uniqueTasks) => {
      const parents = [];
      uniqueTasks.map((task) => {
        if (parents.indexOf(task.parentId) === -1) {
          parents.push(task.parentId);
        }
      });
      return parents.map(parent => categories.find(todo => todo.id === parent));
    };

    return (
      <BasicPanel className="greetings-panel">
        <h3>
          {GreetingsPanel.getDayPeriod()}
, Yuryi Baravy
        </h3>
        <section className="greeting-header-section">
          {
            (suggestedTasks.length !== 0)
              ? <p>Nice job! Here are some suggestions around what to focus on today</p>
              : <p>To-dos you may not have had a chance to finish show up here</p>
          }
          <BasicButton
            buttonClassName="done-greetings"
            buttonOnClickAction={() => activateGreetings()}
            buttonText="Done"
          />
        </section>
        <section className="greeting-suggestion-yesterday">
          {
            (yesterdayTasks.length !== 0)
            && (
            <header
              role="presentation"
              onClick={() => this.collapseYesterday()}
            >
              <div>
                <h5>Yesterday</h5>
                {
                  <p>
                    {yesterdayTasks.map(task => task.done === true).length}
                    {' '}
of
                    {' '}
                    {yesterdayTasks.length}
                  </p>
                }
                <div className="done-tasks-indicator" style={{ width: yesterdayWidth }} />
              </div>
              <BasicButton
                buttonClassName={`collapse-suggestions ${collapsedYesterday ? 'down' : 'up'}`}
                iconClassName="fas fa-angle-right"
              />
            </header>
            )
          }
          {
            collapsedYesterday
            && yesterdayTasks.map(task => (
              <SuggestedTask
                key={task.id}
                task={task}
                taskParent={getTaskParent(task)}
                addTaskToMyDay={handleAddTaskToMyDay}
                handleDeleteTask={handleDeleteTask}
                setToggledTask={this.setToggledTask}
              />
            ))
          }
        </section>
        <section className="greeting-suggestion-section">
          {
            (suggestedTasks.length !== 0)
            && (
            <header
              role="presentation"
              onClick={() => this.collapseSuggestion()}
            >
              <div>
                <h5>Suggested for you</h5>
                {
                  getUniqueParentsTasks(suggestedTasks).map(parent => (
                    <p key={parent.id} className="suggested-task-parent">
                      <i className={(parent.iconSource !== 'fa-list') ? parent.iconSource : ''} />
                      {parent.title}
                    </p>
                  ))
                }
              </div>
              <BasicButton
                buttonClassName={`collapse-suggestions ${collapsedSuggestions ? 'down' : 'up'}`}
                iconClassName={`fas ${collapsedSuggestions ? 'fa-angle-down' : 'fa-angle-up'}`}
              />
            </header>
            )
          }
          {
            collapsedSuggestions
            && suggestedTasks.map(task => (
              <SuggestedTask
                key={task.id}
                task={task}
                taskParent={getTaskParent(task)}
                addTaskToMyDay={handleAddTaskToMyDay}
                handleDeleteTask={handleDeleteTask}
                setToggledTask={this.setToggledTask}
              />
            ))
          }
        </section>
      </BasicPanel>
    );
  }
}

GreetingsPanel.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  activateGreetings: PropTypes.func,
  handleDeleteTask: PropTypes.func,
  handleAddTaskToMyDay: PropTypes.func,
};

GreetingsPanel.defaultProps = {
  tasks: {},
  categories: [],
  activateGreetings: () => {},
  handleDeleteTask: () => {},
  handleAddTaskToMyDay: () => {},
};
