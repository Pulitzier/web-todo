import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { setIconForTodo } from '../store/actions/actionCreators';
import IconsMenu from './IconsMenu';

export default class IconsMenuWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDeactivateIconMenu = this.handleDeactivateIconMenu.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleDeactivateIconMenu() {
    const { activateIconsMenu, activateRename } = this.props;
    activateIconsMenu(false);
    return activateRename(false);
  }

  handleClick({ target }) {
    const { store } = this.context;
    const { activeTodoId } = this.props;
    if (this.iconMenu && this.iconMenu.contains(target)) {
      switch (target.localName) {
        case 'i':
          const { classList } = target;
          store.dispatch(setIconForTodo(activeTodoId, classList[1]));
          return this.handleDeactivateIconMenu();
        default:
          store.dispatch(setIconForTodo(activeTodoId, 'fa-list'));
          return this.handleDeactivateIconMenu();
      }
    }
    return this.handleDeactivateIconMenu();
  }

  render() {
    return (
      <IconsMenu iconsRef={node => this.iconMenu = node} />
    );
  }
}

IconsMenuWrapper.contextTypes = {
  store: PropTypes.object,
};
