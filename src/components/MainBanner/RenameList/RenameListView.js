import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicButton from '../../BaseComponents/BasicButton';
import { setInitialIconWhenRename } from '../../../helpers';

export default class RenameListView extends Component {
  render() {
    const {
      title,
      iconSource,
      activateIconsMenu,
      newListTitle,
      handleInputKeyPress,
      handleChangeInput,
      shouldRenameList,
    } = this.props;

    return (
      <div className="rename-list-wrapper" >
        <BasicButton
          buttonClassName="change-todo-icon"
          buttonOnClickAction={() => activateIconsMenu(true)}
          iconClassName={`fa ${setInitialIconWhenRename(iconSource)}`}
        />
        <input
          className="rename-list"
          value={shouldRenameList ? newListTitle : title}
          onChange={event => handleChangeInput(event)}
          onKeyPress={event => handleInputKeyPress(event)}
          autoFocus
        />
      </div>
    );
  }
}

RenameListView.propTypes = {
  renameRef: PropTypes.func,
  title: PropTypes.string,
  iconSource: PropTypes.string,
  activateIconsMenu: PropTypes.func,
  newListTitle: PropTypes.string,
  handleInputKeyPress: PropTypes.func,
  handleChangeInput: PropTypes.func,
  shouldRenameList: PropTypes.bool,
};

RenameListView.defaultProps = {
  renameRef: () => {},
  title: '',
  iconSource: '',
  activateIconsMenu: () => {},
  newListTitle: '',
  handleInputKeyPress: () => {},
  handleChangeInput: () => {},
  shouldRenameList: false,
};
