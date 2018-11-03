import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import {
  getActiveTodoList,
  checkActiveTodoTitle
} from '../helpers';
import { shouldShowGreetings } from '../actionCreators';
import { BANNER_COLOR_SCHEME } from  '../constants';
import RenameListWrapper from './RenameListWrapper';
import IconsMenuWrapper from "./IconsMenuWrapper";
import SortPopUp from "./SortPopUp";
import BannerModalSettings from "./BannerModalSettings";
import BasicButton from './BasicButton';
import BasicPanel from "./BasicPanel";
import GreetingPopUp from './GreetingPopUp';
import BannerTitle from './BannerTitle';

export default class BannerForTodo extends Component {
  constructor(props) {
    super(props);
    this.activateModalSettings = this.activateModalSettings.bind(this);
    this.activateRename = this.activateRename.bind(this);
    this.deactivateGreetingPopup = this.deactivateGreetingPopup.bind(this);
    this.renderBannerText = this.renderBannerText.bind(this);
    this.activateIconsMenu = this.activateIconsMenu.bind(this);
    this.state = {
      shouldRenameList: false,
      shouldChangeIcon: false,
      showModal: false,
      showIconMenu: false
    }
  };

  activateModalSettings() {
    this.setState({ showModal: !this.state.showModal })
  };

  activateRename(bool) {
    this.setState({ shouldRenameList: bool });
  };

  activateIconsMenu(bool) {
    this.setState({
      showIconMenu: bool,
    })
  }

  deactivateGreetingPopup() {
    const { store } = this.context;
    store.dispatch(shouldShowGreetings(false))
  };

  renderBannerText({ title, iconSource: todoIconSrc }) {
    const { shouldRenameList } = this.state;
    if (shouldRenameList && checkActiveTodoTitle(title)) {
      return <RenameListWrapper
        todoTitle={title}
        shouldRenameList={shouldRenameList}
        activateIconsMenu={this.activateIconsMenu}
        activateRename={this.activateRename}
      />
    }
    return <BannerTitle
      todoTitle={title}
      todoIconSrc={todoIconSrc}
      activateIconsMenu={this.activateIconsMenu}
      activateRename={this.activateRename}
    />
  };

  render(){
    const { store } = this.context;
    const state = store.getState();
    const { app: { todos }, taskSettings: { showGreetingPopup }} = state;
    const { activeTask, deleteList, activateGreetings, greetingTasks } = this.props;
    const activeTodo = getActiveTodoList(todos);
    const { todoListId: todoId, bgImage, bgColor, sortOrder } = activeTodo;
    const { showModal, shouldRenameList, showIconMenu } = this.state;
    let bgColorForBanner =
      'linear-gradient(rgba(' +
      BANNER_COLOR_SCHEME[bgColor] +
      ',0.65), rgba(' +
      BANNER_COLOR_SCHEME[bgColor] +
      ', 0.35))'
    ;
    let bgColorForSort = `rgba(${BANNER_COLOR_SCHEME[bgColor]},0.45)`;

    const setMyDayTime = () => {
      let today = new Date();
      return (today.toLocaleString('en-us', {weekday: 'long'}) + ', ' +
        today.toLocaleString('en-us', {month: 'long'}) + ' ' +
        today.toLocaleString('en-us', {day: 'numeric'}))
    };

    return (
      <BasicPanel
        className={("panelBanner " + (activeTask ? 'responsive ' : '') + (!!sortOrder ? 'with-sort' : ''))}
        style={{ backgroundImage: `${bgColorForBanner}, url(${bgImage})`}}
      >
        <BasicPanel className="banner-main-section">
          <BasicPanel
            className={"panelBanner-text " + (shouldRenameList ? "renamed" : '')}
            onBlur={() => this.activateRename(false)}
          >
            {
              this.renderBannerText(activeTodo)
            }
            {
              showIconMenu &&
              <IconsMenuWrapper
                activateRename={this.activateRename}
                activateIconsMenu={this.activateIconsMenu}
                activeTodoId={activeTodo.todoListId}
              />
            }
            {
              (todoId === 0) &&
              <p className="date-time">{setMyDayTime()}</p>
            }
          </BasicPanel>
          <BasicPanel className="banner-button-group">
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
          </BasicPanel>
        </BasicPanel>
        {
          activeTodo.todoListId === 0 &&
          showGreetingPopup &&
          <GreetingPopUp
            activeTask={activeTask}
            latestTasks={greetingTasks}
            bgColor={bgColorForSort}
            deactivateGreetingSuggestions={this.deactivateGreetingPopup}
            activateGreetingPanel={() => activateGreetings()}
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
      </BasicPanel>
    )
  }
};

BannerForTodo.contextTypes = {
  store: PropTypes.object
};