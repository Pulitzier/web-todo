import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getActiveTodoList, checkActiveTodoTitle } from '../../helpers';
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

function setMyDayTime() {
  const today = new Date();
  return (`${today.toLocaleString('en-us', { weekday: 'long' })}, ${
    today.toLocaleString('en-us', { month: 'long' })} ${
    today.toLocaleString('en-us', { day: 'numeric' })}`);
};

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.activateModalSettings = this.activateModalSettings.bind(this);
    this.activateRename = this.activateRename.bind(this);
    this.deactivateGreetingPopup = this.deactivateGreetingPopup.bind(this);
    this.renderBannerText = this.renderBannerText.bind(this);
    this.activateIconsMenu = this.activateIconsMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
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

  handleClick({ target }) {
    const { app: { categories }, handleChangeTitle } = this.props;
    const { title, id: todoListId } = getActiveTodoList(categories);
    const { newListTitle } = this.state;
    if (
      !(this.iconsMenu && this.iconsMenu.contains(target)) ||
      !(this.renameList && this.renameList.contains(target))
    ) {
      handleChangeTitle(todoListId, newListTitle || title);
      this.activateRename(false);
      this.activateIconsMenu(false);
    }
  }

  renderBannerText({ title, iconSource: todoIconSrc }) {
    const { shouldRenameList } = this.state;
    if (shouldRenameList && checkActiveTodoTitle(title)) {
      return (
        <RenameList
          renameRef={(node) => { this.renameList = node; }}
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
      id: todoId, bgImage, bgColor, sortOrder,
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

    return (
      <BasicPanel
        className={(`panelBanner ${activeTask.active ? 'responsive ' : ''}${sortOrder ? 'with-sort' : ''}`)}
        style={{ backgroundImage: `${bgColorForBanner}, url(${bgImage})` }}
      >
        <BasicPanel className="banner-main-section">
          <BasicPanel className={`panelBanner-text ${shouldRenameList ? 'renamed' : ''}`}>
            {
              this.renderBannerText(activeTodo)
            }
            {
              showIconMenu
              && (
              <IconsMenuWrapper
                iconsMenuRef={node => this.iconsMenu = node}
                showMenu={showIconMenu}
                activateRename={this.activateRename}
                activateIconsMenu={this.activateIconsMenu}
                activeTodoId={todoId}
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
          todoId === 0
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
