import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import Settings from "./Settings";
import DeleteModal from "./DeleteModal";
import AudioForCompletion from "./AudioForCompletion";
import '../index.css';
import { deleteTask, deleteTodoList } from "../actionCreators";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.localAppState = {
      taskToDelete: '',
      todoToDelete: ''
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
    const { userSettings: { confirmDeletion, turnOnSound } } = store.getState();
    const { taskToDelete, todoToDelete } = this.localAppState;

    const handelDeleteTodo = (element) => {
      if (confirmDeletion) {
        this.setState(() => {
          return this.localAppState = {
            ...this.localAppState,
            todoToDelete: element
          }
        });
      } else {
        store.dispatch(deleteTodoList(element));
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

    const clearLocalAppState = () => {
      this.setState(() => {
        return this.localAppState = {
          ...this.localAppState,
          taskToDelete: '',
          todoToDelete: '',
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
      }
    };

    const handleDecline = () => {
      return clearLocalAppState()
    };

    return (
      <div className="container">
        <div className="row">
          <LeftPanel />
          <RightPanel
            deleteTask={handelDeleteTask}
            deleteTodo={handelDeleteTodo}
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
        </div>
      </div>
    );
  }
};

App.contextTypes = {
  store: PropTypes.object,
};