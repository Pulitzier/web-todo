import React from 'react';

const BasicLabel = (props) => {
  let { labelClassName, labelOnClickAction, iconClassName } = props;
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