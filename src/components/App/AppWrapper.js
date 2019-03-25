import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import '../../styles/index.css';
import LeftPanel from '../LeftPanel/index';
import RightPanel from '../RightPanel/index';
import UserSettingsPanel from '../UserSettingsPanel/index';
import AudioForCompletion from './AudioForCompletion';
import DeleteModal from './DeleteModal';
import BasicPanel from '../BaseComponents/BasicPanel';
import { activateUserSettings, openSearchPanel, openUserSettings } from '../../store/actions';

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
    this.clickOnUserSettings = this.clickOnUserSettings.bind(this);
    this.state = {
      elementId: '',
      elementText: '',
      elementTypeToDelete: '',
    };
  }

  clearLocalAppState() {
    this.setState({
      elementId: '',
      elementText: '',
      elementTypeToDelete: ''
    });
  }

  handleDeleteTask(element) {
    const { deleteElement } = this.props;
    const { userSettings: { confirmDeletion } } = this.props;
    if (confirmDeletion) {
      this.setState({
        elementId: element.id,
        elementText: element.taskText,
        elementTypeToDelete: 'task',
      });
    } else {
      deleteElement('task', element.id);
    }
  }

  handleDeleteCategory(element) {
    const { deleteElement } = this.props;
    const { userSettings: { confirmDeletion } } = this.props;
    if (confirmDeletion) {
      this.setState({
        elementId: element.id,
        elementText: element.title,
        elementTypeToDelete: 'todo',
      });
    } else {
      deleteElement('todo', element.id);
    }
  }

  handleDeleteStep(element) {
    const { deleteElement } = this.props;
    const { userSettings: { confirmDeletion } } = this.props;
    if (confirmDeletion) {
      this.setState({
        elementId: element.id,
        elementText: element.stepText,
        elementTypeToDelete: 'step',
      });
    } else {
      deleteElement('step', element.id);
    }
  }

  handleConfirm(elementId) {
    const { deleteElement } = this.props;
    const { elementTypeToDelete } = this.state;
    deleteElement(elementTypeToDelete, elementId);
    this.clearLocalAppState();
  }

  handleDecline() {
    return this.clearLocalAppState();
  }

  clickOnUserSettings({ target }){
    const { handleCollapseSettings } = this.props;
    const userInfo = document.getElementById("userInfoButtons");
    if (!userInfo.contains(target)) {
      return handleCollapseSettings();
    }
    return null;
  }

  renderDeleteModal() {
    const { elementId, elementTypeToDelete, elementText } = this.state;
    return (
      <DeleteModal
        nameOfItem={elementTypeToDelete}
        messageOfItem={elementText}
        onDelete={() => this.handleConfirm(elementId)}
        onCancel={this.handleDecline}
      />
    )
  }

  render() {
    const {
      userSettings: {
        confirmDeletion, turnOnSound, darkTheme, lightTheme,
      },
    } = this.props;
    const { elementTypeToDelete } = this.state;

    return (
      <BasicPanel
        className={`app-container ${lightTheme ? 'light' : darkTheme && 'dark'}`}
        propsClick={(event) => this.clickOnUserSettings(event)}
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
          && elementTypeToDelete
          && this.renderDeleteModal()
        }
      </BasicPanel>
    );
  }
}

AppWrapper.propTypes = {
  userSettings: PropTypes.shape({}),
  deleteElement: PropTypes.func.isRequired,
};

AppWrapper.defaultProps = {
  userSettings: {},
};
