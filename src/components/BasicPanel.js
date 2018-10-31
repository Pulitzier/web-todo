import React from 'react';

const BasicPanel = (props) => {
  const { className, children, style={} } = props;
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