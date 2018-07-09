export function filterArray(todos) {
  let activeArray;
  for (let key in todos) {
    activeArray = todos[key].filter(element => element.active == true)[0];
    if (activeArray) {
      return activeArray
    };
  };
};