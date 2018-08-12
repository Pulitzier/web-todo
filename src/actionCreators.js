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

export function activateBannerSettings(bool) {
  return {
    type: "ACTIVATE_BANNER_PANEL",
    activate: bool,
  }
}

export function chooseList(element, todosListName) {
  return {
    type: "CHOOSE_LIST",
    todosListName,
    element
  }
}

export function activateNewList(bool) {
  return{
    type: 'ACTIVATE_NEW_LIST',
    activateNewList: bool
  }
}

export function setNewListTitle(title) {
  return {
    type: 'SET_NEW_LIST_TITLE',
    title
  }
}

export function changeBannerBgColor(color) {
  return {
    type: 'CHANGE_BANNER_BG_COLOR',
    color: color
  }
}

export function changeBannerBgImage(image) {
  return {
    type: 'CHANGE_BANNER_BG_IMAGE',
    image
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

export function addTaskToTodo(tasks) {
  return {
    type: 'ADD_TASK_TO_TODO',
    tasks
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