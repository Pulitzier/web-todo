import React from 'react';
import BasicButton from './BasicButton';
import BasicPanel from "./BasicPanel";

const GreetingPopUp = (props) => {
  const {
    activeTask,
    bgColor,
    activateGreetingPanel,
    deactivateGreetingSuggestions,
    latestTasks = []
  } = props;

  const getCompletedTasks = (tasks) => {
    return tasks.filter((task) => task.done);
  };

  const getTimeOfLastTask = (tasks) => {
    let dateString;
    if(tasks.length !== 0) {
      if (tasks[tasks.length-1].dueDate) dateString = new Date(tasks[tasks.length-1].dueDate);
      if (tasks[tasks.length-1].createdAt) dateString = new Date(tasks[tasks.length-1].createdAt);
      return dateString.toDateString();
    }
  };

  const showGreetingsPanel = () => {
    deactivateGreetingSuggestions();
    activateGreetingPanel()
  };

  return (
    <BasicPanel
      className={"greeting-pop-up-wrapper " + (activeTask && 'responsive')}
      style={{backgroundColor: bgColor}}
    >
      <span>{getTimeOfLastTask(latestTasks)}</span>
      <BasicPanel className={"greeting-pop-up " + (activeTask && 'responsive')}>
        <p><span>{getCompletedTasks(latestTasks).length} of {latestTasks.length}</span></p>
        <BasicPanel className={"greeting-btn-group " + (activeTask && 'responsive')}>
          <BasicButton
            buttonClassName='greeting-not-now-btn btn-default'
            buttonOnClickAction={() => deactivateGreetingSuggestions()}
            buttonText='Not now'
          />
          <BasicButton
            buttonClassName='greeting-review-btn btn-primary'
            buttonOnClickAction={showGreetingsPanel}
            buttonText='Review'
          />
        </BasicPanel>
      </BasicPanel>
    </BasicPanel>
  )
};

export default GreetingPopUp