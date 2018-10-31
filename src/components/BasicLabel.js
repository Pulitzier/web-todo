import React from 'react';

const BasicLabel = (props) => {
  const { labelClassName, labelOnClickAction, iconClassName } = props;
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