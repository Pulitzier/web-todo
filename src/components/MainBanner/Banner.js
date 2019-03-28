import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { checkActiveTodoTitle } from '../../helpers';
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

  handleClick({ target }) {
    const { activeTodoTitle, activeTodoId, handleChangeTitle } = this.props;
    const { newListTitle } = this.state;
    if(this.panelBanner && !this.panelBanner.contains(target)) {
      handleChangeTitle(activeTodoId, newListTitle || activeTodoTitle);
      this.activateRename(false);
      this.activateIconsMenu(false);
    }
  }

  renderBannerText() {
    const { activeTodoTitle, iconSource } = this.props;
    const { shouldRenameList } = this.state;
    if (shouldRenameList && checkActiveTodoTitle(activeTodoTitle)) {
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
        todoTitle={activeTodoTitle}
        todoIconSrc={iconSource}
        activateIconsMenu={this.activateIconsMenu}
        activateRename={this.activateRename}
      />
    );
  }

  render() {
    const {
      activeTodoId,
      activeTodoTitle,
      bgImage,
      bgColor,
      bgColorForSort,
      bgColorForBanner,
      sortOrder,
      taskSettings: { showGreetingPopup },
      activeTask,
      deleteList,
      activateGreetings,
      greetingTasks,
      deactivateGreetingPopup
    } = this.props;
    const {
      showModal,
      shouldRenameList,
      showIconMenu,
      transitionStyles
    } = this.state;

    return (
      <BasicPanel
        className={(`panelBanner ${activeTask.active ? 'responsive ' : ''}${sortOrder ? 'with-sort' : ''}`)}
        style={{ backgroundImage: `${bgColorForBanner}, url(${bgImage})` }}
      >
        <BasicPanel className="banner-main-section">
          <div
            className={`panelBanner-text ${shouldRenameList ? 'renamed' : ''}`}
            ref={node => {this.panelBanner = node}}
          >
            {
              this.renderBannerText()
            }
            {
              showIconMenu
              && (
              <IconsMenuWrapper
                showMenu={showIconMenu}
                activateRename={this.activateRename}
                activateIconsMenu={this.activateIconsMenu}
                activeTodoId={activeTodoId}
              />
              )
            }
            {
              (activeTodoId === 0)
              && <p className="date-time">{setMyDayTime()}</p>
            }
          </div>
          <BasicPanel className="banner-button-group">
            {
              (activeTodoId === 0)
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
                  activeTodo={{ activeTodoId, bgColor, bgImage, activeTodoTitle }}
                  deleteList={deleteList}
                  activateRename={bool => this.activateRename(bool)}
                  modalStyle={transitionStyles[transitionState]}
                />
              )}
            </Transition>
          </BasicPanel>
        </BasicPanel>
        {
          activeTodoId === 0
          && showGreetingPopup
          && (
          <GreetingPopUp
            activeTask={activeTask}
            latestTasks={greetingTasks}
            bgColor={bgColorForSort}
            deactivateGreetingSuggestions={deactivateGreetingPopup}
            activateGreetingPanel={() => activateGreetings()}
          />
          )
        }
        {
          sortOrder
          && (
          <SortPopUp
            sortBy={sortOrder}
            todoListId={activeTodoId}
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
