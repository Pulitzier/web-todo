export function getActiveTodoList(todos) {
  let activeArray;
  for (let key in todos) {
    activeArray = todos[key].find(element => element.active === true);
    if (activeArray) {
      return activeArray
    };
  };
};