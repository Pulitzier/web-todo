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
import BasicPanel from "./BasicPanel";

export default class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.clearLocalAppState = this.clearLocalAppState.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handelDeleteTask = this.handelDeleteTask.bind(this);
    this.handelDeleteTodo = this.handelDeleteTodo.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.handleDeleteStep = this.handleDeleteStep.bind(this);
    this.state = {
      collapseApp: true,
      taskToDelete: '',
      todoToDelete: '',
      taskStepToDelete: ''
    }
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  handelDeleteTodo(element) {
    const { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState(() => {
        return this.state = {
          ...this.state,
          todoToDelete: element
        }
      });
    } else {
      store.dispatch(deleteTodoList(element.todoListId));
    }
  };

  handelDeleteTask(element) {
    const { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState(() => {
        return this.state = {
          ...this.state,
          taskToDelete: element,
        }
      });
    } else {
      store.dispatch(deleteTask(element.id));
    }
  };

  handleDeleteStep(element) {
    const { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState(() => {
        return this.state = {
          ...this.state,
          taskStepToDelete: element,
        }
      });
    } else {
      store.dispatch(deleteStep(element.stepId));
    }
  };

  clearLocalAppState() {
    this.setState(() => {
      return this.state = {
        ...this.state,
        taskToDelete: '',
        todoToDelete: '',
        taskStepToDelete: ''
      }
    })
  };

  handleConfirm(element) {
    const { store } = this.context;
    const { taskToDelete, todoToDelete, taskStepToDelete } = this.state;
    console.log(this.state);
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

  handleCollapse(bool) {
    this.setState({
      ...this.state,
      collapseApp: bool
    })
  }

  render() {
    const { store } = this.context;
    const { userSettings: { confirmDeletion, turnOnSound, setDarkTheme, setLightTheme } } = store.getState();
    const { collapseApp, taskToDelete, todoToDelete, taskStepToDelete } = this.state;

    return (
      <BasicPanel className="container">
        <CollapsedApp
          collapseApp={collapseApp}
          handleCollapse={(bool) => this.handleCollapse(bool)}
        />
        <ExpandedApp
          handleCollapse={(bool) => this.handleCollapse(bool)}
          handleDeleteStep={(element) => this.handleDeleteStep(element)}
          handelDeleteTodo={(element) => this.handelDeleteTodo(element)}
          handelDeleteTask={(element) => this.handelDeleteTask(element)}
          handleConfirm={(element) => this.handleConfirm(element)}
          handleDecline={() => this.handleDecline()}
          customOptions={{
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
      </BasicPanel>
    );
  }
};

AppWrapper.contextTypes = {
  store: PropTypes.object,
};