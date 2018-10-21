import React from 'react';

const EmptyTaskWrapper = ({numberOfTasks}) => {
  let emptyWrappers = [];
  for (let i=0; i<(8-numberOfTasks); i++) {
    emptyWrappers.push(<div key={i} className="todo"></div>)
  }
  return emptyWrappers;
};

export default EmptyTaskWrapper;