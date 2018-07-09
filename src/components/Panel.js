import React, {Component} from 'react';

const Panel = (props) => {
    return (
      <div className={props.className}>{props.children}</div>
    )
};

export default Panel;