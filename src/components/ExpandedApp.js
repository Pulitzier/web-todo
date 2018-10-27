import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import StatusBarPanel from "./StatusBarPanel";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import UserSettingsPanel from "./UserSettingsPanel";
import AudioForCompletion from "./AudioForCompletion";
import DeleteModal from "./DeleteModal";
import BasicPanel from "./BasicPanel";
import {deleteStep, deleteTask, deleteTodoList} from "../actionCreators";

const EXPANDED_APP_STYLES = {
  opacity: 1,
  top: 0,
  transition: 'all 0.5s ease'
};

const COLLAPSED_APP_STYLES = {
  opacity: 0,
  width: 250,
  height: 30,
  margin: 0,
  top: 2000,
  transition: 'all 0.5s ease'
}

export default class ExpandedApp extends Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.clearLocalAppState = this.clearLocalAppState.bind(this);
    this.handleDeleteStep = this.handleDeleteStep.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.localState = {
      taskToDelete: '',
      todoToDelete: '',
      taskStepToDelete: ''
    }
  };

  componentDidMount() {
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  clearLocalAppState() {
    this.setState(() => {
      return this.localState = {
        taskToDelete: '',
        todoToDelete: '',
        taskStepToDelete: ''
      }
    })
  };

  handleDeleteTask(element) {
    const { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState(() => {
        return this.localState = {
          ...this.localState,
          taskToDelete: element,
        }
      });
    } else {
      store.dispatch(deleteTask(element.id));
    }
  };

  handleDeleteTodo(element) {
    const { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState(() => {
        return this.localState = {
          ...this.localState,
          todoToDelete: element
        }
      });
    } else {
      store.dispatch(deleteTodoList(element.todoListId));
    }
  };

  handleDeleteStep(element) {
    const { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState(() => {
        return this.localState = {
          ...this.localState,
          taskStepToDelete: element,
        }
      });
    } else {
      store.dispatch(deleteStep(element.stepId));
    }
  };

  handleConfirm(element) {
    const { store } = this.context;
    const { taskToDelete, todoToDelete, taskStepToDelete } = this.localState;
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

  render() {
    const { store } = this.context;
    const { userSettings: { confirmDeletion, turnOnSound, setDarkTheme, setLightTheme } } = store.getState();
    let { taskToDelete, todoToDelete, taskStepToDelete } = this.localState;
    let { handleCollapse, collapseApp } = this.props;

    const setOpacity = (expandApp) => {
      return expandApp ? EXPANDED_APP_STYLES : COLLAPSED_APP_STYLES;
    };

    return (
      <BasicPanel
        className={"expanded-app " + ( setLightTheme ? 'light' : setDarkTheme && 'dark' )}
        style={setOpacity(!collapseApp)}
      >
        <StatusBarPanel
          collapseApp={collapseApp}
          handleCollapseApp={(bool) => handleCollapse(bool)}
        />
        <LeftPanel />
        <RightPanel
          deleteTask={this.handleDeleteTask}
          deleteTodo={this.handleDeleteTodo}
          deleteStep={this.handleDeleteStep}
        />
        <UserSettingsPanel />
        {
          turnOnSound && <AudioForCompletion />
        }
        {
          (confirmDeletion && taskToDelete) &&
          <DeleteModal
            nameOfItem="task"
            messageOfItem={taskToDelete.taskText}
            onDelete={() => this.handleConfirm(taskToDelete)}
            onCancel={this.handleDecline}
          />
        }
        {
          (confirmDeletion && todoToDelete) &&
          <DeleteModal
            nameOfItem="todo"
            messageOfItem={todoToDelete.title}
            onDelete={() => this.handleConfirm(todoToDelete)}
            onCancel={this.handleDecline}
          />
        }
        {
          (confirmDeletion && taskStepToDelete) &&
          <DeleteModal
            nameOfItem="step"
            messageOfItem={taskStepToDelete.stepText}
            onDelete={() => this.handleConfirm(taskStepToDelete)}
            onCancel={this.handleDecline}
          />
        }
      </BasicPanel>
    )
  }
};

ExpandedApp.contextTypes = {
  store: PropTypes.object
};