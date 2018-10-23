import React from 'react';

const EmptyTaskWrapper = ({numberOfEmptyTasks}) => {
  let emptyWrappers = [];
  for (let i=0; i<(8-numberOfEmptyTasks); i++) {
    emptyWrappers.push(<div key={i} className="todo"></div>)
  }
  return emptyWrappers;
};

export default EmptyTaskWrapper;