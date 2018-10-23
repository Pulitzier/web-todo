import React from 'react';

const BasicPanel = (props) => {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  )
};

export default BasicPanel;