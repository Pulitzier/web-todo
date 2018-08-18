export function getActiveTodoList(todos) {
  let activeArray;
  for (let key in todos) {
    activeArray = todos[key].find(element => element.active);
    if (activeArray) {
      return activeArray
    }
  }
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
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState)
  } catch(err) {
    return new Error(err.message);
  }
}

export function getTasksForTodo(tasks, todo) {
  let { todoListId: todoId } = todo;
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

export function closeBannerSettings() {
  document.getElementById('bannerSettings').classList.remove('show');
  document.getElementById('bannerSettings').style.setProperty('display', 'none');
  document.getElementsByTagName('body')[0].classList.remove('modal-open');
  let modalBackDrop = document.getElementsByClassName('modal-backdrop')[0];
  modalBackDrop.parentNode.removeChild(modalBackDrop);
}

export function getStringDate(date, options = {weekday: 'short', hour: 'numeric'}) {
  return (new Date(date)).toLocaleString('en-us', options);
}