import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  COLOR_SCHEME,
  IMAGE_SCHEME,
} from '../../../store/constants/index';
import { checkActiveTodoTitle } from '../../../helpers';

export default class ModalSettings extends Component {
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
      hoverSortMenu: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick({ target }) {
    const { showModal } = this.props;
    const bannerModal = document.getElementById("bannerSettings");
    if (!bannerModal.contains(target)) {
      return showModal();
    }
    return undefined;
  }

  discardNewTask() {
    const { handleActivateTask, handleTypeNewTask } = this.props;
    handleActivateTask(false);
    handleTypeNewTask(false);
  }

  handleSortTasks(sortCriteria, todoListId) {
    const { showModal, handleSortTask } = this.props;
    handleSortTask(sortCriteria, todoListId);
    showModal();
  }

  changeBannerColor(color, todoListId) {
    const { handleChangeColor } = this.props;
    this.discardNewTask();
    handleChangeColor(color, todoListId);
  }

  changeBannerImage(image, todoListId) {
    const { handleChangeImage } = this.props;
    this.discardNewTask();
    handleChangeImage(image, todoListId);
  }

  showCompletedTasks(bool) {
    const { handleFilterCompletedTasks } = this.props;
    handleFilterCompletedTasks(bool);
  }

  handleHoverSortLink(bool) {
    this.setState({ hoverSortLink: bool });
  }

  handleMouseEnterSortLink() {
    this.handleHoverSortLink(true);
  }

  handleMouseLeaveSortLink() {
    const { hoverSortMenu } = this.state;
    if (!hoverSortMenu) this.handleHoverSortLink(false);
  }

  handleHoverSortMenu() {
    const { hoverSortMenu: oldSort } = this.state;
    this.setState({ hoverSortMenu: !oldSort });
  }

  render() {
    const {
      activeTodo,
      deleteList,
      activateRename,
      showModal,
      modalStyle,
      taskSettings: { showCompleted },
    } = this.props;
    const {
      id: todoListId, bgColor, bgImage, title: todoTitle,
    } = activeTodo;
    const { hoverSortLink, hoverSortMenu } = this.state;

    const setHeight = () => {
      if (hoverSortLink || hoverSortMenu) {
        if (todoListId > 1) return 264;
        return 220;
      }
    };

    return (
      <section
        id="bannerSettings"
        style={modalStyle}
      >
        {
          checkActiveTodoTitle(todoTitle)
          && (
            <div
              role="presentation"
              className="renameList"
              onClick={() => {
                showModal();
                activateRename(true);
              }}
            >
              <i className="fas fa-pencil-alt" />
              <p>Rename List</p>
            </div>
          )
        }
        <div
          className={`sort-settings-link ${hoverSortMenu ? 'grey' : ''}`}
          onMouseEnter={() => this.handleMouseEnterSortLink()}
          onMouseLeave={() => this.handleMouseLeaveSortLink()}
        >
          <i className="fas fa-sort-alpha-down" />
          <p>Sort</p>
          <i className={`fas fa-angle-right ${todoListId === 1 ? 'important' : ''}`} />
        </div>
        <div
          className={`sort-settings-menu ${
            hoverSortLink
            || hoverSortMenu
              ? 'active'
              : ''}`}
          style={{ height: setHeight() }}
          onMouseEnter={() => this.handleHoverSortMenu()}
          onMouseLeave={() => this.handleHoverSortMenu()}
        >
          {
            (todoListId !== 1) && (
              <div
                role="presentation"
                onClick={() => this.handleSortTasks('IMPORTANT', todoListId)}
              >
                <i className="far fa-star" />
                <p>Importance</p>
              </div>
            )
          }
          <div
            role="presentation"
            onClick={() => this.handleSortTasks('DUE_DATE', todoListId)}
          >
            <i className="far fa-calendar-alt" />
            <p>Due date</p>
          </div>
          {
            !!todoListId && (
              <div
                role="presentation"
                onClick={() => this.handleSortTasks('ADDED_TO_MY_DAY', todoListId)}
              >
                <i className="far fa-sun" />
                <p>Added to My Day</p>
              </div>
            )
          }
          <div
            role="presentation"
            onClick={() => this.handleSortTasks('COMPLETED', todoListId)}
          >
            <i className="far fa-check-circle" />
            <p>Completed</p>
          </div>
          <div
            role="presentation"
            onClick={() => this.handleSortTasks('ABC', todoListId)}
          >
            <i className="fas fa-exchange-alt" />
            <p>Alphabetically</p>
          </div>
          <div
            role="presentation"
            onClick={() => this.handleSortTasks('CREATED_AT', todoListId)}
          >
            <i className="far fa-plus-square" />
            <p>Creation date</p>
          </div>
        </div>
        { todoListId !== 1 && <hr /> }
        {
          todoListId !== 1
          && (
            <div className="banner-theme-settings">
              <p>Theme</p>
              {COLOR_SCHEME.map(item => (
                <button
                  type="button"
                  key={item}
                  className={`jumbotron-button ${bgColor === item ? 'active' : ''}`}
                  onClick={() => {
                    this.changeBannerColor(item, todoListId);
                  }}
                >
                  <span className={item} />
                </button>
              ))}
              <br />
              <br />
              {IMAGE_SCHEME.map(item => (
                <button
                  type="button"
                  key={item}
                  className={`jumbotron-button ${bgImage === item ? 'active' : ''}`}
                  onClick={() => this.changeBannerImage(item, todoListId)}
                >
                  <span className="bgImage-wrapper">
                    <img className="theme-image" src={item} alt="Theme Thumbnails for Banner" />
                  </span>
                </button>
              ))}
            </div>
          )
        }
        { todoListId !== 1 && <hr /> }
        {
          todoListId !== 1
          && (
            <div
              role="presentation"
              className="show-hide_completed_todos"
              onClick={() => {
                if (showCompleted) {
                  this.showCompletedTasks(false);
                } else {
                  this.showCompletedTasks(true);
                }
                showModal();
              }}
            >
              <i className={showCompleted ? 'far fa-check-circle' : 'fas fa-check-circle'} />
              <p>
                {showCompleted ? 'Hide' : 'Show'}
                {' '}
                completed to-dos
              </p>
            </div>
          )
        }
        { checkActiveTodoTitle(todoTitle)
        && (
          <div
            role="presentation"
            className="deleteList"
            onClick={() => {
              showModal();
              deleteList(activeTodo);
            }}
          >
            <i className="fas fa-trash-alt" />
            <p>Delete List</p>
          </div>
        )
        }
      </section>
    );
  }
}

ModalSettings.propTypes = {
  activeTodo: PropTypes.shape({}),
  deleteList: PropTypes.func,
  activateRename: PropTypes.func,
  showModal: PropTypes.func,
  taskSettings: PropTypes.shape({}),
  handleActivateTask: PropTypes.func,
  handleTypeNewTask: PropTypes.func,
  handleSortTask: PropTypes.func,
  handleChangeColor: PropTypes.func,
  handleChangeImage: PropTypes.func,
  handleFilterCompletedTasks: PropTypes.func,
};

ModalSettings.defaultProps = {
  activeTodo: {},
  deleteList: () => {},
  activateRename: () => {},
  showModal: () => {},
  taskSettings: {},
  handleActivateTask: () => {},
  handleTypeNewTask: () => {},
  handleSortTask: () => {},
  handleChangeColor: () => {},
  handleChangeImage: () => {},
  handleFilterCompletedTasks: () => {},
};
