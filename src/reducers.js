const defaultTodos = {
  myPersonalToDo: [
    {
      title: 'My Day',
      active: true,
      tasks: []
    },
    {
      title: 'To-Do',
      active: false,
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

export function taskListsReducer(state = defaultTodos, action) {
  switch (action.type) {
    case 'ADD_NEW_TODO_LIST':
      let { toDoCategories } = state;
      return {
        ...state,
        toDoCategories: [
          ...toDoCategories,
          {
            title: action.title,
            active: false,
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
      let newState = {};
      for (let key in state) {
        newState[key] = state[key].map(item => {
          if (item == action.list) {
            return {
              ...item,
              tasks: [
                ...item.tasks,
                action.task
              ]
            }
          };
          return item;
        });
      };
      let newTasksArr = [
        ...newState.myPersonalToDo[0].tasks,
        ...newState.myPersonalToDo[1].tasks
      ];
      console.log(newTasksArr);
      newState.myPersonalToDo = newState.myPersonalToDo.map(item => {
        return {
          ...item,
          tasks: newTasksArr
        }
      });
      console.log(newState);
      return newState;
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

export function activateNewTask(state = false, action) {
  switch(action.type) {
    case 'ACTIVATE_NEW_TASK':
      return action.activateNewTask;
    default:
      return state;
  }
};

export function typeNewTask(state = false, action) {
  switch(action.type) {
    case 'TYPE_NEW_TASK':
      return action.typeNewTask;
    default:
      return state;
  }
};