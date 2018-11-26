import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { playSoundWhenDone } from '../../../helpers';
import BasicPanel from '../../BaseComponents/BasicPanel';
import BasicButton from '../../BaseComponents/BasicButton';
import SuggestedTask from '../SuggestedTask/index';

export default class GreetingsPanel extends Component {
  static getDayPeriod() {
    const today = new Date();
    return today.getHours() < 11
      ? 'Good Morning'
      : today.getHours() < 18
        ? 'Hi'
        : today.getHours() < 23
          ? 'Good Evening'
          : 'Hello';
  }

  static getTaskForSuggest(tasks) {
    return tasks.filter(task => task.suggestForMyDay === true);
  }

  constructor(props) {
    super(props);
    this.setToggledTask = this.setToggledTask.bind(this);
    this.collapseYesterday = this.collapseYesterday.bind(this);
    this.getYesterdayTasks = this.getYesterdayTasks.bind(this);
    this.collapseSuggestion = this.collapseSuggestion.bind(this);
    this.state = {
      collapsedSuggestions: true,
      collapsedYesterday: true,
      showTaskOptions: false,
    };
  }

  getYesterdayTasks(tasks) {
    const suggest = [];
    const today = new Date();
    tasks.map((task) => {
      if ((today.getDate() - (new Date(task.createdAt)).getDate()) >= 1) {
        suggest.push(task);
      }
    });
    return suggest;
  }

  collapseSuggestion() {
    this.setState({ collapsedSuggestions: !this.state.collapsedSuggestions });
  }

  collapseYesterday() {
    this.setState({ collapsedYesterday: !this.state.collapsedYesterday });
  }

  setToggledTask(taskId, done) {
    const { playSound, handleToggleTask } = this.props;
    if (playSound && done) playSoundWhenDone();
    handleToggleTask(taskId);
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
    const yesterdayTasks = this.getYesterdayTasks(tasks);
    const yesterdayWidth = (() => {
      if (yesterdayTasks.length !== 0) {
        return (100 * yesterdayTasks.map(task => task.done === true).length)
          / (yesterdayTasks.map(task => task.done === true).length);
      }
      return 0;
    })();

    const getTaskParent = task => categories.find(todo => todo.todoListId === task.parentId) || '';

    this.getYesterdayTasks(tasks);

    const getUniqueParentsTasks = (tasks) => {
      const parents = [];
      tasks.map((task) => {
        if (parents.indexOf(task.parentId) === -1) {
          parents.push(task.parentId);
        }
      });
      return parents.map(parent => categories.find(todo => todo.todoListId === parent));
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
            <header onClick={() => this.collapseYesterday()}>
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
            && yesterdayTasks.map((task, i) => (
              <SuggestedTask
                key={i}
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
            <header onClick={() => this.collapseSuggestion()}>
              <div>
                <h5>Suggested for you</h5>
                {
                  getUniqueParentsTasks(suggestedTasks).map((parent, i) => (
                    <p key={i} className="suggested-task-parent">
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
            && suggestedTasks.map((task, i) => (
              <SuggestedTask
                key={i}
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
  tasks: PropTypes.array,
  categories: PropTypes.array,
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
