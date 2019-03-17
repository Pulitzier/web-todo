import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  getActiveTodoList,
  checkActiveTodoTitle,
} from '../../helpers';
import { BANNER_COLOR_SCHEME } from '../../store/constants/index';
import RenameList from './RenameList/index';
import IconsMenuWrapper from './IconsMenu/index';
import SortPopUp from './SortPopUp/index';
import ModalSettings from './ModalSettings/index';
import BasicButton from '../BaseComponents/BasicButton';
import BasicPanel from '../BaseComponents/BasicPanel';
import GreetingPopUp from './GreetingPopUp';
import BannerTitle from './BannerTitle';
import { Transition } from 'react-transition-group';

export default class Banner extends Component {
  static setModalHeight(todoListId) {
    if (todoListId === 0 || todoListId === 2) return 301;
    if (todoListId === 1) return 37;
    return 389;
  }

  constructor(props) {
    super(props);
    this.activateModalSettings = this.activateModalSettings.bind(this);
    this.activateRename = this.activateRename.bind(this);
    this.deactivateGreetingPopup = this.deactivateGreetingPopup.bind(this);
    this.renderBannerText = this.renderBannerText.bind(this);
    this.activateIconsMenu = this.activateIconsMenu.bind(this);
    this.state = {
      shouldRenameList: false,
      showModal: false,
      showIconMenu: false,
      transitionStyles: {
        entering: { opacity: 0, transition: 'all 0.5s ease-out' },
        entered:  { opacity: 1, transition: 'all 0.5s ease-out' },
        exiting: { opacity: 0, transition: 'all 0.5s ease-out' },
        exited: { opacity: 0, transition: 'all 0.5s ease-out' }
      }
    };
  }

  activateModalSettings() {
    const { showModal: oldShowModal } = this.state;
    this.setState({ showModal: !oldShowModal });
  }

  activateRename(bool) {
    this.setState({ shouldRenameList: bool });
  }

  activateIconsMenu(bool) {
    this.setState({ showIconMenu: bool });
  }

  deactivateGreetingPopup() {
    const { handleShowGreeting } = this.props;
    handleShowGreeting(false);
  }

  renderBannerText({ title, iconSource: todoIconSrc }) {
    const { shouldRenameList } = this.state;
    if (shouldRenameList && checkActiveTodoTitle(title)) {
      return (
        <RenameList
          todoTitle={title}
          shouldRenameList={shouldRenameList}
          activateIconsMenu={this.activateIconsMenu}
          activateRename={this.activateRename}
        />
      );
    }
    return (
      <BannerTitle
        todoTitle={title}
        todoIconSrc={todoIconSrc}
        activateIconsMenu={this.activateIconsMenu}
        activateRename={this.activateRename}
      />
    );
  }

  render() {
    const {
      app: { categories },
      taskSettings: { showGreetingPopup },
      activeTask,
      deleteList,
      activateGreetings,
      greetingTasks,
    } = this.props;
    const activeTodo = getActiveTodoList(categories);
    const {
      todoListId: todoId, bgImage, bgColor, sortOrder,
    } = activeTodo;
    const {
      showModal,
      shouldRenameList,
      showIconMenu,
      transitionStyles
    } = this.state;
    const bgColorForBanner = `linear-gradient(rgba(${
      BANNER_COLOR_SCHEME[bgColor]
    },0.65), rgba(${
      BANNER_COLOR_SCHEME[bgColor]
    }, 0.35))`;
    const bgColorForSort = `rgba(${BANNER_COLOR_SCHEME[bgColor]},0.45)`;

    const setMyDayTime = () => {
      const today = new Date();
      return (`${today.toLocaleString('en-us', { weekday: 'long' })}, ${
        today.toLocaleString('en-us', { month: 'long' })} ${
        today.toLocaleString('en-us', { day: 'numeric' })}`);
    };

    return (
      <BasicPanel
        className={(`panelBanner ${activeTask.active ? 'responsive ' : ''}${sortOrder ? 'with-sort' : ''}`)}
        style={{ backgroundImage: `${bgColorForBanner}, url(${bgImage})` }}
      >
        <BasicPanel className="banner-main-section">
          <BasicPanel
            className={`panelBanner-text ${shouldRenameList ? 'renamed' : ''}`}
            onBlur={() => this.activateRename(false)}
          >
            {
              this.renderBannerText(activeTodo)
            }
            {
              showIconMenu
              && (
              <IconsMenuWrapper
                activateRename={this.activateRename}
                activateIconsMenu={this.activateIconsMenu}
                activeTodoId={activeTodo.todoListId}
              />
              )
            }
            {
              (todoId === 0)
              && <p className="date-time">{setMyDayTime()}</p>
            }
          </BasicPanel>
          <BasicPanel className="banner-button-group">
            {
              (todoId === 0)
              && (
              <BasicButton
                buttonClassName="open-greeting"
                buttonOnClickAction={() => activateGreetings()}
                buttonStyle={{ backgroundColor: bgColor }}
                iconClassName="far fa-lightbulb"
              />
              )
            }
            <BasicButton
              buttonClassName="dots-menu"
              buttonOnClickAction={() => this.activateModalSettings()}
              buttonStyle={{ backgroundColor: bgColor }}
              iconClassName="fas fa-ellipsis-h"
            />
            <Transition
              in={showModal}
              timeout={100}
              mountOnEnter
              unmountOnExit
            >
              {(transitionState) => (
                <ModalSettings
                  animationStart={showModal}
                  activeTodo={activeTodo}
                  deleteList={deleteList}
                  activateRename={bool => this.activateRename(bool)}
                  modalStyle={transitionStyles[transitionState]}
                />
              )}
            </Transition>
          </BasicPanel>
        </BasicPanel>
        {
          activeTodo.todoListId === 0
          && showGreetingPopup
          && (
          <GreetingPopUp
            activeTask={activeTask}
            latestTasks={greetingTasks}
            bgColor={bgColorForSort}
            deactivateGreetingSuggestions={this.deactivateGreetingPopup}
            activateGreetingPanel={() => activateGreetings()}
          />
          )
        }
        {
          sortOrder
          && (
          <SortPopUp
            sortBy={sortOrder}
            todoListId={todoId}
            bgColor={bgColorForSort}
          />
          )
        }
      </BasicPanel>
    );
  }
}

Banner.propTypes = {
  app: PropTypes.shape({}),
  taskSettings: PropTypes.shape({}),
  activeTask: PropTypes.shape({}),
  handleShowGreeting: PropTypes.func,
  deleteList: PropTypes.func,
  activateGreetings: PropTypes.func,
  greetingTasks: PropTypes.arrayOf(PropTypes.shape({})),
};

Banner.defaultProps = {
  app: {},
  taskSettings: {},
  activeTask: {},
  handleShowGreeting: () => {},
  deleteList: () => {},
  activateGreetings: () => {},
  greetingTasks: [],
};
