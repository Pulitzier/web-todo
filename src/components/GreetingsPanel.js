import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  addTaskToMyDay,
  activateTaskSettings,
  clearSuggestedField
} from '../actionCreators';

export default class GreetingsPanel extends Component {
  constructor(props) {
    super(props);
    this.greetingState = {
      collapsedSuggestions: true,
    }
  };

  getDayPeriod() {
    let today = new Date();
    return today.getHours() < 11 ?
      "Good Morning" :
      today.getHours() < 18 ?
        "Good Afternoon" :
        today.getHours() < 23 ?
          "Good Evening" :
          "Hello"
  };

  getTaskForSuggest(tasks) {
    return tasks.filter(task => task.suggestForMyDay === true)
  };

  collapseSuggestion() {
    this.setState(() => {
      return this.greetingState = {
        collapsedSuggestions: !this.greetingState.collapsedSuggestions
      }
    })
  }

  render(){
    const { store } = this.context;
    const { app: { todos, tasks }} = store.getState();
    const { activateGreetings } = this.props;
    let { collapsedSuggestions } = this.greetingState;
    const suggestedTasks = this.getTaskForSuggest(tasks);

    const getTaskParent = (task) => {
      return todos["toDoCategories"].find(todo => todo.todoListId === task.parentId) || '';
    };

    const getUniqueParentsTasks = (tasks) => {
      let parents = [];
      tasks.map(task => {
        if(parents.indexOf(task.parentId) === -1) {
          parents.push(task.parentId)
        }
      });
      return parents.map(parent => {
        return todos["toDoCategories"].find(todo => todo.todoListId === parent)
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
      <div className="greetings-panel">
        <h3>{this.getDayPeriod()}, Yuryi Baravy</h3>
        <section className="greeting-header-section">
          {
            (suggestedTasks.length !== 0) ?
              <p>Nice job! Here are some suggestions around what to focus on today</p> :
              <p>To-dos you may not have had a chance to finish show up here</p>
          }
          <button
            className="done-greetings"
            onClick={() => activateGreetings()}
          >Done</button>
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
                        {parent.iconSource && <img src={parent.iconSource} />}
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
                <img src="./assets/right.svg"/>
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
                    <p><img src={taskParent.iconSource} />{taskParent.title}</p>
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
      </div>
    )
  }
};

GreetingsPanel.contextTypes = {
  store: PropTypes.object
};