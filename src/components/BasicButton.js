import React from 'react';

const BasicButton = (props) => {
  let { buttonClassName, buttonOnClickAction, buttonText, iconClassName, buttonStyle } = props;

  const renderButtonChild = (text) => {
    if (text) return <span>{text}</span>;
    return <i className={iconClassName}></i>
  };

  return(
    <button
      className={buttonClassName}
      onClick={buttonOnClickAction}
      style={buttonStyle}
    >
      {renderButtonChild(buttonText)}
    </button>
  )
};

export default BasicButton;