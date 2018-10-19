import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import RenameList from './RenameList';
import {
  getActiveTodoList,
  checkActiveTodoTitle,
  setInitialIconWhenRename
} from '../helpers';
import IconsMenu from "./IconsMenu";
import SortPopUp from "./SortPopUp";
import BannerModalSettings from "./BannerModalSettings";

export default class BannerForTodo extends Component {
  constructor(props) {
    super(props);
    this.activateModalSettings = this.activateModalSettings.bind(this);
    this.activateRename = this.activateRename.bind(this);
    this.activateIcon = this.activateIcon.bind(this);
    this.bannerState = {
      shouldRenameList: false,
      shouldChangeIcon: false,
      showModal: false
    }
  };

  activateModalSettings() {
    this.setState(() => {
      return this.bannerState = {
        ...this.bannerState,
        showModal: !this.bannerState.showModal
      }
    })
  };

  activateRename(bool) {
    this.setState(() => {
      return this.bannerState = {
        ...this.bannerState,
        shouldRenameList: bool
      }
    })
  };

  activateIcon(bool) {
    this.setState(() => {
      return this.bannerState = {
        ...this.bannerState,
        shouldChangeIcon: bool
      }
    })
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos }} = state;
    const { activeTask, deleteList, activateGreetings } = this.props;
    const activeTodo = getActiveTodoList(todos);
    let { title, todoListId: todoId, iconSource: todoIconSrc, bgImage, bgColor, sortOrder } = activeTodo;
    let { shouldRenameList, shouldChangeIcon, showModal } = this.bannerState;
    const colorScheme = {
      "orange": "249, 148, 7",
      "green": "0, 158, 34",
      "red": "255, 0, 0",
      "blue": "0, 0, 255",
      "blueviolet": "204, 7, 249"
    };
    let bgColorForBanner = 'rgba(' + colorScheme[bgColor] + ', 0.45)';
    let bgColorForSort = 'rgba(' + colorScheme[bgColor] + ', 0.65)';

    const setMyDayTime = () => {
      let today = new Date();
      return (today.toLocaleString('en-us', {weekday: 'long'}) + ', ' +
        today.toLocaleString('en-us', {month: 'long'}) + ' ' +
        today.toLocaleString('en-us', {day: 'numeric'}))
    };

    return (
      <div
        className={"panelBanner " + (activeTask ? 'responsive ' : '') + (!!sortOrder ? 'with-sort' : '')}
        style={{ backgroundImage: `url(${bgImage})`}}
      >
        <section
          className="banner-main-section"
          style={{backgroundColor: bgColorForBanner}}
        >
          <div
            className="panelBanner-text"
            onBlur={() => this.activateRename(false)}
          >
            {
              shouldRenameList && checkActiveTodoTitle(title) ?
                <RenameList activateRename={(bool) => this.activateRename(bool)}/> :
                <div>
                  {
                    todoIconSrc &&
                    checkActiveTodoTitle(title) &&
                    (<button className="banner-change-todo-icon" onClick={() => this.activateIcon(true)}>
                      <i className={"fa " + setInitialIconWhenRename(todoIconSrc)}></i>
                    </button>)
                  }
                  {
                    todoIconSrc &&
                    shouldChangeIcon &&
                    <IconsMenu
                      activateIcon={(bool) => this.activateIcon(bool)}
                      activeTodoId={activeTodo.todoListId}
                    />
                  }
                  <h3
                    className={checkActiveTodoTitle(title) ? "non-default-todo" : ''}
                    onClick={() => this.activateRename(true)}
                  >{activeTodo.title}</h3>
                </div>
            }
            {
              (todoId === 0) &&
              <div className="date-time">{setMyDayTime()}</div>
            }
          </div>
          <div>
            {
              (todoId === 0) &&
              <button
                className="open-greeting"
                style={{backgroundColor: bgColor}}
                onClick={() => activateGreetings()}
              >
                <i className="far fa-lightbulb"></i>
              </button>
            }
            <button
              className="btn btn-primary dots-menu"
              style={{backgroundColor: bgColor}}
              onClick={() => this.activateModalSettings()}
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>
            {
              showModal &&
              <BannerModalSettings
                activeTodo={activeTodo}
                deleteList={deleteList}
                activateRename={(bool) => this.activateRename(bool)}
                showModal={this.activateModalSettings}
              />
            }
          </div>
        </section>
        {
          sortOrder &&
          <SortPopUp
            sortBy={sortOrder}
            todoListId={todoId}
            bgColor={bgColorForSort}
          />
        }
      </div>
    )
  }
};

BannerForTodo.contextTypes = {
  store: PropTypes.object
};