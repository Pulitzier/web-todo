import React, { Component } from 'react';
import StatusBarPanel from "./StatusBarPanel";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import UserSettingsPanel from "./UserSettingsPanel";
import AudioForCompletion from "./AudioForCompletion";
import DeleteModal from "./DeleteModal";

export default class ExpandedApp extends Component {
  render() {
    let {
      handleCollapse,
      handleDeleteStep,
      handelDeleteTodo,
      handelDeleteTask,
      handleConfirm,
      handleDecline,
      customOptons: {
        collapseApp,
        confirmDeletion,
        turnOnSound,
        setDarkTheme,
        setLightTheme,
        taskToDelete,
        todoToDelete,
        taskStepToDelete
      }
    } = this.props;

    return (
      <div className={"expanded-app " + (
        setLightTheme ? 'light' :
          setDarkTheme ? 'dark' :
            undefined
      )}>
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
      </div>
    )
  }
};