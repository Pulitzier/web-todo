import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import {
  getActiveTodoList,
  checkActiveTodoTitle,
  setInitialIconWhenRename
} from '../helpers';
import {
  BANNER_COLOR_SCHEME
} from  '../constants';
import RenameList from './RenameList';
import IconsMenu from "./IconsMenu";
import SortPopUp from "./SortPopUp";
import BannerModalSettings from "./BannerModalSettings";
import BasicButton from './BasicButton';
import BasicPanel from "./BasicPanel";
import GreetingPopUp from './GreetingPopUp';

export default class BannerForTodo extends Component {
  constructor(props) {
    super(props);
    this.activateModalSettings = this.activateModalSettings.bind(this);
    this.activateRename = this.activateRename.bind(this);
    this.activateIcon = this.activateIcon.bind(this);
    this.renderBannerText = this.renderBannerText.bind(this);
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

  renderBannerText(activeTodo) {
    let { title, todoListId: todoId, iconSource: todoIconSrc } = activeTodo;
    let { shouldRenameList, shouldChangeIcon } = this.bannerState;
    if (shouldRenameList && checkActiveTodoTitle(title)) {
      return <RenameList activateRename={(bool) => this.activateRename(bool)}/>
    }
    return (
      <BasicPanel>
        {
          todoIconSrc !== "fa-list" &&
          checkActiveTodoTitle(title) &&
          (<BasicButton
            buttonClassName="banner-change-todo-icon"
            buttonOnClickAction={() => this.activateIcon(true)}
            iconClassName={("fa " + setInitialIconWhenRename(todoIconSrc))}
          />)
        }
        {
          shouldChangeIcon &&
          todoIconSrc !== "fa-list" &&
          <IconsMenu
            activateIcon={(bool) => this.activateIcon(bool)}
            activeTodoId={todoId}
          />
        }
        <h3
          className={checkActiveTodoTitle(title) ? "non-default-todo" : ''}
          onClick={() => this.activateRename(true)}
        >{title}</h3>
      </BasicPanel>
    )
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos, tasks }} = state;
    const { activeTask, deleteList, activateGreetings, greetingTasks } = this.props;
    const activeTodo = getActiveTodoList(todos);
    let { todoListId: todoId, bgImage, bgColor, sortOrder } = activeTodo;
    let { showModal, shouldRenameList } = this.bannerState;
    let bgColorForBanner = `linear-gradient(rgba(${BANNER_COLOR_SCHEME[bgColor]},0.65), rgba(${BANNER_COLOR_SCHEME[bgColor]}, 0.35))`;
    let bgColorForSort = `rgba(${BANNER_COLOR_SCHEME[bgColor]},0.45)`;

    const setMyDayTime = () => {
      let today = new Date();
      return (today.toLocaleString('en-us', {weekday: 'long'}) + ', ' +
        today.toLocaleString('en-us', {month: 'long'}) + ' ' +
        today.toLocaleString('en-us', {day: 'numeric'}))
    };

    return (
      <div
        className={("panelBanner " + (activeTask ? 'responsive ' : '') + (!!sortOrder ? 'with-sort' : ''))}
        style={{ backgroundImage: `${bgColorForBanner}, url(${bgImage})`}}
      >
        <section className="banner-main-section">
          <div
            className={"panelBanner-text " + (shouldRenameList ? "renamed" : '')}
            onBlur={() => this.activateRename(false)}
          >
            {
              this.renderBannerText(activeTodo)
            }
            {
              (todoId === 0) &&
              <p className="date-time">{setMyDayTime()}</p>
            }
          </div>
          <div className="banner-button-group">
            {
              (todoId === 0) &&
              <BasicButton
                buttonClassName="open-greeting"
                buttonOnClickAction={() => activateGreetings()}
                buttonStyle={{backgroundColor: bgColor}}
                iconClassName="far fa-lightbulb"
              />
            }
            <BasicButton
              buttonClassName="btn btn-primary dots-menu"
              buttonOnClickAction={() => this.activateModalSettings()}
              buttonStyle={{backgroundColor: bgColor}}
              iconClassName="fas fa-ellipsis-h"
            />
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
          (greetingTasks.length !== 0) &&
          <GreetingPopUp
            activeTask={activeTask}
            latestTasks={greetingTasks}
            bgColor={bgColorForSort}
          />
        }
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