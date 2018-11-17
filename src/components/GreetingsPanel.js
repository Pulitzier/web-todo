import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  addTaskToMyDay,
  activateTaskSettings,
  clearSuggestedField,
  toggleTask,
  deleteTask,
} from '../store/actions/index';
import { playSoundWhenDone } from '../helpers';
import BasicPanel from './BaseComponents/BasicPanel';
import BasicButton from './BaseComponents/BasicButton';
import SuggestedTask from './SuggestedTask';

export default class GreetingsPanel extends Component {
  constructor(props) {
    super(props);
    this.addSuggestedTaskToMyDay = this.addSuggestedTaskToMyDay.bind(this);
    this.getDayPeriod = this.getDayPeriod.bind(this);
    this.setToggledTask = this.setToggledTask.bind(this);
    this.collapseYesterday = this.collapseYesterday.bind(this);
    this.getTaskForSuggest = this.getTaskForSuggest.bind(this);
    this.getYesterdayTasks = this.getYesterdayTasks.bind(this);
    this.collapseSuggestion = this.collapseSuggestion.bind(this);
    this.expandTaskSettings = this.expandTaskSettings.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.state = {
      collapsedSuggestions: true,
      collapsedYesterday: true,
      showTaskOptions: false,
    };
  }

  getDayPeriod() {
    const today = new Date();
    return today.getHours() < 11
      ? 'Good Morning'
      : today.getHours() < 18
        ? 'Hi'
        : today.getHours() < 23
          ? 'Good Evening'
          : 'Hello';
  }

  getTaskForSuggest(tasks) {
    return tasks.filter(task => task.suggestForMyDay === true);
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

  addSuggestedTaskToMyDay(taskId) {
    const { store } = this.context;
    store.dispatch(clearSuggestedField(taskId));
    store.dispatch(addTaskToMyDay(taskId, true));
  }

  expandTaskSettings(taskId) {
    const { store } = this.context;
    store.dispatch(activateTaskSettings(taskId, true));
  }

  setToggledTask(taskId, done) {
    const { store } = this.context;
    const { userSettings: { turnOnSound } } = store.getState();
    turnOnSound && playSoundWhenDone(done, turnOnSound);
    store.dispatch(toggleTask(taskId));
  }

  handleDeleteTask(taskId) {
    const { store } = this.context;
    store.dispatch(deleteTask(taskId));
  }

  render() {
    const { store } = this.context;
    const { app: { categories, tasks } } = store.getState();
    const { activateGreetings } = this.props;
    const { collapsedSuggestions, collapsedYesterday } = this.state;
    const suggestedTasks = this.getTaskForSuggest(tasks);
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
          {this.getDayPeriod()}
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
                addTaskToMyDay={this.addSuggestedTaskToMyDay}
                handleDeleteTask={this.handleDeleteTask}
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
                addTaskToMyDay={this.addSuggestedTaskToMyDay}
                handleDeleteTask={this.handleDeleteTask}
                setToggledTask={this.setToggledTask}
              />
            ))
          }
        </section>
      </BasicPanel>
    );
  }
}

GreetingsPanel.contextTypes = {
  store: PropTypes.object,
};
