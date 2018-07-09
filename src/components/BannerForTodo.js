import React, {Component} from 'react';
import PropTypes from 'react-proptypes';
import Button from './Button';
import {
  activateBannerSettings,
  changeBannerBgColor,
  changeBannerBgImage,
  activateTask, typeNewTaskAction
} from '../actionCreators';

export default class BannerForTodo extends Component {

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
    return (
      <div
        className={this.props.className}
        style={{backgroundColor: bannerForTodoState.backgroundColor}}
      >
        <img className={this.props.className+"-wrapper"} src={bannerForTodoState.currentBannerImage} alt="Theme Image" />
        <div className="panelBanner-text">
          {this.props.children}
        </div>
          <button className="btn btn-primary dots-menu" style={{backgroundColor: bannerForTodoState.backgroundColor}} onClick={() => openCloseSettings(true)}>
            <span>&bull;&bull;&bull;</span>
          </button>
        <div
          className={"jumbotron " + (bannerForTodoState.activateBannerSettings ? "active" : "inactive")}
        >
          <div className='sort-settings'>
            <img src='./assets/sort.svg' alt='Sort' />
            <p>Sort</p>
            <img src='./assets/play.svg' alt='Greater Than' />
          </div>
          <hr />
          <p>Theme</p>
          {defaultBannerSchemes.colorScheme.map(item =>
            <Button
              className={"jumbotron-button "+(bannerForTodoState.backgroundColor == item ? 'active' : null)}
              onClick={() => {
                changeBannerColor(item);
              }}
            >
              <span className={item}></span>
            </Button>
          )}
          <hr />
          {defaultBannerSchemes.imageScheme.map((item,index) => (
            <Button key={index} onClick={() => changeBannerImage(item)}>
              <img className="theme-image" src={item} alt="Theme Image" />
            </Button>
          ))}
          <hr />
          <div className="show-hide_completed_todos">
            <img src='./assets/check.svg' alt='Sort' />
            Hide completed to-dos
          </div>
        </div>
      </div>
    )
  }
};

BannerForTodo.contextTypes = {
  store: PropTypes.object
}