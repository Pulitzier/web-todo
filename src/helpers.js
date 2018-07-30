export function getActiveTodoList(todos) {
  let activeArray;
  for (let key in todos) {
    activeArray = todos[key].find(element => element.active === true);
    if (activeArray) {
      return activeArray
    };
  };
};

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
};

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState)
  } catch(err) {
    return new Error(err.message);
  }
}