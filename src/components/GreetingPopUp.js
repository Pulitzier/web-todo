import React from 'react';
import BasicButton from './BasicButton';
import BasicPanel from "./BasicPanel";

const GreetingPopUp = (props) => {
  let { activeTask, bgColor, latestTasks = [] } = props;
  const getCompletedTasks = (tasks) => {
    return tasks.filter((task) => task.done);
  };

  return (
    <BasicPanel
      className="greeting-pop-up-wrapper"
      style={{backgroundColor: bgColor}}
    >
      <span></span>
      <BasicPanel>
        <p><span>{getCompletedTasks(latestTasks).length} of {latestTasks.length}</span></p>
        <BasicPanel className={"greeting-btn-group " + (activeTask && 'responsive')}>
          <BasicButton
            buttonClassName='greeting-not-now-btn btn-default'
            buttonText='Not now'
          />
          <BasicButton
            buttonClassName='greeting-review-btn btn-primary'
            buttonText='Review'
          />
        </BasicPanel>
      </BasicPanel>
    </BasicPanel>
  )
};

export default GreetingPopUp