import {
  DEFAULT_SEARCH,
  DEFAULT_TASK_SETTINGS,
  DEFAULT_USER_SETTINGS,
} from '../constants/index';

export function setSearchState(state = DEFAULT_SEARCH, action) {
  switch (action.type) {
    case 'ACTIVATE_SEARCH_PANEL':
      return {
        ...state,
        activateSearch: action.activate,
      };
    case 'SET_SHOW_COMPLETED':
      return {
        ...state,
        showCompleted: action.show,
      };
    default:
      return state;
  }
}

export function setTaskSettings(state = DEFAULT_TASK_SETTINGS, action) {
  switch (action.type) {
    case 'ACTIVATE_NEW_TASK':
      return {
        ...state,
        activateNewTask: action.activateNewTask,
      };
    case 'TYPE_NEW_TASK':
      return {
        ...state,
        typeNewTask: action.typeNewTask,
      };
    case 'SHOW_COMPLETED_FROM_BANNER':
      return {
        ...state,
        showCompleted: action.show,
      };
    case 'SHOULD_SHOW_GREETINGS':
      return {
        ...state,
        showGreetingPopup: action.showGreeting,
      };
    case 'UPDATE_GREETING_TIMESTAMP':
      return {
        ...state,
        greetingTimestamp: action.greetingTimestamp,
      };
    default:
      return state;
  }
}

export function handleUserSettings(state = DEFAULT_USER_SETTINGS, action) {
  switch (action.type) {
    case 'ACTIVATE_USER_SETTINGS':
      return {
        ...state,
        activateSettings: action.activate,
      };
    case 'OPEN_USER_SETTINGS':
      return {
        ...state,
        openSettings: action.open,
      };
    case 'CONFIRM_BEFORE_DELETE':
      return {
        ...state,
        confirmDeletion: action.confirmDelete,
      };
    case 'TURN_SOUND':
      return {
        ...state,
        turnOnSound: action.turn,
      };
    case 'SET_DARK_THEME':
      return {
        ...state,
        setDarkTheme: action.setDarkTheme,
        setLightTheme: !action.setDarkTheme,
      };
    case 'SET_LIGHT_THEME':
      return {
        ...state,
        setDarkTheme: !action.setLightTheme,
        setLightTheme: action.setLightTheme,
      };
    default:
      return state;
  }
}
