const defaultTodos = {
  myPersonalToDo: [
    {
      title: 'My Day',
      active: true,
      todoListId: 0,
      currentDate: Date.now(),
      tasks: []
    },
    {
      title: 'To-Do',
      active: false,
      todoListId: 1,
      currentDate: 1531572460943,
      tasks: []
    }
  ],
  toDoCategories: []
};

const defaultBannerState = {
  activateBannerSettings: false,
  currentBannerImage: "./assets/retro.jpg",
  backgroundColor: "blue"
};

let taskId = 0;
let todoId = 2;

export function todosReducer(state = defaultTodos, action) {
  let myTodoKey = 'myPersonalToDo';
  switch (action.type) {
    case 'ADD_NEW_TODO_LIST':
      let { toDoCategories } = state;
      let customTodoId = todoId;
      todoId++;
      return {
        ...state,
        toDoCategories: [
          ...toDoCategories,
          {
            title: action.title,
            active: false,
            todoListId: customTodoId,
            tasks: []
          }
        ]
    };
    case "CHOOSE_LIST":
      let { todosListName, element } = action;
      for (let key in state) {
        state[key].map(element => element.active = false)
      };
      let newTodoList = state[todosListName].map(item => {
        if (item == element) {
          return {
            ...item,
            active: true
          }
        }
        return item
      });
      return {
        ...state,
        [todosListName]: newTodoList
      };
    case 'ADD_NEW_TASK_TO_LIST':
      let id = taskId;
      taskId++;
      let newState = {};
      let setNewTodoList = (todoList, parentId) => {
        return {
          ...todoList,
          tasks: [
            ...todoList.tasks,
            {
              id,
              parentId,
              done: false,
              task: action.task,
              createdAt: Date.now()
            }
          ]
        }
      };
      if (action.list.title === state[myTodoKey][0].title) {
        let parentTodoId = state[myTodoKey][0].todoListId;
        newState = {
          ...state,
          [myTodoKey]: [
            setNewTodoList(state[myTodoKey][0], parentTodoId),
            setNewTodoList(state[myTodoKey][1], parentTodoId)
          ]
        };
      } else {
        for (let key in state) {
          newState[key] = state[key].map(item => {
            if (item == action.list) return setNewTodoList(item, item.todoListId);
            return item;
          });
        }
      }
      return newState;
    case 'TOGGLE_TASK':
      let newToggledState = {};
      let setToggleTasks = (todoList) => {
        return {
          ...todoList,
          tasks: todoList.tasks.map(task => {
            if (task.id === action.task.id) {
              return {
                ...task,
                done: !task.done
              }
            };
            return task;
          })
        }
      };
      if (action.listId !== action.task.parentId ||
          action.listId === state[myTodoKey][0].todoListId) {
        newToggledState = {
          ...state,
          [myTodoKey]: [
            setToggleTasks(state[myTodoKey][0]),
            setToggleTasks(state[myTodoKey][1])
          ]
        }
      } else {
        for (let key in state) {
          newToggledState[key] = state[key].map(item => {
            if (item.todoListId === action.listId) setToggleTasks(item);
            return item;
          });
        }
      };
      console.log(newToggledState);
      return newToggledState;
    default:
      return state;
  }
};

export function activateSearchPanel(state = false, action) {
  switch(action.type) {
    case 'ACTIVATE_SEARCH_PANEL':
      return action.activate;
    default:
      return state;
  }
};

export function changeSearchInput(state = '', action) {
  switch(action.type) {
    case 'CHANGE_SEARCH_INPUT':
      return action.searchValue;
    default:
      return state;
  }
};

export function activateNewList(state = false, action) {
  switch(action.type) {
    case 'ACTIVATE_NEW_LIST':
      return action.activateNewList;
    default:
      return state;
  }
};

export function setNewListTitle(state = 'Untitled Task', action) {
  switch(action.type){
    case 'SET_NEW_LIST_TITLE':
      return action.title;
    default:
      return state;
  }
};

export function setBannerForTodoState(state = defaultBannerState, action) {
  switch(action.type){
    case 'ACTIVATE_BANNER_PANEL':
      return {
        ...state,
        activateBannerSettings: action.activate
      };
    case 'CHANGE_BANNER_BG_COLOR':
      return {
        ...state,
        backgroundColor: action.color
      };
    case 'CHANGE_BANNER_BG_IMAGE':
      return {
        ...state,
        currentBannerImage: action.image
      };
    default:
      return state
  }
};

export function tasksReducer(state = {}, action) {
  switch(action.type) {
    case 'ACTIVATE_NEW_TASK':
      return {
        ...state,
        activateNewTask: action.activateNewTask
      };
    case 'TYPE_NEW_TASK':
      return {
        ...state,
        typeNewTask: action.typeNewTask
      };
    default:
      return state;
  }
};