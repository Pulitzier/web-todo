export function openSearchPanel(bool) {
  return {
    type: 'ACTIVATE_SEARCH_PANEL',
    activate: bool,
  };
}

export function setShowFilter(bool) {
  return {
    type: 'SET_SHOW_COMPLETED',
    show: bool,
  };
}

export function changeBannerBgImage(image, todoId) {
  return {
    type: 'CHANGE_BANNER_BG_IMAGE',
    image,
    todoId,
  };
}

export function activateTaskSettings(taskId, activate) {
  return {
    type: 'ACTIVATE_TASK_SETTINGS',
    taskId,
    activate,
  };
}

export function handleCollapseApp(bool) {
  return {
    type: 'SET_COLLAPSE_APP',
    collapse: bool,
  };
}

export function activateUserSettings(activate) {
  return {
    type: 'ACTIVATE_USER_SETTINGS',
    activate,
  };
}

export function changeBannerBgColor(color, todoId) {
  return {
    type: 'CHANGE_BANNER_BG_COLOR',
    color,
    todoId,
  };
}

export function openUserSettings(bool) {
  return {
    type: 'OPEN_USER_SETTINGS',
    open: bool,
  };
}

export function confirmBeforeDelete(confirmDelete) {
  return {
    type: 'CONFIRM_BEFORE_DELETE',
    confirmDelete,
  };
}

export function turnCompletionSound(turn) {
  return {
    type: 'TURN_SOUND',
    turn,
  };
}

export function handleSetDarkTheme() {
  return {
    type: 'SET_DARK_THEME',
    setDarkTheme: true,
  };
}

export function handleSetLightTheme() {
  return {
    type: 'SET_LIGHT_THEME',
    setLightTheme: true,
  };
}

export function setRemindMeDate(taskId, date) {
  return {
    type: 'SET_REMIND_ME_DATE',
    taskId,
    date,
  };
}

export function setDueDate(taskId, date) {
  return {
    type: 'SET_DUE_DATE',
    taskId,
    date,
  };
}

export function setRepeat(taskId, repeatType) {
  return {
    type: 'SET_REPEAT',
    taskId,
    repeatType,
  };
}

export function shouldShowGreetings(bool) {
  return {
    type: 'SHOULD_SHOW_GREETINGS',
    showGreeting: bool,
  };
}

export function updateTimestamp(time) {
  return {
    type: 'UPDATE_GREETING_TIMESTAMP',
    greetingTimestamp: time,
  };
}

export function clearSuggestedField() {
  return {
    type: 'DO_NOT_SUGGEST_TASK',
    suggestion: false,
  };
}
