import React from 'react';
import PropTypes from 'react-proptypes';
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

ImportanceButton.propTypes = {
  task: PropTypes.shape({}).isRequired,
  setImportance: PropTypes.func.isRequired,
};

export default ImportanceButton;
