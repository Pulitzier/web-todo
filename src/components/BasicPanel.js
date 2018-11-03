import React from 'react';

const BasicPanel = ({ className, children, style={} }) => {

  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  )
};

export default BasicPanel;