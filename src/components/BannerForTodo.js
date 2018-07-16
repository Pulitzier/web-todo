import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import {
  activateBannerSettings,
  changeBannerBgColor,
  changeBannerBgImage,
  activateTask,
  typeNewTaskAction,
  sortTasks
} from '../actionCreators';

export default class BannerForTodo extends Component {
  constructor(props) {
    super(props);
    this.sortState = {
      handleHoverSortLink: false,
      handleHoverSortMenu: false,
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
    const { bannerForTodoState } = state;
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

    const openCloseSettings = () => {
      this.discardNewTask();
      store.dispatch(activateBannerSettings(!bannerForTodoState.activateBannerSettings));
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
      store.dispatch(sortTasks(sortCriteria, this.props.activeTodoId));
    };
    return (
      <div
        className={this.props.className}
        style={{backgroundColor: bannerForTodoState.backgroundColor}}
      >
        <img className={this.props.className+"-wrapper"} src={bannerForTodoState.currentBannerImage} alt="Theme Image" />
        <div className="panelBanner-text">
          {this.props.children}
        </div>
          <button
            className="btn btn-primary dots-menu"
            style={{backgroundColor: bannerForTodoState.backgroundColor}}
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
                <div
                  className={'sort-settings-link ' +
                  (
                    this.sortState.handleHoverSortMenu ?
                    "grey" :
                    ''
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
                    this.sortState.handleHoverSortLink ||
                    this.sortState.handleHoverSortMenu ?
                      "active" : ''
                  )}
                  onMouseEnter={() =>
                    this.setState(() =>
                      this.sortState = {
                        ...this.sortState,
                        handleHoverSortMenu: true
                      }
                    )
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
                  {defaultBannerSchemes.colorScheme.map(item =>
                    <button
                      className={"jumbotron-button "+(bannerForTodoState.backgroundColor == item ? 'active' : null)}
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
                <div className="show-hide_completed_todos">
                  <img src='./assets/check.svg' alt='Sort' />
                  Hide completed to-dos
                </div>
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