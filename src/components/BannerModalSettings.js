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
import {
  COLOR_SCHEME,
  IMAGE_SCHEME
} from  '../constants';
import { checkActiveTodoTitle } from '../helpers';

export default class BannerModalSettings extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.showCompletedTasks = this.showCompletedTasks.bind(this);
    this.changeBannerImage = this.changeBannerImage.bind(this);
    this.changeBannerColor = this.changeBannerColor.bind(this);
    this.handleSortTasks = this.handleSortTasks.bind(this);
    this.handleHoverSortLink = this.handleHoverSortLink.bind(this);
    this.handleMouseEnterSortLink = this.handleMouseEnterSortLink.bind(this);
    this.handleMouseLeaveSortLink = this.handleMouseLeaveSortLink.bind(this);
    this.handleHoverSortMenu = this.handleHoverSortMenu.bind(this);
    this.state = {
      hoverSortLink: false,
      hoverSortMenu: false
    }
  };

  componentDidMount(){
    document.addEventListener('click', this.handleClick, false);
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  };

  handleClick(event) {
    const { showModal } = this.props;
    let { target } = event;
    if (!this.bannerModal.contains(target)) {
      return showModal();
    }
  };

  discardNewTask(){
    const { store } = this.context;
    store.dispatch(activateTask(false));
    store.dispatch(typeNewTaskAction(false));
  };

  handleSortTasks(sortCriteria, todoListId){
    const { store } = this.context;
    const { showModal } = this.props;
    store.dispatch(sortTasks(sortCriteria, todoListId));
    showModal();
  };

  changeBannerColor(color, todoListId){
    const { store } = this.context;
    this.discardNewTask();
    store.dispatch(changeBannerBgColor(color, todoListId))
  };

  changeBannerImage(image, todoListId){
    const { store } = this.context;
    this.discardNewTask();
    store.dispatch(changeBannerBgImage(image, todoListId))
  };

  showCompletedTasks(bool){
    const { store } = this.context;
    store.dispatch(filterCompletedTasks(bool))
  };

  handleHoverSortLink(bool) {
    this.setState({ hoverSortLink: bool })
  };

  handleMouseEnterSortLink() {
    this.handleHoverSortLink(true)
  };

  handleMouseLeaveSortLink() {
    if (!this.state.hoverSortMenu) this.handleHoverSortLink(false);
  };

  handleHoverSortMenu() {
    this.setState({ hoverSortMenu: !this.state.hoverSortMenu })
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { taskSettings: { showCompleted } } = state;
    const { activeTodo, deleteList, activateRename, showModal } = this.props;
    const { todoListId, bgColor, bgImage, title: todoTitle } = activeTodo;
    const { hoverSortLink, hoverSortMenu } = this.state;

    const setHeight = () => {
      if(hoverSortLink || hoverSortMenu) {
        if(todoListId > 1 ) return 264;
        return 220;
      }
    };

    return (
      <section
        id="bannerSettings"
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
            <i className="fas fa-pencil-alt"></i>
            <p>Rename List</p>
          </div>
        }
        <div
          className={'sort-settings-link ' + (hoverSortMenu ? "grey" : '' )}
          onMouseEnter={() => this.handleMouseEnterSortLink()}
          onMouseLeave={() => this.handleMouseLeaveSortLink()}
        >
          <i className="fas fa-sort-alpha-down"></i>
          <p>Sort</p>
          <i className={"fas fa-angle-right " + (todoListId === 1 ? 'important' : '')}></i>
        </div>
        <div
          className={"sort-settings-menu " + (
            hoverSortLink ||
            hoverSortMenu ?
              "active" :
              ''
          )}
          style={{ height: setHeight() }}
          onMouseEnter={() => this.handleHoverSortMenu()}
          onMouseLeave={() => this.handleHoverSortMenu()}
        >
          {
            (todoListId !== 1) && (
              <div onClick={() => this.handleSortTasks('IMPORTANT', todoListId)}>
                <i className="far fa-star"></i>
                <p>Importance</p>
              </div>
            )
          }
          <div onClick={() => this.handleSortTasks('DUE_DATE', todoListId)}>
            <i className="far fa-calendar-alt"></i>
            <p>Due date</p>
          </div>
          {
            !!todoListId && (
              <div onClick={() => this.handleSortTasks('ADDED_TO_MY_DAY', todoListId)}>
                <i className="far fa-sun"></i>
                <p>Added to My Day</p>
              </div>
            )
          }
          <div onClick={() => this.handleSortTasks('COMPLETED', todoListId)}>
            <i className="far fa-check-circle"></i>
            <p>Completed</p>
          </div>
          <div onClick={() => this.handleSortTasks('ABC', todoListId)}>
            <i className="fas fa-exchange-alt"></i>
            <p>Alphabetically</p>
          </div>
          <div onClick={() => this.handleSortTasks('CREATED_AT', todoListId)}>
            <i className="far fa-plus-square"></i>
            <p>Creation date</p>
          </div>
        </div>
        { todoListId !== 1 && <hr /> }
        {
          todoListId !== 1 &&
          <div className="banner-theme-settings">
            <p>Theme</p>
            {COLOR_SCHEME.map((item,index) => {
              return (<button
                key={index}
                className={"jumbotron-button "+(bgColor === item ? 'active' : '')}
                onClick={() => {
                  this.changeBannerColor(item, todoListId);
                }}
              >
                <span className={item}></span>
              </button>)}
            )}
            <br />
            <br />
            {IMAGE_SCHEME.map((item,index) => (
              <button
                key={index}
                className={"jumbotron-button "+(bgImage === item ? 'active' : '')}
                onClick={() => this.changeBannerImage(item, todoListId)}>
                <span className="bgImage-wrapper">
                  <img className="theme-image" src={item} alt="Theme Image" />
                </span>
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
                this.showCompletedTasks(false);
              } else {
                this.showCompletedTasks(true);
              }
              showModal();
            }}
          >
            <i className={showCompleted ? "far fa-check-circle" : "fas fa-check-circle"}></i>
            <p>{showCompleted ? "Hide" : 'Show'} completed to-dos</p>
          </div>
        }
        { checkActiveTodoTitle(todoTitle) &&
          (
            <div
              className="deleteList"
              onClick={() => {
                showModal();
                deleteList(activeTodo);
              }}
            >
              <i className="fas fa-trash-alt"></i>
              <p>Delete List</p>
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