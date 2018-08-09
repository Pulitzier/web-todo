import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import {
  activateTask,
  addNewTaskToList,
  typeNewTaskAction
} from '../actionCreators';
import TodoTasks from "./TodoTasks";


export default class ToDoListOfTask extends Component {
  constructor(props) {
    super(props);
    this.todoState = {
      activateTodoTask: false,
      localToggleTask: false,
    };
  };
  componentDidMount() {
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  };
  componentWillUnmount() {
    this.unsubscribe();
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const {
      app: { tasks },
      taskSettings: { activateNewTask, typeNewTask }
    } = state;
    const { activeTodo } = this.props;
    const { localToggleTask } = this.todoState;

    const activateToDoTask = (bool) => {
      store.dispatch(activateTask(bool));
      const dblClickEvent = () => {
        store.dispatch(activateTask(false));
        store.dispatch(typeNewTaskAction(false));
        this.newTaskInput.value = '';
      };
      document.querySelector('body').addEventListener('dblclick', () => {
        dblClickEvent();
        document.querySelector('body').removeEventListener('dblclick', dblClickEvent());
      })
    };

    const handleTypeNewTask = (bool) => {
      store.dispatch(typeNewTaskAction(bool));
      !bool ? this.newTaskInput.value = '' : null;
    };

    const addNewTask = (activeTodo) => {
      let newTask = this.newTaskInput.value;
      store.dispatch(addNewTaskToList(newTask, activeTodo));
      store.dispatch(typeNewTaskAction(false));
      this.newTaskInput.focus();
      this.newTaskInput.value = '';
    };

    //
    // const handleAddToTodo = (taskId) => {
    //   if (todosIds.find(id => id === taskId)) {
    //     todosIds = todosIds.filter(id => id !== taskId);
    //     store.dispatch(addTaskToImportant(todosIds))
    //   } else {
    //     todosIds.push(taskId);
    //     store.dispatch(addTaskToImportant(todosIds));
    //   }
    // };

    return(
      <div className="todo-list-wrapper">
        <div className="todo-list">
          {
            !!tasks.length && <TodoTasks />
          }
          <div className="todos">
            <div className="add-new-todo">
              <div className="add-new-todo-wrapper">
                <div>
                  <label
                    htmlFor="toggleTodoCheckbox-template"
                    className={
                      "toggleTodoLabel-template " +
                      (activateNewTask ? 'active ' : 'inactive ') +
                      ((activateNewTask && localToggleTask) ? 'toggled' : 'untoggled')
                    }
                  >
                    <span></span>
                  </label>
                  <input
                    type="text"
                    name="add new task"
                    ref={node => this.newTaskInput = node}
                    placeholder={!activateNewTask ? "+ Add a to-do" : "Add a to-do"}
                    className={"add-new-todo-input " + (activateNewTask ? "activated" : "inactive")}
                    onFocus={() => activateToDoTask(true)}
                    onChange={() => handleTypeNewTask(true)}
                  />
                  <button
                    className={"clearInput " +  (typeNewTask ? 'active' : 'inactive')}
                    onClick={() => handleTypeNewTask(false)}
                  >
                    x
                  </button>
                </div>
                <button
                  className={"add-new-todo-button " +  (typeNewTask ? 'active' : 'inactive')}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addNewTask(activeTodo)
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="todos"></div>
          <div className="todos"></div>
          <div className="todos"></div>
          <div className="todos"></div>
          <div className="todos"></div>
          <div className="todos"></div>
        </div>
      </div>
    )
  }
};

ToDoListOfTask.contextTypes = {
  store: PropTypes.object
};