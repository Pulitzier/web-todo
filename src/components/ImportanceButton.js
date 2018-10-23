import React from 'react';
import BasicIconButton from './BasicIconButton';

const ImportanceButton = (props) => {
  let { task: { id, important }, setImportance } = props;

  const handleButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setImportance(id);
  };

  return (
    <BasicIconButton
      buttonClassName="important-icon"
      buttonOnClickAction={(event) => handleButtonClick(event)}
      iconClassName={(important ? "fas fa-star" : "far fa-star")}
    />
  )
};

export default ImportanceButton;