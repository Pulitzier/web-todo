export function getActiveTodoList(todos) {
  return todos.find(element => element.active);
}

export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return new Error(err.message);
  }
}

export function saveState(state) {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
  return undefined;
}

export function getTasksForTodo(tasks, todo) {
  const { todoListId: todoId } = todo;
  switch (todoId) {
    case 0:
      return tasks.filter(task => task.myDay);
    case 1:
      return tasks.filter(task => task.important);
    case 2:
      return tasks.filter(task => task.todoIsParent);
    default:
      return tasks.filter(task => task.parentId === todoId);
  }
}

export function getStringDate(date, options = { weekday: 'short', hour: 'numeric' }) {
  return (new Date(date)).toLocaleString('en-us', options);
}

export function checkActiveTodoTitle(title) {
  return (
    title !== 'My Day'
    && title !== 'Important'
    && title !== 'Tasks'
  );
}

export function getActiveTask(tasks) {
  return tasks.length !== 0 ? (tasks.find(task => task.active === true) || '') : '';
}

export function setInitialIconWhenRename(iconSource) {
  return iconSource === 'fa-list' ? 'fa-plus-circle' : iconSource;
}

export function playSoundWhenDone(taskDone, turnOnSound) {
  const audio = document.getElementById('soundOnComplete');
  if (turnOnSound && !taskDone) audio.play();
}
