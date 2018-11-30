import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicPanel from '../BaseComponents/BasicPanel';
import { getActiveTask, getTasksForTodo } from '../../helpers';
import SettingsModal from './SettingsModal/index';

export default class LeftPanelWrapper extends Component {
  constructor(props) {
    super(props);
    this.activateNewList = this.activateNewList.bind(this);
    this.pushNewListToState = this.pushNewListToState.bind(this);
    this.setNewListTitle = this.setNewListTitle.bind(this);
    this.addNewList = this.addNewList.bind(this);
    this.state = {
      activateList: false,
      newListTitle: 'Untitled Todo',
    };
  }

  setNewListTitle(title) {
    this.setState({ newListTitle: title });
  }

  activateNewList(bool) {
    this.setState({ activateList: bool });
  }

  pushNewListToState() {
    const { handleCreateNewCategory } = this.props;
    const { newListTitle } = this.state;
    this.activateNewList(false);
    handleCreateNewCategory(newListTitle);
    this.setNewListTitle('Untitled Todo');
  }

  addNewList() {
    const { categories, handleCloseSearchPanel } = this.props;
    handleCloseSearchPanel();
    let { newListTitle } = this.state;
    categories.map((todo) => {
      if (todo.title.indexOf('Untitled Todo') !== -1) {
        if (isNaN(parseInt(todo.title.replace(/[^\d.]/g, ''), 10))) {
          newListTitle = `Untitled Todo ${1}`;
        } else {
          const index = parseInt(todo.title.replace(/[^\d.]/g, ''), 10) + 1;
          newListTitle = `Untitled Todo ${index}`;
        }
      }
    });
    this.setNewListTitle(newListTitle);
    this.activateNewList(true);
  }

  render() {
    const {
      categories,
      tasks,
      handleChooseCategory,
    } = this.props;
    const { activateList, newListTitle } = this.state;
    const activeTaskId = getActiveTask(tasks) ? getActiveTask(tasks).id : '';

    const addNewList = (event) => {
      const { key } = event;
      if (key === 'Enter') {
        this.pushNewListToState();
      }
    };

    const renderTodoTaskNumber = (todoListId) => {
      if (getTasksForTodo(tasks, todoListId).length === 0) return;
      return getTasksForTodo(tasks, todoListId).length;
    };

    return (
      <BasicPanel className="col-md-4 leftPanel">
        <p className="microsoft-label">Microsoft To-Do</p>
        <SettingsModal />
        <ul className="nav flex-column my-todo-list">
          {categories.map(({
            title, todoListId, active, iconSource,
          }) => {
            if (todoListId < 3) {
              return (
                <li className={`nav-item ${active ? 'active' : ''}`} key={todoListId}>
                  <a
                    className={`nav-link ${active ? 'active' : ''}`}
                    onClick={() => handleChooseCategory(todoListId, activeTaskId)}
                  >
                    <i className={iconSource} />
                    <p>{title}</p>
                    <span>
                      {renderTodoTaskNumber(tasks, todoListId)}
                    </span>
                  </a>
                </li>
              );
            }
          })}
        </ul>
        <hr />
        <BasicPanel className="custom-todo-list-wrapper">
          <ul className="nav flex-column todo-list">
            {categories.map(({
              title, todoListId, active, iconSource,
            }) => {
              if (todoListId >= 3) {
                return (
                  <li
                    className={`nav-item ${active ? 'active' : ''}`}
                    key={todoListId}
                  >
                    <a
                      className="nav-link"
                      onClick={() => handleChooseCategory(todoListId, activeTaskId)}
                    >
                      <i className={`fa ${iconSource}`} />
                      {title}
                      <span>
                        {renderTodoTaskNumber(tasks, todoListId)}
                      </span>
                    </a>
                  </li>
                );
              }
            })}
          </ul>
          <div className="add-new-list" onBlur={() => this.pushNewListToState()}>
            {
              activateList
              && (
              <label className="add-new-list-label-wrapper">
                <i className="fas fa-list" />
                <input
                  type="text"
                  className="add-new-list-label"
                  onChange={event => this.setNewListTitle(event.target.value)}
                  onKeyPress={event => addNewList(event)}
                  value={newListTitle}
                  autoFocus={activateList}
                />
              </label>
              )
            }
            <a
              className="add-new-list-link"
              onClick={() => this.addNewList()}
            >
              <span>+</span>
              {' '}
New List
            </a>
          </div>
        </BasicPanel>
      </BasicPanel>
    );
  }
}

LeftPanelWrapper.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  tasks: PropTypes.arrayOf(PropTypes.shape({})),
  handleCloseSearchPanel: PropTypes.func,
  handleCreateNewCategory: PropTypes.func,
  handleChooseCategory: PropTypes.func,
};

LeftPanelWrapper.defaultProps = {
  categories: [],
  tasks: [],
  handleChooseCategory: () => {},
  handleCreateNewCategory: () => {},
  handleCloseSearchPanel: () => {},
};
