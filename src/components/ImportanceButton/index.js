import React from 'react';
import BasicButton from '../BaseComponents/BasicButton';

const ImportanceButton = (props) => {
  const { task: { id, important }, setImportance } = props;

  const handleButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setImportance(id);
  };

  return (
    <BasicButton
      buttonClassName="important-icon"
      buttonOnClickAction={event => handleButtonClick(event)}
      iconClassName={(important ? 'fas fa-star' : 'far fa-star')}
    />
  );
};

export default ImportanceButton;
