import React from 'react';

const EmptyTasks = ({ numberOfTasks }) => {
  const emptyWrappers = [];
  for (let i = 0; i < (8 - numberOfTasks); i++) {
    emptyWrappers.push(<div key={i} className="todo empty" />);
  }
  return emptyWrappers;
};

export default EmptyTasks;
