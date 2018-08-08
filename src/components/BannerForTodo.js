import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import {
  changeBannerBgColor,
  changeBannerBgImage,
  activateTask,
  typeNewTaskAction,
  sortTasks
} from '../actionCreators';
import { getActiveTodoList } from '../helpers';

export default class BannerForTodo extends Component {
  constructor(props) {
    super(props);
    this.sortState = {
      handleHoverSortLink: false,
      handleHoverSortMenu: false,
      shouldRenameList: false
    }
  }
  componentDidMount(){
    const { store } = this.context;
    store.subscribe(() => {
      this.forceUpdate();
    });
    this.discardNewTask = () => {
      store.dispatch(activateTask(false));
      store.dispatch(typeNewTaskAction(false));
    }
  }

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos }, bannerForTodoState: { currentBannerImage, backgroundColor } } = state;
    const { deleteList } = this.props;
    const activeTodo = getActiveTodoList(todos);
    let {
      handleHoverSortLink,
      handleHoverSortMenu,
      shouldRenameList
    } = this.sortState;

    const defaultBannerSchemes = {
      imageScheme: [
        "./assets/retro.jpg",
        "./assets/museum.jpg",
        "./assets/wi.jpg",
      ],
      colorScheme: [
        "orange",
        "green",
        "red",
        "blue",
        "blueviolet"
      ],
    };

    const changeBannerColor = (color) => {
      this.discardNewTask();
      store.dispatch(changeBannerBgColor(color))
    };

    const changeBannerImage = (image) => {
      this.discardNewTask();
      store.dispatch(changeBannerBgImage(image))
    };

    const handleSortTasks = (sortCriteria) => {
      store.dispatch(sortTasks(sortCriteria, activeTodo.todoListId));
    };

    const checkActiveTodoTitle = (todo) => {
      return (
        todo.title !== 'My Day' &&
          todo.title !== 'Important' &&
            todo.title !== 'To-Do'
      )
    };

    const handleRenamingOfTodo = () => {
      this.setState(() => {
        return this.sortState = {
          ...this.sortState,
          shouldRenameList: true
        }
      })
    };

    return (
      <div
        className={this.props.className}
        style={{backgroundColor: backgroundColor}}
      >
        <img className={this.props.className+"-wrapper"} src={currentBannerImage} alt="Theme Image" />
        <div className="panelBanner-text">
          {
            shouldRenameList ?
            <input value={activeTodo.title} /> :
            <h3>{activeTodo.title}</h3>
          }
          {todos['myPersonalToDo'][0].active ?
            <div className="date-time">{(() => {
              let today = new Date();
              let dateStringForBanner = today.toLocaleString('en-us', {weekday: 'long'}) + ', ' +
                today.toLocaleString('en-us', {month: 'long'}) + ' ' +
                today.toLocaleString('en-us', {day: 'numeric'});
              return dateStringForBanner;
            })()}</div> :
            null
          }
        </div>
          <button
            className="btn btn-primary dots-menu"
            style={{backgroundColor: backgroundColor}}
            data-toggle="modal"
            data-target="#bannerSettings"
          >
            <span>&bull;&bull;&bull;</span>
          </button>

        <div className="modal fade" id="bannerSettings" tabIndex="-1" role="dialog" aria-labelledby="bannerSettingsLabel"
             aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                { checkActiveTodoTitle(activeTodo) ?
                  (
                    <div
                      className="renameList"
                      onClick={() => handleRenamingOfTodo()}
                    >
                      <p>Rename List</p>
                    </div>
                  ) : null
                }
                <div
                  className={'sort-settings-link ' +
                  (
                    this.sortState.handleHoverSortMenu ?
                      "grey" : ''
                  )}
                  onMouseEnter={() =>
                    this.setState(() =>
                      this.sortState = {
                        ...this.sortState,
                        handleHoverSortLink: true,
                      }
                    )
                  }
                  onMouseLeave={() =>
                    this.setState(() => {
                      if (!this.sortState.handleHoverSortMenu) {
                        return this.sortState = {
                          ...this.sortState,
                          handleHoverSortLink: false,
                        }
                      }
                    })
                  }
                >
                  <img src='./assets/sort.svg' alt='Sort' />
                  <p>Sort</p>
                  <img src='./assets/play.svg' alt='Greater Than' />
                </div>
                <div
                    className={"sort-settings-menu " + (
                      handleHoverSortLink ||
                      handleHoverSortMenu ?
                        "active" :
                        ''
                    )}
                    onMouseEnter={() =>
                      this.setState(() => {
                        return this.sortState = {
                          ...this.sortState,
                          handleHoverSortMenu: true
                        }
                      })
                    }
                    onMouseLeave={() =>
                      this.setState(() =>
                        this.sortState = {
                          ...this.sortState,
                          handleHoverSortMenu: false
                        }
                      )
                    }
                  >
                    <div onClick={() => handleSortTasks('ABC')}>
                      <img src="./assets/exchange-arrows.svg" />
                      <p>Alphabetically</p>
                    </div>
                    <div onClick={() => handleSortTasks('DUE_DATE')}>
                      <img src="./assets/calendar.svg" />
                      <p>Due date</p>
                    </div>
                    <div onClick={() => handleSortTasks('CREATED_AT')}>
                      <img src="./assets/graphic-design.svg" />
                      <p>Creation date</p>
                    </div>
                    <div onClick={() => handleSortTasks('COMPLETED')}>
                      <img src="./assets/check.svg" />
                      <p>Completed</p>
                    </div>
                    <div onClick={() => handleSortTasks('ADDED_TO_MY_DAY')}>
                      <img src="./assets/sun.svg" />
                      <p>Added to My Day</p>
                    </div>
              </div>
                <hr />
                <div>
                  <p>Theme</p>
                  {defaultBannerSchemes.colorScheme.map((item,index) =>
                    <button
                      key={index}
                      className={"jumbotron-button "+(backgroundColor == item ? 'active' : null)}
                      onClick={() => {
                        changeBannerColor(item);
                      }}
                    >
                      <span className={item}></span>
                    </button>
                  )}
                  <br />
                  <br />
                  {defaultBannerSchemes.imageScheme.map((item,index) => (
                    <button key={index} onClick={() => changeBannerImage(item)}>
                      <img className="theme-image" src={item} alt="Theme Image" />
                    </button>
                  ))}
                </div>
                <hr />
                <div
                  className="show-hide_completed_todos"
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  <img src='./assets/check.svg' alt='Sort' />
                  <p>Hide completed to-dos</p>
                </div>
                { checkActiveTodoTitle(activeTodo) ?
                  (
                    <div className="deleteList">
                      <p onClick={() => {
                        document.getElementById('bannerSettings').classList.remove('show');
                        document.getElementById('bannerSettings').style.setProperty('display', 'none');
                        document.getElementsByTagName('body')[0].classList.remove('modal-open');
                        let modalBackddrop = document.getElementsByClassName('modal-backdrop')[0];
                        modalBackddrop.parentNode.removeChild(modalBackddrop);
                        deleteList(activeTodo);
                      }}>Delete List</p>
                    </div>
                  ) : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

BannerForTodo.contextTypes = {
  store: PropTypes.object
}