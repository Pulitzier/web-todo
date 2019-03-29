import React from 'react';
import PropTypes from 'react-proptypes';
import {
  checkActiveTodo,
  setInitialIconWhenRename,
} from '../../helpers';
import BasicButton from '../BaseComponents/BasicButton';
import BasicPanel from '../BaseComponents/BasicPanel';

const BannerTitle = ({ activeTodoId, todoTitle, todoIconSrc, activateIconsMenu, activateRename, }) => (
  <BasicPanel>
    {
      todoIconSrc !== 'fa-list'
      && checkActiveTodo(activeTodoId)
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
      className={checkActiveTodo(activeTodoId) ? 'non-default-todo' : ''}
      onClick={() => activateRename(checkActiveTodo(activeTodoId))}
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
