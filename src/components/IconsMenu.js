import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { setIconForTodo } from '../actionCreators';

export default class IconsMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  };

  handleClick(event) {
    const { store } = this.context;
    let { activateIcon, activeTodoId } = this.props;
    let { target } = event;
    if(this.iconMenu && this.iconMenu.contains(target)){
      let { src: iconSrc } = target;
      store.dispatch(setIconForTodo(activeTodoId, ("." + iconSrc.slice(21))));
      return activateIcon(false);
    }
    return activateIcon(false);
  };

  render() {
    return (
      <div className="icons-menu-wrapper" ref={node => this.iconMenu = node}>
        <div className="icons-menu">
          <img src='./assets/sort.svg' alt='Sort' />
          <img src='./assets/home.svg' alt='Sort'  />
          <img src='./assets/icon.svg' alt='Sort' />
          <img src='./assets/repeat.svg' alt='Sort' />
          <img src='./assets/garbage.svg' alt='Sort' />
          <img src='./assets/star.svg' alt='Sort' />
          <img src='./assets/sun.svg' alt='Sort' />
          <img src='./assets/play.svg' alt='Greater Than' />
          <img src="./assets/check.svg" alt='Check mark' />
          <img src="./assets/graphic-design.svg" alt='Design' />
          <img src='./assets/toggle.svg' alt='Sort' />
          <img src='./assets/star-fill.svg' alt='Sort' />
          <img src="./assets/calendar.svg" alt='Graphics' />
          <img src="./assets/exchange-arrows.svg" alt='Exchange' />
        </div>
      </div>
    )
  }
};

IconsMenu.contextTypes = {
  store: PropTypes.object
};