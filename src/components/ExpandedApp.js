import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import StatusBarPanel from "./StatusBarPanel";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import UserSettingsPanel from "./UserSettingsPanel";
import AudioForCompletion from "./AudioForCompletion";
import DeleteModal from "./DeleteModal";
import BasicPanel from "./BasicPanel";
import { deleteStep, deleteTask, deleteTodoList } from "../actionCreators";
import { COLLAPSED_APP_STYLES, EXPANDED_APP_STYLES } from "../constants";

export default class ExpandedApp extends Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.clearLocalAppState = this.clearLocalAppState.bind(this);
    this.handleDeleteStep = this.handleDeleteStep.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.renderDeleteModal = this.renderDeleteModal.bind(this);
    this.state = {
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
    this.setState({
      taskToDelete: '',
      todoToDelete: '',
      taskStepToDelete: ''
    })
  };

  handleDeleteTask(element) {
    const { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState({ taskToDelete: element });
    } else {
      store.dispatch(deleteTask(element.id));
    }
  };

  handleDeleteTodo(element) {
    const { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState({ todoToDelete: element });
    } else {
      store.dispatch(deleteTodoList(element.todoListId));
    }
  };

  handleDeleteStep(element) {
    const { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    if (confirmDeletion) {
      this.setState({ taskStepToDelete: element });
    } else {
      store.dispatch(deleteStep(element.stepId));
    }
  };

  handleConfirm(element) {
    const { store } = this.context;
    const { taskToDelete, todoToDelete, taskStepToDelete } = this.state;
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

  renderDeleteModal(element) {
    let elementText = element.title || element.taskText || element.stepText || '';
    let elementType = element.title ? "todo" : element.taskText ? "task" : element.stepText ? "step" : '';
    if (element) return (
      <DeleteModal
        nameOfItem={elementType}
        messageOfItem={elementText}
        onDelete={() => this.handleConfirm(element)}
        onCancel={this.handleDecline}
      />
    )
  };

  render() {
    const { store } = this.context;
    const { userSettings: { confirmDeletion, turnOnSound, setDarkTheme, setLightTheme } } = store.getState();
    let { handleCollapse, collapseApp } = this.props;
    let { taskToDelete, todoToDelete, taskStepToDelete } = this.state;
    let elementToDelete = taskToDelete || todoToDelete || taskStepToDelete;

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
          confirmDeletion &&
          this.renderDeleteModal(elementToDelete)
        }
      </BasicPanel>
    )
  }
};

ExpandedApp.contextTypes = {
  store: PropTypes.object
};