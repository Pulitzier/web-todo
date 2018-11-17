export function addNewTodoList(title) {
  return {
    type: 'ADD_NEW_TODO_LIST',
    title,
  };
}

export function deleteTodoList(todoId) {
  return {
    type: 'DELETE_TODO_LIST',
    todoId,
  };
}

export function activateTask(bool) {
  return {
    type: 'ACTIVATE_NEW_TASK',
    activateNewTask: bool,
  };
}

export function chooseList(todoId) {
  return {
    type: 'CHOOSE_LIST',
    todoId,
  };
}

export function changeListTitle(todoId, title) {
  return {
    type: 'CHANGE_TODO_TITLE',
    todoId,
    title,
  };
}

export function setIconForTodo(todoId, iconSrc) {
  return {
    type: 'SET_ICON_FOR_TODO',
    todoId,
    iconSrc,
  };
}

export function filterCompletedTasks(bool) {
  return {
    type: 'SHOW_COMPLETED_FROM_BANNER',
    show: bool,
  };
}

export function typeNewTaskAction(bool) {
  return {
    type: 'TYPE_NEW_TASK',
    typeNewTask: bool,
  };
}

export function addNewTaskToList(task, list) {
  return {
    type: 'ADD_NEW_TASK_TO_LIST',
    task,
    list,
  };
}

export function handleTaskImportanance(taskId) {
  return {
    type: 'ADD_TASK_TO_IMPORTANT',
    taskId,
  };
}

export function addTaskToMyDay(taskId, bool) {
  return {
    type: 'ADD_TASK_TO_MY_DAY',
    taskId,
    addToMyDay: bool,
  };
}

export function addNoteToTask(taskId, note) {
  return {
    type: 'ADD_NOTE_TO_TASK',
    taskId,
    note,
  };
}

export function deleteTask(taskId) {
  return {
    type: 'DELETE_TASK',
    taskId,
  };
}

export function toggleTask(taskId) {
  return {
    type: 'TOGGLE_TASK',
    taskId,
  };
}

export function sortTasks(sortCriteria, activeTodoId) {
  return {
    type: 'SORT_TASKS',
    sort: sortCriteria,
    listId: activeTodoId,
  };
}

export function revertTasks() {
  return {
    type: 'REVERT_TASKS',
  };
}

export function addStep(taskId, stepText) {
  return {
    type: 'ADD_STEP_TO_TASK',
    taskId,
    stepText,
  };
}

export function toggleStep(stepId) {
  return {
    type: 'TOGGLE_STEP',
    stepId,
  };
}

export function deleteStep(stepId) {
  return {
    type: 'DELETE_STEP',
    stepId,
  };
}
