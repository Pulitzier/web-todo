import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import {
  activateTask,
  addNewTaskToList,
  typeNewTaskAction,
  toggleTask,
  activateTaskSettings
} from '../actionCreators';

export default class ToDoListOfTask extends Component {
  constructor(props) {
    super(props);
    this.todoState = {
      activateTodoTask: false,
      localToggleTask: false,
      clicked: false
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
    const { app: { tasks }, userSettings: { turnOnSound } } = state;
    const { activeTodo } = this.props;
    const { localToggleTask, clicked } = this.todoState;

    const activateToDoTask = (bool) => {
      store.dispatch(activateTask(bool));
      document.querySelector('body').addEventListener('dblclick', () => {
        store.dispatch(activateTask(false));
        store.dispatch(typeNewTaskAction(false));
        this.newTaskInput.value = '';
      })
    };

    const typeNewTask = (bool) => {
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

    const playSoundWhenDone = (taskDone) => {
      let audio = document.getElementById("soundOnComplete");
      if (turnOnSound && !taskDone) audio.play();
    };

    const toggleTodoTask = (task) => {
      turnOnSound ? playSoundWhenDone(task.done) : null;
      store.dispatch(toggleTask(task.id));
    };

    const activateSettings = (taskId) => {
      store.dispatch(activateTaskSettings(taskId, true));
    };

    return(
      <div className="todo-list-wrapper">
        <div className="todo-list">
          {(() => {
            if (tasks.length > 0) {
              return tasks.map((taskItem, i) => {
                if (activeTodo.todoListId === taskItem.parentId) {
                  return (
                    <div
                      key={i}
                      className="todos"
                      onClick={() => activateSettings(taskItem.id)}
                    >
                      <label
                        className={
                          "toggleTodoLabel " +
                          (taskItem.done ? "done" : '')
                        }
                      >
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleTodoTask(taskItem);
                          }}
                        ></span>
                      </label>
                      <p className={taskItem.done ? 'lineThrough' : null}>{taskItem.taskText}</p>
                      <button
                        className="important-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          this.setState(() => {
                            return this.todoState = {
                              ...this.todoState,
                              clicked: !this.todoState.clicked
                            }
                          })
                        }}
                      >
                        {clicked ?
                          <img src="./assets/star-fill.svg"/> :
                          <img src="./assets/star.svg"/>
                        }
                      </button>
                    </div>
                  )
                }
              });
            }
          })()}
          <div className="todos">
            <div className="add-new-todo">
              <div className="add-new-todo-wrapper">
                <div>
                  <label
                    htmlFor="toggleTodoCheckbox-template"
                    className={
                      "toggleTodoLabel-template " +
                      (state.taskSettings.activateNewTask ? 'active ' : 'inactive ') +
                      ((state.taskSettings.activateNewTask && localToggleTask) ? 'toggled' : 'untoggled')
                    }
                  >
                    <span></span>
                  </label>
                  <input
                    type="text"
                    name="add new task"
                    ref={node => this.newTaskInput = node}
                    placeholder={!state.taskSettings.activateNewTask ? "+ Add a to-do" : "Add a to-do"}
                    className={"add-new-todo-input " + (state.taskSettings.activateNewTask ? "activated" : "inactive")}
                    onFocus={() => activateToDoTask(true)}
                    onChange={() => typeNewTask(true)}
                  />
                  <button
                    className={"clearInput " +  (state.taskSettings.typeNewTask ? 'active' : 'inactive')}
                    onClick={() => typeNewTask(false)}
                  >
                    x
                  </button>
                </div>
                <button
                  className={"add-new-todo-button " +  (state.taskSettings.typeNewTask ? 'active' : 'inactive')}
                  onClick={() => addNewTask(activeTodo)}
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
}