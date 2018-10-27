import React from 'react';
import BasicButton from './BasicButton';

const GreetingPopUp = (props) => {
  let { latestTasks = [] } = props;
  const getCompletedTasks = (tasks) => {
    if (tasks.length) return tasks.filter((task) => task.done);
    return tasks;
  };
  return (
    <div className="greeting-pop-up-wrapper">
      <span></span>
      <div>
        <p><span>{getCompletedTasks(latestTasks).length} of {latestTasks.length}</span></p>
        <BasicButton />
      </div>
    </div>
  )
};

export default GreetingPopUp