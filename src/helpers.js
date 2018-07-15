export function getActiveTodoList(todos) {
  let activeArray;
  for (let key in todos) {
    return todos[key].filter(element => element.active == true)[0];
    // if (activeArray) {
    //   return activeArray
    // };
  };
};