import React from 'react';
import BasicButton from "./BasicButton";
import { setInitialIconWhenRename } from "../helpers";

const RenameList = (props) => {
  const {
    renameRef,
    title,
    iconSource,
    activateIconsMenu,
    newListTitle,
    handleInputKeyPress,
    handleChangeInput,
    shouldRenameList
  } = props;

  return (
    <div
      ref={node => renameRef(node)}
      className="rename-list-wrapper"
    >
      <BasicButton
        buttonClassName="change-todo-icon"
        buttonOnClickAction={() => activateIconsMenu(true)}
        iconClassName={"fa " + setInitialIconWhenRename(iconSource)}
      />
      <input
        className="rename-list"
        value={ shouldRenameList ? newListTitle : title }
        onChange={(event) => handleChangeInput(event)}
        onKeyPress={(event) => handleInputKeyPress(event)}
        autoFocus={true}
      />
    </div>
  );
};

export default RenameList