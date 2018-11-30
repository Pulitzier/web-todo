import React from 'react';
import PropTypes from 'react-proptypes';
import {
  checkActiveTodoTitle,
  setInitialIconWhenRename,
} from '../../helpers';
import BasicButton from '../BaseComponents/BasicButton';
import BasicPanel from '../BaseComponents/BasicPanel';

const BannerTitle = ({
  todoTitle, todoIconSrc, activateIconsMenu, activateRename,
}) => (
  <BasicPanel>
    {
        todoIconSrc !== 'fa-list'
        && checkActiveTodoTitle(todoTitle)
        && (
        <BasicButton
          buttonClassName="banner-change-todo-icon"
          buttonOnClickAction={() => activateIconsMenu(true)}
          iconClassName={(`fa ${setInitialIconWhenRename(todoIconSrc)}`)}
        />
        )
      }
    <h3
      role="presentation"
      className={checkActiveTodoTitle(todoTitle) ? 'non-default-todo' : ''}
      onClick={() => activateRename(true)}
    >
      {todoTitle}
    </h3>
  </BasicPanel>
);

BannerTitle.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  todoIconSrc: PropTypes.string.isRequired,
  activateIconsMenu: PropTypes.func.isRequired,
  activateRename: PropTypes.func.isRequired,
};

export default BannerTitle;
