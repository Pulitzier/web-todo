import React from 'react';
import StatusBarPanel from "./StatusBarPanel";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import UserSettingsPanel from "./UserSettingsPanel";
import AudioForCompletion from "./AudioForCompletion";
import DeleteModal from "./DeleteModal";
import BasicPanel from "./BasicPanel";

const ExpandedApp = (props) => {
  let {
    handleCollapse,
    handleDeleteStep,
    handelDeleteTodo,
    handelDeleteTask,
    handleConfirm,
    handleDecline,
    customOptions: {
      collapseApp,
      confirmDeletion,
      turnOnSound,
      setDarkTheme,
      setLightTheme,
      taskToDelete,
      todoToDelete,
      taskStepToDelete
    }
  } = props;

  const setOpacity = (expandApp) => {
    if (expandApp) return {
      opacity: 1,
      top: 0,
      transition: 'all 0.5s ease'
    };
    return {
      opacity: 0,
      width: 250,
      height: 30,
      margin: 0,
      top: 2000,
      transition: 'all 0.5s ease'
    }
  };

  return (
    <BasicPanel
      className={"expanded-app " + ( setLightTheme ? 'light' : setDarkTheme && 'dark' )}
      style={setOpacity(!collapseApp)}
    >
      <StatusBarPanel
        collapseApp={collapseApp}
        handleCollapseApp={(bool) => handleCollapse(bool)}
      />
      <LeftPanel />
      <RightPanel
        deleteTask={(element) => handelDeleteTask(element)}
        deleteTodo={(element) => handelDeleteTodo(element)}
        deleteStep={(element) => handleDeleteStep(element)}
      />
      <UserSettingsPanel />
      {
        turnOnSound && <AudioForCompletion />
      }
      {
        (confirmDeletion && taskToDelete) &&
        <DeleteModal
          nameOfItem="task"
          messageOfItem={taskToDelete.taskText}
          onDelete={handleConfirm(taskToDelete)}
          onCancel={handleDecline()}
        />
      }
      {
        (confirmDeletion && todoToDelete) &&
        <DeleteModal
          nameOfItem="todo"
          messageOfItem={todoToDelete.title}
          onDelete={handleConfirm(todoToDelete)}
          onCancel={handleDecline()}
        />
      }
      {
        (confirmDeletion && taskStepToDelete) &&
        <DeleteModal
          nameOfItem="step"
          messageOfItem={taskStepToDelete.stepText}
          onDelete={handleConfirm(taskStepToDelete)}
          onCancel={handleDecline()}
        />
      }
    </BasicPanel>
  )
};

export default ExpandedApp;