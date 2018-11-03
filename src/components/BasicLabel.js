import React from 'react';

const BasicLabel = ({ labelClassName, labelOnClickAction, iconClassName }) => {

  return (
    <label
      className={labelClassName}
      onClick={labelOnClickAction}
    >
      <i className={iconClassName}></i>
    </label>
  )
};

export default BasicLabel;