import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  addTaskToMyDay,
  activateTaskSettings,
  clearSuggestedField
} from '../actionCreators';
import BasicPanel from "./BasicPanel";

export default class GreetingsPanel extends Component {
  constructor(props) {
    super(props);
    this.greetingState = {
      collapsedSuggestions: true,
      collapsedYesterday: true
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

  render(){
    const { store } = this.context;
    const { app: { todos, tasks }} = store.getState();
    const { activateGreetings } = this.props;
    let { collapsedSuggestions, collapsedYesterday } = this.greetingState;
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

    const addSuggestedTaskToMyDay = (taskId) => {
      store.dispatch(clearSuggestedField(taskId));
      store.dispatch(addTaskToMyDay(taskId, true));
    };

    const expandTaskSettings = (taskId) => {
      store.dispatch(activateTaskSettings(taskId, true))
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
          <button
            className="done-greetings"
            onClick={() => activateGreetings(false)}
          >Done</button>
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
              <button
                className={"collapse-suggestions " +
                (collapsedYesterday ? "down" : "up")}
              >
                <i className="fas fa-angle-right"></i>
              </button>
            </header>
          }
          {
            collapsedYesterday &&
            yesterdayTasks.map((task, i) => {
              let taskParent = getTaskParent(task);
              return (
                <section key={i} className="suggested-tasks">
                  <button
                    onClick={() => addSuggestedTaskToMyDay(task.id)}
                  >+</button>
                  <div>
                    <p>{task.taskText}</p>
                    <p><i className={taskParent.iconSource}/>{taskParent.title}</p>
                  </div>
                  <button
                    className="suggested-tasks-settings"
                    onClick={() => expandTaskSettings(task.id)}
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
                        {parent.iconSource && <i className={parent.iconSource} />}
                        {parent.title}
                      </p>
                    )
                  })
                }
              </div>
              <button
                className={"collapse-suggestions " +
                (collapsedSuggestions ? "down" : "up")}
              >
                <i className="fas fa-angle-right"></i>
              </button>
            </header>
          }
          {
            collapsedSuggestions &&
            suggestedTasks.map((task, i) => {
              let taskParent = getTaskParent(task);
              return (
                <section key={i} className="suggested-tasks">
                  <button
                    onClick={() => addSuggestedTaskToMyDay(task.id)}
                  >+</button>
                  <div>
                    <p>{task.taskText}</p>
                    <p><i className={taskParent.iconSource} />{taskParent.title}</p>
                  </div>
                  <button
                    className="suggested-tasks-settings"
                    onClick={() => expandTaskSettings(task.id)}
                  ><span>&bull;&bull;&bull;</span></button>
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