import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import '../../styles/index.css';
import LeftPanel from '../LeftPanel/index';
import RightPanel from '../RightPanel/index';
import UserSettingsPanel from '../UserSettingsPanel/index';
import AudioForCompletion from './AudioForCompletion';
import DeleteModal from './DeleteModal';
import BasicPanel from '../BaseComponents/BasicPanel';

export default class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.clearLocalAppState = this.clearLocalAppState.bind(this);
    this.handleDeleteStep = this.handleDeleteStep.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.renderDeleteModal = this.renderDeleteModal.bind(this);
    this.state = {
      taskToDelete: '',
      todoToDelete: '',
      taskStepToDelete: '',
    };
  }

  clearLocalAppState() {
    this.setState({
      taskToDelete: '',
      todoToDelete: '',
      taskStepToDelete: '',
    });
  }

  handleDeleteTask(element) {
    const { deleteTaskElement } = this.props;
    const { userSettings: { confirmDeletion } } = this.props;
    if (confirmDeletion) {
      this.setState({ taskToDelete: element });
    } else {
      deleteTaskElement(element.id);
    }
  }

  handleDeleteCategory(element) {
    const { deleteCategoryElement } = this.props;
    const { userSettings: { confirmDeletion } } = this.props;
    if (confirmDeletion) {
      this.setState({ todoToDelete: element });
    } else {
      deleteCategoryElement(element.todoListId);
    }
  }

  handleDeleteStep(element) {
    const { deleteStepElement } = this.props;
    const { userSettings: { confirmDeletion } } = this.props;
    if (confirmDeletion) {
      this.setState({ taskStepToDelete: element });
    } else {
      deleteStepElement(element.stepId);
    }
  }

  handleConfirm(element) {
    const {
      deleteStepElement,
      deleteCategoryElement,
      deleteTaskElement,
    } = this.props;
    const { taskToDelete, todoToDelete, taskStepToDelete } = this.state;
    if (taskToDelete) {
      deleteTaskElement(element.id);
    } else if (todoToDelete) {
      deleteCategoryElement(element.todoListId);
    } else if (taskStepToDelete) {
      deleteStepElement(element.stepId);
    }
    this.clearLocalAppState();
  }

  handleDecline() {
    return this.clearLocalAppState();
  }

  renderDeleteModal(element) {
    const elementText = element.title || element.taskText || element.stepText || '';
    const elementType = element.title ? 'todo' : element.taskText ? 'task' : element.stepText ? 'step' : '';
    if (element) {
      return (
        <DeleteModal
          nameOfItem={elementType}
          messageOfItem={elementText}
          onDelete={() => this.handleConfirm(element)}
          onCancel={this.handleDecline}
        />
      );
    }
  }

  render() {
    const {
      userSettings: {
        confirmDeletion, turnOnSound, darkTheme, lightTheme,
      },
    } = this.props;
    const { taskToDelete, todoToDelete, taskStepToDelete } = this.state;
    const elementToDelete = taskToDelete || todoToDelete || taskStepToDelete;

    return (
      <BasicPanel
        className={`app-container ${lightTheme ? 'light' : darkTheme && 'dark'}`}
      >
        <LeftPanel />
        <RightPanel
          deleteTask={this.handleDeleteTask}
          deleteTodo={this.handleDeleteCategory}
          deleteStep={this.handleDeleteStep}
        />
        <UserSettingsPanel />
        {
          turnOnSound && <AudioForCompletion />
        }
        {
          confirmDeletion
          && this.renderDeleteModal(elementToDelete)
        }
      </BasicPanel>
    );
  }
}

AppWrapper.propTypes = {
  userSettings: PropTypes.shape({}),
  deleteTaskElement: PropTypes.func.isRequired,
  deleteCategoryElement: PropTypes.func.isRequired,
  deleteStepElement: PropTypes.func.isRequired,
};

AppWrapper.defaultProps = {
  userSettings: {},
};
