import React from 'react';

const EmptyTaskWrapper = ({ numberOfEmptyTasks }) => {
  const emptyWrappers = [];
  for (let i = 0; i < (8 - numberOfEmptyTasks); i++) {
    emptyWrappers.push(<div key={i} className="todo" />);
  }
  return emptyWrappers;
};

export default EmptyTaskWrapper;
