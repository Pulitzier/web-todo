import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Settings from "./Settings";
import DeleteModal from "./DeleteModal";
import AudioForCompletion from "./AudioForCompletion";
import '../index.css';
import {
  deleteTask,
  deleteTodoList,
  deleteStep
} from "../actionCreators";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.localAppState = {
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

  render() {
    const { store } = this.context;
    const { userSettings: { confirmDeletion, turnOnSound, setDarkTheme, setLightTheme } } = store.getState();
    const { taskToDelete, todoToDelete, taskStepToDelete } = this.localAppState;

    const handelDeleteTodo = (element) => {
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

    const handelDeleteTask = (element) => {
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

    const handleDeleteStep = (element) => {
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

    const clearLocalAppState = () => {
      this.setState(() => {
        return this.localAppState = {
          ...this.localAppState,
          taskToDelete: '',
          todoToDelete: '',
          taskStepToDelete: ''
        }
      })
    };

    const handleConfirm = (element) => {
      if(taskToDelete) {
        store.dispatch(deleteTask(element.id));
        clearLocalAppState();
      } else if (todoToDelete) {
        store.dispatch(deleteTodoList(element.todoListId));
        clearLocalAppState();
      } else if (taskStepToDelete) {
        store.dispatch(deleteStep(element.stepId));
        clearLocalAppState();
      }
    };

    const handleDecline = () => {
      return clearLocalAppState()
    };

    return (
      <div className={"container " + (
        setLightTheme ? 'light' :
          setDarkTheme ? 'dark' :
            undefined
      )}>
        <div className="row">
          <LeftPanel />
          <RightPanel
            deleteTask={handelDeleteTask}
            deleteTodo={handelDeleteTodo}
            deleteStep={handleDeleteStep}
          />
          <Settings />
          {
            turnOnSound ? <AudioForCompletion /> : null
          }
          { (confirmDeletion && taskToDelete) ? (
            <DeleteModal
              nameOfItem="task"
              messageOfItem={taskToDelete.taskText}
              onDelete={() => handleConfirm(taskToDelete)}
              onCancel={() => handleDecline()}
            />
            ) : null
          }
          { (confirmDeletion && todoToDelete) ? (
            <DeleteModal
              nameOfItem="todo"
              messageOfItem={todoToDelete.title}
              onDelete={() => handleConfirm(todoToDelete)}
              onCancel={() => handleDecline()}
            />
          ) : null
          }
          { (confirmDeletion && taskStepToDelete) ? (
            <DeleteModal
              nameOfItem="step"
              messageOfItem={taskStepToDelete.stepText}
              onDelete={() => handleConfirm(taskStepToDelete)}
              onCancel={() => handleDecline()}
            />
          ) : null
          }
        </div>
      </div>
    );
  }
};

App.contextTypes = {
  store: PropTypes.object,
};