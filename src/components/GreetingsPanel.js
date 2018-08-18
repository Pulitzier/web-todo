import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

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

  getFirstTaskFromCustomTodo(tasks) {
    return tasks.find(task => task.parentId === 3)
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
    const suggestedTask = this.getFirstTaskFromCustomTodo(tasks) || {};
    const suggestedTaskParent = todos["toDoCategories"].find(todo => todo.todoListId === suggestedTask.parentId) || '';

    return (
      <div className="greetings-panel">
        <h3>{this.getDayPeriod()}, Yuryi Baravy</h3>
        <section className="greeting-header-section">
          {
            suggestedTaskParent ?
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
            suggestedTaskParent &&
            <header onClick={() => this.collapseSuggestion()}>
              <div>
                <h5>Suggested for you</h5>
                <p>
                  {
                    suggestedTaskParent.iconSource && <img src={suggestedTaskParent.iconSource} />
                  }
                  {suggestedTaskParent.title}</p>
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
            suggestedTaskParent &&
            collapsedSuggestions &&
            <section>
              <button>+</button>
              <p>{suggestedTask.taskText}</p>
              <p><img src={suggestedTaskParent.iconSource} />{suggestedTaskParent.title}</p>
              <button><span>&bull;&bull;&bull;</span></button>
            </section>
          }
        </section>
      </div>
    )
  }
};

GreetingsPanel.contextTypes = {
  store: PropTypes.object
};