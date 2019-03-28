import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import BasicButton from '../../BaseComponents/BasicButton';
import { setInitialIconWhenRename } from '../../../helpers';

export default class RenameList extends Component {
  constructor(props) {
    super(props);
    const { todoTitle } = props;
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    this.state = {
      newListTitle: todoTitle,
    };
  }

  handleChangeInput({ target: { value } }) {
    this.setState({ newListTitle: value });
  }

  handleInputKeyPress({ key }) {
    const { activateRename, handleChangeListTitle } = this.props;
    const { newListTitle } = this.state;
    if (key === 'Enter') {
      activateRename(false);
      handleChangeListTitle(newListTitle);
    }
  }

  render() {
    const { title, iconSource , activateIconsMenu, shouldRenameList } = this.props;
    const { newListTitle } = this.state;

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
          onChange={this.handleChangeInput}
          onKeyPress={this.handleInputKeyPress}
          autoFocus
        />
      </div>
    );
  }
}

RenameList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  todoTitle: PropTypes.string,
  activateRename: PropTypes.func,
  shouldRenameList: PropTypes.bool,
  activateIconsMenu: PropTypes.func,
  handleChangeTitle: PropTypes.func,
};

RenameList.defaultProps = {
  categories: [],
  todoTitle: '',
  activateRename: () => {},
  shouldRenameList: false,
  activateIconsMenu: () => {},
  handleChangeTitle: () => {},
};
