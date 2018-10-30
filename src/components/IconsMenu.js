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
    const { activateIcon, activeTodoId } = this.props;
    let { target } = event;
    if(this.iconMenu && this.iconMenu.contains(target)){
      if (target.localName === 'i') {
        let { classList } = target;
        store.dispatch(setIconForTodo(activeTodoId, classList[1]));
        return activateIcon(false);
      }
      store.dispatch(setIconForTodo(activeTodoId, 'fa fa-plus-circle'));
      return activateIcon(false);
    }
    return activateIcon(false);
  };

  render() {
    return (
      <div className="icons-menu-wrapper" ref={node => this.iconMenu = node}>
        <div className="icons-menu">
          <i className="fa fa-sort-amount-down"></i>
          <i className="fa fa-home"></i>
          <i className="fa fa-calendar-alt"></i>
          <i className="fa fa-archive"></i>
          <i className="fa fa-wrench"></i>
          <i className="fa fa-plane"></i>
          <i className="fa fa-magic"></i>
          <i className="fa fa-address-book"></i>
          <i className="fa fa-award"></i>
          <i className="fa fa-balance-scale"></i>
          <i className="fa fa-book"></i>
          <i className="fa fa-cogs"></i>
          <i className="fa fa-comment-dollar"></i>
          <i className="fa fa-cookie-bite"></i>
          <i className="fa fa-bug"></i>
        </div>
        <div className="clear-icon">
          <p>Clear</p>
        </div>
      </div>
    )
  }
};

IconsMenu.contextTypes = {
  store: PropTypes.object
};