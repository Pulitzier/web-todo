import React from 'react';
import BasicButton from '../../BaseComponents/BasicButton';
import { setInitialIconWhenRename } from '../../../helpers';

const RenameListView = (props) => {
  const {
    renameRef,
    title,
    iconSource,
    activateIconsMenu,
    newListTitle,
    handleInputKeyPress,
    handleChangeInput,
    shouldRenameList,
  } = props;

  return (
    <div
      ref={node => renameRef(node)}
      className="rename-list-wrapper"
    >
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
};

export default RenameListView;
