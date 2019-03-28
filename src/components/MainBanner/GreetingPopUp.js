import React from 'react';
import PropTypes from 'react-proptypes';
import BasicButton from '../BaseComponents/BasicButton';
import BasicPanel from '../BaseComponents/BasicPanel';

const GreetingPopUp = (props) => {
  const {
    activeTask,
    activateGreetingPanel,
    deactivateGreetingSuggestions,
    latestTasks = [],
  } = props;

  const getCompletedTasks = tasks => tasks.filter(task => task.done);

  const getTimeOfLastTask = (tasks) => {
    let dateString;
    if (tasks.length !== 0) {
      if (tasks[tasks.length - 1].dueDate) {
        dateString = new Date(tasks[tasks.length - 1].dueDate);
      }
      if (tasks[tasks.length - 1].createdAt) {
        dateString = new Date(tasks[tasks.length - 1].createdAt);
      }
      return dateString.toDateString();
    }
    return undefined;
  };

  const showGreetingsPanel = () => {
    deactivateGreetingSuggestions();
    activateGreetingPanel();
  };

  return (
    <BasicPanel className={`greeting-pop-up-wrapper ${activeTask.active ? 'responsive' : ''}`} >
      <BasicPanel className={`greeting-pop-up ${activeTask.active ? 'responsive' : ''}`}>
        <p>{getTimeOfLastTask(latestTasks)}</p>
        <p className="greeting-tasks">
          {getCompletedTasks(latestTasks).length}
          {' '}
          of
          {' '}
          {latestTasks.length}
          {' '}
          completed
        </p>
      </BasicPanel>
      <BasicPanel className={`greeting-btn-group ${activeTask.active ? 'responsive' : ''}`}>
        <BasicButton
          buttonClassName="greeting-not-now-btn btn-default"
          buttonOnClickAction={() => deactivateGreetingSuggestions()}
          buttonText="Not now"
        />
        <BasicButton
          buttonClassName="greeting-review-btn btn-primary"
          buttonOnClickAction={showGreetingsPanel}
          buttonText="Review"
        />
      </BasicPanel>
    </BasicPanel>
  );
};

GreetingPopUp.propTypes = {
  activeTask: PropTypes.shape({}),
  activateGreetingPanel: PropTypes.func,
  deactivateGreetingSuggestions: PropTypes.func,
  latestTasks: PropTypes.arrayOf(PropTypes.shape({})),
};

GreetingPopUp.defaultProps = {
  activeTask: {},
  activateGreetingPanel: () => {},
  deactivateGreetingSuggestions: () => {},
  latestTasks: [],
};

export default GreetingPopUp;
