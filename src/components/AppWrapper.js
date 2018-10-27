import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import '../index.css';
import {
  deleteTask,
  deleteTodoList,
  deleteStep
} from "../actionCreators";
import CollapsedApp from "./CollapsedApp";
import ExpandedApp from './ExpandedApp';

export default class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.clearLocalAppState = this.clearLocalAppState.bind(this);
    this.handleCollapseApp = this.handleCollapseApp.bind(this);
    this.handelDeleteTask = this.handelDeleteTask.bind(this);
    this.handelDeleteTodo = this.handelDeleteTodo.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.handleDeleteStep = this.handleDeleteStep.bind(this);
    this.renderCollapsedApp = this.renderCollapsedApp.bind(this);
    this.renderExpandedApp = this.renderExpandedApp.bind(this);
    this.localAppState = {
      collapseApp: true,
      taskToDelete: '',
      todoToDelete: '',
      taskStepToDelete: ''
    }
  }

  componentDidMount() {
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  handelDeleteTodo(element) {
    let { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState(() => {
        return this.localAppState = {
          ...this.localAppState,
          todoToDelete: element
        }
      });
    } else {
      store.dispatch(deleteTodoList(element.todoListId));
    }
  };

  handelDeleteTask(element) {
    let { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState(() => {
        return this.localAppState = {
          ...this.localAppState,
          taskToDelete: element,
        }
      });
    } else {
      store.dispatch(deleteTask(element.id));
    }
  };

  handleDeleteStep(element) {
    let { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState(() => {
        return this.localAppState = {
          ...this.localAppState,
          taskStepToDelete: element,
        }
      });
    } else {
      store.dispatch(deleteStep(element.stepId));
    }
  };

  clearLocalAppState() {
    this.setState(() => {
      return this.localAppState = {
        ...this.localAppState,
        taskToDelete: '',
        todoToDelete: '',
        taskStepToDelete: ''
      }
    })
  };

  handleConfirm(element) {
    let { store } = this.context;
    const { taskToDelete, todoToDelete, taskStepToDelete } = this.localAppState;
    if(taskToDelete) {
      store.dispatch(deleteTask(element.id));
      this.clearLocalAppState();
    } else if (todoToDelete) {
      store.dispatch(deleteTodoList(element.todoListId));
      this.clearLocalAppState();
    } else if (taskStepToDelete) {
      store.dispatch(deleteStep(element.stepId));
      this.clearLocalAppState();
    }
  };

  handleDecline() {
    return this.clearLocalAppState()
  };

  handleCollapseApp(bool) {
    this.setState(() => {
      return this.localAppState = {
        ...this.localAppState,
        collapseApp: bool
      }
    })
  }

  renderCollapsedApp() {
    let { collapseApp } = this.localAppState;
    return (
      <CollapsedApp
        collapseApp={collapseApp}
        handleCollapse={(bool) => this.handleCollapseApp(bool)}
      />
    )
  };

  renderExpandedApp() {
    const { store } = this.context;
    const { userSettings: { confirmDeletion, turnOnSound, setDarkTheme, setLightTheme } } = store.getState();
    const { taskToDelete, todoToDelete, taskStepToDelete, collapseApp } = this.localAppState;

    return (
      <ExpandedApp
        handleCollapse={(bool) => this.handleCollapseApp(bool)}
        handleDeleteStep={(element) => this.handleDeleteStep(element)}
        handelDeleteTodo={(element) => this.handelDeleteTodo(element)}
        handelDeleteTask={(element) => this.handelDeleteTask(element)}
        handleConfirm={(element) => this.handleConfirm(element)}
        handleDecline={() => this.handleDecline()}
        customOptons={{
          collapseApp,
          confirmDeletion,
          turnOnSound,
          setDarkTheme,
          setLightTheme,
          taskToDelete,
          todoToDelete,
          taskStepToDelete
        }}
      />
    )
  };

  render() {
    let { collapseApp } = this.localAppState;
    return (
      <div className="container">
        { collapseApp ? this.renderCollapsedApp() : this.renderExpandedApp() }
      </div>
    );
  }
};

AppWrapper.contextTypes = {
  store: PropTypes.object,
};