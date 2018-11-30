import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import IconsMenuView from './IconsMenuView';

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
    const { activeTodoId, handleSetIcon } = this.props;
    if (this.iconMenu && this.iconMenu.contains(target)) {
      const { classList } = target;
      switch (target.localName) {
        case 'i':
          handleSetIcon(activeTodoId, classList[1]);
          return this.handleDeactivateIconMenu();
        default:
          handleSetIcon(activeTodoId, 'fa-list');
          return this.handleDeactivateIconMenu();
      }
    }
    return this.handleDeactivateIconMenu();
  }

  render() {
    return (
      <IconsMenuView iconsRef={(node) => { this.iconMenu = node; }} />
    );
  }
}

IconsMenuWrapper.propTypes = {
  activeTodoId: PropTypes.number,
  handleSetIcon: PropTypes.func,
  activateIconsMenu: PropTypes.func,
  activateRename: PropTypes.func,
};

IconsMenuWrapper.defaultProps = {
  activeTodoId: 0,
  handleSetIcon: () => {},
  activateIconsMenu: () => {},
  activateRename: () => {},
};
