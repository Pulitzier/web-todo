import React from 'react';
import {
  checkActiveTodoTitle,
  setInitialIconWhenRename,
} from '../helpers';
import BasicButton from './BaseComponents/BasicButton';
import BasicPanel from './BaseComponents/BasicPanel';

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
      className={checkActiveTodoTitle(todoTitle) ? 'non-default-todo' : ''}
      onClick={() => activateRename(true)}
    >
      {todoTitle}
    </h3>
  </BasicPanel>
);

export default BannerTitle;
