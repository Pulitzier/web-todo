import React from 'react';

const BasicPanel = ({ className, children, style = {} }) => (
  <div
    className={className}
    style={style}
  >
    {children}
  </div>
);

export default BasicPanel;
