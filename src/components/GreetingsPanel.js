import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  addTaskToMyDay,
  activateTaskSettings,
  clearSuggestedField, toggleTask
} from '../actionCreators';
import BasicPanel from "./BasicPanel";
import BasicButton from "./BasicButton";
import {playSoundWhenDone} from "../helpers";

export default class GreetingsPanel extends Component {
  constructor(props) {
    super(props);
    this.showSuggestedTasksMenu = this.showSuggestedTasksMenu.bind(this);
    this.addSuggestedTaskToMyDay = this.addSuggestedTaskToMyDay.bind(this);
    this.getDayPeriod = this.getDayPeriod.bind(this);
    this.setToggledTask = this.setToggledTask.bind(this);
    this.collapseYesterday = this.collapseYesterday.bind(this);
    this.getTaskForSuggest = this.getTaskForSuggest.bind(this);
    this.getYesterdayTasks = this.getYesterdayTasks.bind(this);
    this.collapseSuggestion = this.collapseSuggestion.bind(this);
    this.expandTaskSettings = this.expandTaskSettings.bind(this);
      this.greetingState = {
      collapsedSuggestions: true,
      collapsedYesterday: true,
      showTaskOptions: false,
    }
  };

  getDayPeriod() {
    let today = new Date();
    return today.getHours() < 11 ?
      "Good Morning" :
      today.getHours() < 18 ?
        "Hi" :
        today.getHours() < 23 ?
          "Good Evening" :
          "Hello"
  };

  showSuggestedTasksMenu() {
    console.log(key);
    this.setState(() => {
      return this.greetingState = {
        ...this.greetingState,
        showTaskOptions: !this.greetingState.showTaskOptions
      }
    })
  }

  getTaskForSuggest(tasks) {
    return tasks.filter(task => task.suggestForMyDay === true)
  };

  getYesterdayTasks(tasks) {
    let suggest = [];
    let today = new Date();
    tasks.map(task => {
      if((today.getDate() - (new Date(task.createdAt)).getDate()) >= 1){
        suggest.push(task);
      }
    });
    return suggest;
  }

  collapseSuggestion() {
    this.setState(() => {
      return this.greetingState = {
        ...this.greetingState,
        collapsedSuggestions: !this.greetingState.collapsedSuggestions
      }
    })
  }

  collapseYesterday() {
    this.setState(() => {
      return this.greetingState = {
        ...this.greetingState,
        collapsedYesterday: !this.greetingState.collapsedYesterday
      }
    })
  };

  addSuggestedTaskToMyDay(taskId) {
    const { store } = this.context;
    store.dispatch(clearSuggestedField(taskId));
    store.dispatch(addTaskToMyDay(taskId, true));
  };

  expandTaskSettings(taskId) {
    const { store } = this.context;
    store.dispatch(activateTaskSettings(taskId, true))
  };

  setToggledTask(taskId, done) {
    let { store } = this.context;
    const { userSettings: { turnOnSound } } = store.getState();
    turnOnSound && playSoundWhenDone(done, turnOnSound);
    store.dispatch(toggleTask(taskId))
  };

  render(){
    const { store } = this.context;
    const { app: { todos, tasks }} = store.getState();
    const { activateGreetings, handleDeleteTask } = this.props;
    let { collapsedSuggestions, collapsedYesterday, showTaskOptions } = this.greetingState;
    const suggestedTasks = this.getTaskForSuggest(tasks);
    const yesterdayTasks = this.getYesterdayTasks(tasks);
    let yesterdayWidth = (() => {
      if(yesterdayTasks.length !== 0) {
        return (100*yesterdayTasks.map(task => task.done === true).length) /
          (yesterdayTasks.map(task => task.done === true).length);
      }
      return 0;
    })();

    const getTaskParent = (task) => {
      return todos.find(todo => todo.todoListId === task.parentId) || '';
    };

    this.getYesterdayTasks(tasks);

    const getUniqueParentsTasks = (tasks) => {
      let parents = [];
      tasks.map(task => {
        if(parents.indexOf(task.parentId) === -1) {
          parents.push(task.parentId)
        }
      });
      return parents.map(parent => {
        return todos.find(todo => todo.todoListId === parent)
      })
    };

    return (
      <BasicPanel className="greetings-panel">
        <h3>{this.getDayPeriod()}, Yuryi Baravy</h3>
        <section className="greeting-header-section">
          {
            (suggestedTasks.length !== 0) ?
              <p>Nice job! Here are some suggestions around what to focus on today</p> :
              <p>To-dos you may not have had a chance to finish show up here</p>
          }
          <BasicButton
            buttonClassName="done-greetings"
            buttonOnClickAction={() => activateGreetings()}
            buttonText="Done"
          />
        </section>
        <section className="greeting-suggestion-yesterday">
          {
            (yesterdayTasks.length !== 0) &&
            <header onClick={() => this.collapseYesterday()}>
              <div>
                <h5>Yesterday</h5>
                {
                  <p>{yesterdayTasks.map(task => task.done === true).length} of {yesterdayTasks.length}</p>
                }
                <div className="done-tasks-indicator" style={{width: yesterdayWidth}}></div>
              </div>
              <BasicButton
                buttonClassName={"collapse-suggestions "+(collapsedYesterday ? "down" : "up")}
                iconClassName="fas fa-angle-right"
              />
            </header>
          }
          {
            collapsedYesterday &&
            yesterdayTasks.map((task, i) => {
              let taskParent = getTaskParent(task);
              return (
                <section key={i} className="suggested-tasks">
                  <button
                    onClick={() => this.addSuggestedTaskToMyDay(task.id)}
                  >+</button>
                  <div>
                    <p>{task.taskText}</p>
                    <p><i className={taskParent.iconSource}/>{taskParent.title}</p>
                  </div>
                  <button
                    className="suggested-tasks-settings"
                    onClick={() => this.expandTaskSettings(task.id)}
                  ><span>&bull;&bull;&bull;</span></button>
                </section>
              )
            })
          }
        </section>
        <section className="greeting-suggestion-section">
          {
            (suggestedTasks.length !== 0) &&
            <header onClick={() => this.collapseSuggestion()}>
              <div>
                <h5>Suggested for you</h5>
                {
                  getUniqueParentsTasks(suggestedTasks).map((parent, i) => {
                    return (
                      <p key={i} className="suggested-task-parent">
                        <i className={(parent.iconSource !== 'fa-list') ? parent.iconSource : ''} />
                        {parent.title}
                      </p>
                    )
                  })
                }
              </div>
              <BasicButton
                buttonClassName={"collapse-suggestions "+(collapsedSuggestions ? "down" : "up")}
                iconClassName={"fas "+ (collapsedSuggestions ? "fa-angle-down" : "fa-angle-up")}
              />
            </header>
          }
          {
            collapsedSuggestions &&
            suggestedTasks.map((task, i) => {
              let taskParent = getTaskParent(task);
              return (
                <section key={i} className="suggested-tasks">
                  <button
                    onClick={() => this.addSuggestedTaskToMyDay(task.id)}
                  >+</button>
                  <div>
                    <p>{task.taskText}</p>
                    <p>
                      <i className={(taskParent.iconSource !== 'fa-list') ? taskParent.iconSource : ''} />
                      {taskParent.title}
                    </p>
                  </div>
                  {
                    showTaskOptions &&
                    <div className="suggested-tasks-settings">
                      <div onClick={() => this.setToggledTask(task.id, task.done)}>
                        <i className="far fa-check-circle"></i>
                        <p>Mark as completed</p>
                      </div>
                      <div onClick={() => handleDeleteTask(task)}>
                        <i className="far fa-trash-alt"></i>
                        <p>Delete task</p>
                      </div>
                    </div>
                  }
                  <BasicButton
                    buttonClassName="tasks-settings-btn"
                    buttonOnClickAction={() => this.showSuggestedTasksMenu(task.id)}
                    iconClassName="fas fa-ellipsis-h"
                  />
                </section>
              )
            })
          }
        </section>
      </BasicPanel>
    )
  }
};

GreetingsPanel.contextTypes = {
  store: PropTypes.object
};