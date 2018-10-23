import React from 'react';

const BasicIconButton = (props) => {
  let { buttonClassName, buttonOnClickAction, iconClassName, buttonStyle } = props;

  return(
    <button
      className={buttonClassName}
      onClick={buttonOnClickAction}
      style={buttonStyle}
    >
      <i className={iconClassName}></i>
    </button>
  )
};

export default BasicIconButton;