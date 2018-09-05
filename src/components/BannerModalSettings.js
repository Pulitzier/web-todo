import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  activateTask,
  changeBannerBgColor,
  changeBannerBgImage,
  sortTasks,
  typeNewTaskAction,
  filterCompletedTasks
} from "../actionCreators";

export default class BannerModalSettings extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.modalState = {
      handleHoverSortLink: false,
      handleHoverSortMenu: false
    }
  };

  componentDidMount(){
    let { store } = this.context;
    document.addEventListener('click', this.handleClick, false);
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    })
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
    this.unsubscribe();
  };

  handleClick(event) {
    const { showModal } = this.props;
    let { target } = event;
    if (!this.bannerModal.contains(target)) {
      return showModal();
    }
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { taskSettings: { showCompleted } } = state;
    const {
      activeTodo,
      deleteList,
      activateRename,
      showModal,
      setSortCriteria,
    } = this.props;
    let { todoListId, bgColor, title: todoTitle } = activeTodo;
    const imageScheme = [ "./assets/retro.jpg", "./assets/museum.jpg", "./assets/wi.jpg" ];
    const colorScheme = [ "orange", "green", "red", "blue", "blueviolet" ];
    let { handleHoverSortLink, handleHoverSortMenu } = this.modalState;

    const setHeight = () => {
      if(handleHoverSortLink || handleHoverSortMenu) {
        if(todoListId > 1 ) {
          return 264;
        }
        return 220;
      }
    };

    const discardNewTask = () => {
      store.dispatch(activateTask(false));
      store.dispatch(typeNewTaskAction(false));
    };

    const checkActiveTodoTitle = (todoTitle) => {
      return (
        todoTitle !== 'My Day' &&
        todoTitle !== 'Important' &&
        todoTitle !== 'To-Do'
      )
    };

    const handleSortTasks = (sortCriteria) => {
      setSortCriteria(sortCriteria);
      store.dispatch(sortTasks(sortCriteria, todoListId));
      showModal();
    };

    const changeBannerColor = (color) => {
      discardNewTask();
      store.dispatch(changeBannerBgColor(color, todoListId))
    };

    const changeBannerImage = (image) => {
      discardNewTask();
      store.dispatch(changeBannerBgImage(image, todoListId))
    };

    const showCompletedTasks = (bool) => {
      store.dispatch(filterCompletedTasks(bool))
    };

    return (
      <section
        id="bannerSettings"
        className="banner-modal-settings"
        ref={node => this.bannerModal = node}
      >
        {
          checkActiveTodoTitle(todoTitle) &&
          <div
            className="renameList"
            onClick={() => {
              showModal();
              activateRename(true);
            }}
          >
            <p>Rename List</p>
          </div>
        }
        <div
          className={'sort-settings-link ' +
          (
            handleHoverSortMenu ?
              "grey" : ''
          )}
          onMouseEnter={() =>
            this.setState(() =>
              this.modalState = {
                ...this.modalState,
                handleHoverSortLink: true,
              }
            )
          }
          onMouseLeave={() =>
            this.setState(() => {
              if (!handleHoverSortMenu) {
                return this.modalState = {
                  ...this.modalState,
                  handleHoverSortLink: false,
                }
              }
            })
          }
        >
          <img src='./assets/sort.svg' alt='Sort' />
          <p>Sort</p>
          <img
            className={ todoListId === 1 ? 'important' : ''}
            src='./assets/play.svg'
            alt='Greater Than'
          />
        </div>
        <div
          className={"sort-settings-menu " + (
            handleHoverSortLink ||
            handleHoverSortMenu ?
              "active" :
              ''
          )}
          style={{
            height: setHeight(),
          }}
          onMouseEnter={() =>
            this.setState(() => {
              return this.modalState = {
                ...this.modalState,
                handleHoverSortMenu: true
              }
            })
          }
          onMouseLeave={() =>
            this.setState(() =>
              this.modalState = {
                ...this.modalState,
                handleHoverSortMenu: false
              }
            )
          }
        >
          {
            (todoListId !== 1) && (
              <div onClick={() => handleSortTasks('IMPORTANT')}>
                <img src="./assets/star.svg" />
                <p>Importance</p>
              </div>
            )
          }
          <div onClick={() => handleSortTasks('DUE_DATE')}>
            <img src="./assets/calendar.svg" />
            <p>Due date</p>
          </div>
          {
            !!todoListId && (
              <div onClick={() => handleSortTasks('ADDED_TO_MY_DAY')}>
                <img src="./assets/sun.svg" />
                <p>Added to My Day</p>
              </div>
            )
          }
          <div onClick={() => handleSortTasks('COMPLETED')}>
            <img src="./assets/check.svg" />
            <p>Completed</p>
          </div>
          <div onClick={() => handleSortTasks('ABC')}>
            <img src="./assets/exchange-arrows.svg" />
            <p>Alphabetically</p>
          </div>
          <div onClick={() => handleSortTasks('CREATED_AT')}>
            <img src="./assets/graphic-design.svg" />
            <p>Creation date</p>
          </div>
        </div>
        { todoListId !== 1 && <hr /> }
        {
          todoListId !== 1 &&
          <div className="banner-theme-settings">
            <p>Theme</p>
            {colorScheme.map((item,index) =>
              <button
                key={index}
                className={"jumbotron-button "+(bgColor === item ? 'active' : null)}
                onClick={() => {
                  changeBannerColor(item);
                }}
              >
                <span className={item}></span>
              </button>
            )}
            <br />
            <br />
            {imageScheme.map((item,index) => (
              <button key={index} onClick={() => changeBannerImage(item)}>
                <img className="theme-image" src={item} alt="Theme Image" />
              </button>
            ))}
          </div>
        }
        { todoListId !== 1 && <hr /> }
        {
          todoListId !== 1 &&
          <div
            className="show-hide_completed_todos"
            onClick={() => {
              if(showCompleted) {
                showCompletedTasks(false);
              } else {
                showCompletedTasks(true);
              }
              showModal();
            }}
          >
            <img src='./assets/check.svg' alt='Sort' />
            <p>{showCompleted ? "Hide" : 'Show'} completed to-dos</p>
          </div>
        }
        { checkActiveTodoTitle(todoTitle) &&
          (
            <div className="deleteList">
              <p onClick={() => {
                showModal();
                deleteList(activeTodo);
              }}>Delete List</p>
            </div>
          )
        }
      </section>
    )
  }
};

BannerModalSettings.contextTypes = {
  store: PropTypes.object
};