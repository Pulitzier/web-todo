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

export default class ExpandedApp extends Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.clearLocalAppState = this.clearLocalAppState.bind(this);
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
        ...this.localState,
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

  render() {
    const { store } = this.context;
    const { userSettings: { confirmDeletion } } = store.getState();
    let { taskToDelete } = this.localState;
    let {
      handleCollapse,
      handleDeleteStep,
      handelDeleteTodo,
      // handleDeleteTask,
      handleDecline,
      customOptions: {
        collapseApp,
        turnOnSound,
        setDarkTheme,
        setLightTheme,
        // taskToDelete,
        todoToDelete,
        taskStepToDelete
      }
    } = this.props;

    console.log(taskToDelete);

    const setOpacity = (expandApp) => {
      if (expandApp) return {
        opacity: 1,
        top: 0,
        transition: 'all 0.5s ease'
      };
      return {
        opacity: 0,
        width: 250,
        height: 30,
        margin: 0,
        top: 2000,
        transition: 'all 0.5s ease'
      }
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
          deleteTodo={(element) => handelDeleteTodo(element)}
          deleteStep={(element) => handleDeleteStep(element)}
        />
        <UserSettingsPanel />
        {
          turnOnSound && <AudioForCompletion />
        }
        {
          (confirmDeletion && taskToDelete) ?
          <DeleteModal
            nameOfItem="task"
            messageOfItem={taskToDelete.taskText}
            onDelete={() => this.handleConfirm(taskToDelete)}
            onCancel={handleDecline()}
          /> : null
        }
        {
          (confirmDeletion && todoToDelete) &&
          <DeleteModal
            nameOfItem="todo"
            messageOfItem={todoToDelete.title}
            onDelete={() => this.handleConfirm(todoToDelete)}
            onCancel={handleDecline()}
          />
        }
        {
          (confirmDeletion && taskStepToDelete) &&
          <DeleteModal
            nameOfItem="step"
            messageOfItem={taskStepToDelete.stepText}
            onDelete={() => this.handleConfirm(taskStepToDelete)}
            onCancel={handleDecline()}
          />
        }
      </BasicPanel>
    )
  }
};

ExpandedApp.contextTypes = {
  store: PropTypes.object
};