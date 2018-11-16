import React from 'react';

const BasicLabel = ({ labelClassName, labelOnClickAction, iconClassName }) => (
  <label
    className={labelClassName}
    onClick={labelOnClickAction}
  >
    <i className={iconClassName} />
  </label>
);

export default BasicLabel;
