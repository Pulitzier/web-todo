export function addNewTodoList(title) {
  return {
    type: "ADD_NEW_TODO_LIST",
    title
  }
}

export function changeListTitle(todoId, title) {
  return {
    type: 'CHANGE_TODO_TITLE',
    todoId,
    title
  }
}

export function setIconForTodo(todoId, iconSrc) {
  return {
    type: 'SET_ICON_FOR_TODO',
    todoId,
    iconSrc
  }
}

export function deleteTodoList(todoId) {
  return {
    type: 'DELETE_TODO_LIST',
    todoId
  }
}

export function openSearchPanel(bool) {
  return {
    type: "ACTIVATE_SEARCH_PANEL",
    activate: bool,
  }
}

export function setShowFilter(bool) {
  return {
    type: "SET_SHOW_COMPLETED",
    show: bool,
  }
}

export function filterCompletedTasks(bool) {
  return {
    type: "SHOW_COMPLETED_FROM_BANNER",
    show: bool,
  }
}

export function chooseList(todoId) {
  return {
    type: "CHOOSE_LIST",
    todoId
  }
}

export function changeBannerBgColor(color, todoId) {
  return {
    type: 'CHANGE_BANNER_BG_COLOR',
    color,
    todoId
  }
}

export function changeBannerBgImage(image, todoId) {
  return {
    type: 'CHANGE_BANNER_BG_IMAGE',
    image,
    todoId
  }
}

export function activateTask(bool) {
  return {
    type: "ACTIVATE_NEW_TASK",
    activateNewTask: bool,
  }
}

export function activateTaskSettings(taskId, activate) {
  return {
    type: "ACTIVATE_TASK_SETTINGS",
    taskId,
    activate
  }
}

export function handleCollapseApp(bool) {
  return {
    type: "SET_COLLAPSE_APP",
    collapse: bool
  }
}

export function activateUserSettings(activate) {
  return {
    type: "ACTIVATE_USER_SETTINGS",
    activate
  }
}

export function openUserSettings(bool) {
  return {
    type: 'OPEN_USER_SETTINGS',
    open: bool,
  }
}

export function confirmBeforeDelete(confirmDelete) {
  return{
    type: 'CONFIRM_BEFORE_DELETE',
    confirmDelete
  }
}

export function turnCompletionSound(turn) {
  return {
    type: 'TURN_SOUND',
    turn
  }
}

export function handleSetDarkTheme() {
  return {
    type: 'SET_DARK_THEME',
    setDarkTheme: true
  }
}

export function handleSetLightTheme() {
  return {
    type: 'SET_LIGHT_THEME',
    setLightTheme: true
  }
}

export function typeNewTaskAction(bool) {
  return {
    type: "TYPE_NEW_TASK",
    typeNewTask: bool,
  }
}

export function addNewTaskToList(task, list) {
  return {
    type: 'ADD_NEW_TASK_TO_LIST',
    task,
    list
  }
}

export function handleTaskImportanance(taskId) {
  return {
    type: 'ADD_TASK_TO_IMPORTANT',
    taskId
  }
}

export function addTaskToMyDay(taskId, bool) {
  return {
    type: 'ADD_TASK_TO_MY_DAY',
    taskId,
    addToMyDay: bool
  }
}

export function addNoteToTask(taskId, note) {
  return {
    type: 'ADD_NOTE_TO_TASK',
    taskId,
    note
  }
}

export function deleteTask(taskId) {
  return {
    type: 'DELETE_TASK',
    taskId
  }
}

export function toggleTask(taskId) {
  return {
    type: 'TOGGLE_TASK',
    taskId
  }
}

export function sortTasks(sortCriteria, activeTodoId) {
  return {
    type: "SORT_TASKS",
    sort: sortCriteria,
    listId: activeTodoId
  }
}

export function revertTasks() {
  return {
    type: 'REVERT_TASKS',
  }
}

export function setRemindMeDate(taskId, date) {
  return {
    type: 'SET_REMIND_ME_DATE',
    taskId,
    date
  }
}

export function setDueDate(taskId, date) {
  return {
    type: 'SET_DUE_DATE',
    taskId,
    date
  }
}

export function setRepeat(taskId, repeatType) {
  return {
    type: 'SET_REPEAT',
    taskId,
    repeatType
  }
}

export function addStep(taskId, stepText) {
  return {
    type: 'ADD_STEP_TO_TASK',
    taskId,
    stepText
  }
}

export function toggleStep(stepId) {
  return {
    type: 'TOGGLE_STEP',
    stepId
  }
}

export function deleteStep(stepId) {
  return {
    type: 'DELETE_STEP',
    stepId
  }
}

export function clearSuggestedField() {
  return {
    type: 'DO_NOT_SUGGEST_TASK',
    suggestion: false
  }
}