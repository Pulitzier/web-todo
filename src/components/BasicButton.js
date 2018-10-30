import React from 'react';

const BasicButton = (props) => {
  const {
    buttonClassName = '',
    buttonOnClickAction = (() => {}),
    buttonText = '',
    iconClassName = '',
    buttonStyle = {},
    disabled = false
  } = props;

  const renderButtonChild = (text) => {
    if (text) return <span>{text}</span>;
    return <i className={iconClassName}></i>
  };

  return(
    <button
      className={buttonClassName}
      onClick={buttonOnClickAction}
      style={buttonStyle}
      disabled={disabled}
    >
      {renderButtonChild(buttonText)}
    </button>
  )
};

export default BasicButton;