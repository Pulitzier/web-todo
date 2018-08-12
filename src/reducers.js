const defaultTodos = {
  myPersonalToDo: [
    {
      title: 'My Day',
      active: true,
      todoListId: 0,
      sortOrder: '',
      currentDate: Date.now(),
    },
    {
      title: 'Important',
      active: false,
      todoListId: 1,
      sortOrder: '',
      currentDate: 1532863416253,
    },
    {
      title: 'To-Do',
      active: false,
      todoListId: 2,
      sortOrder: '',
      currentDate: 1531572460943,
    }
  ],
  toDoCategories: []
};

const defaultAppTodosState = {
  todos: defaultTodos,
  tasks: []
};

const defaultBannerState = {
  activateBannerSettings: false,
  currentBannerImage: "./assets/retro.jpg",
  backgroundColor: "blue"
};

let todoId = 3;

export function appReducer(state = defaultAppTodosState, action) {
  const { todos, tasks } = state;
  switch(action.type) {
    case 'ADD_NEW_TODO_LIST':
      return {
        ...state,
        todos: todosReducer(todos, action)
      };
    case 'CHANGE_TODO_TITLE':
      return {
        ...state,
        todos: todosReducer(todos, action)
      };
    case 'SET_ICON_FOR_TODO':
      return {
        ...state,
        todos: todosReducer(todos, action)
      };
    case 'DELETE_TODO_LIST':
      return {
        ...state,
        todos: todosReducer(todos, action)
      };
    case "CHOOSE_LIST":
      return {
        ...state,
        todos: todosReducer(todos, action)
      };
    case 'ADD_NEW_TASK_TO_LIST':
      // let { myPersonalToDo } = todos;
      let newTasks = tasksReducer(tasks, action);
      // let lastAddedTaskId = newTasks[newTasks.length-1].id;
      //
      // const getTaskIdsFromTodo = (todo) => {
      //   return todo.tasksIds;
      // };
      //
      // let todoIds = [].concat(getTaskIdsFromTodo(myPersonalToDo[2]),[lastAddedTaskId]);
      //
      // switch(action.list.todoListId) {
      //   case myPersonalToDo[0].todoListId:
      //     let myTodosIds = [].concat(action.list.tasksIds, [lastAddedTaskId]);
      //     let newTodos = todosReducer(todos, {
      //       type: 'ADD_TASK_TO_MY_TODO',
      //       tasks: myTodosIds
      //     });
      //     newTodos = todosReducer(newTodos, {
      //       type: 'ADD_TASK_TO_TODO',
      //       tasks: todoIds
      //     });
      //     return {
      //       ...state,
      //       todos: newTodos,
      //       tasks: newTasks,
      //     };
      //   case myPersonalToDo[1].todoListId:
      //     let newImportantTodoIds = [].concat(getTaskIdsFromTodo(myPersonalToDo[1]), [lastAddedTaskId]);
      //     let newImportantTodos = todosReducer(todos, {
      //       type: 'ADD_TASK_TO_IMPORTANT',
      //       tasks: newImportantTodoIds
      //     });
      //     newImportantTodos = todosReducer(newTodos, {
      //       type: 'ADD_TASK_TO_TODO',
      //       tasks: todoIds
      //     });
      //     return {
      //       ...state,
      //       todos: newImportantTodos,
      //       tasks: newTasks
      //     };
      //   case myPersonalToDo[2].todoListId:
      //     let newTodoIds = [].concat(getTaskIdsFromTodo(myPersonalToDo[2]), [lastAddedTaskId]);
      //     return {
      //       ...state,
      //       todos: todosReducer(todos, {
      //         type: 'ADD_TASK_TO_TODO',
      //         tasks: newTodoIds
      //       }),
      //       tasks: newTasks
      //     };
      //   default:
          return {
            ...state,
            tasks: newTasks
          };
      // };
      // console.log('add new task case');
      // break;
    case 'ADD_TASK_TO_IMPORTANT':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'ADD_TASK_TO_MY_DAY':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'ADD_NOTE_TO_TASK':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    //   console.log('add to important case');
    //   return {
    //     ...state,
    //     todos: todosReducer(todos, action)
    //   };
    // case 'ADD_TASK_TO_TODO':
    //   return {
    //     ...state,
    //     todos: todosReducer(todos, action)
    //   };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'ACTIVATE_TASK_SETTINGS':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'SORT_TASKS':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'SET_REMIND_ME_DATE':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    default:
      return state;
  }
}

const todosReducer = (state = defaultTodos, action) => {
  let { myPersonalToDo, toDoCategories } = state;
  switch (action.type) {
    case 'ADD_NEW_TODO_LIST':
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
            iconSource: ''
          }
        ]
    };
    case 'CHANGE_TODO_TITLE':
      return {
        ...state,
        toDoCategories: toDoCategories.map(todo => {
          if(todo.todoListId === action.todoId) {
            return {
              ...todo,
              title: action.title
            }
          };
          return todo
        })
      };
    case 'SET_ICON_FOR_TODO':
      return {
        ...state,
        toDoCategories: toDoCategories.map(todo => {
          if(todo.todoListId === action.todoId) {
            return {
              ...todo,
              iconSource: action.iconSrc
            }
          };
          return todo;
        })
      };
    // case 'ADD_TASK_TO_IMPORTANT':
    //   let { active: importantActiveState } = myPersonalToDo[1];
    //   return {
    //     ...state,
    //     myPersonalToDo: [].concat(
    //       state.myPersonalToDo[0],
    //       [{
    //         title: 'Important',
    //         active: importantActiveState,
    //         todoListId: 1,
    //         sortOrder: '',
    //         currentDate: 1532863416253,
    //         tasksIds: action.tasks
    //       }],
    //       state.myPersonalToDo[2],
    //     )
    //   };
    // case 'ADD_TASK_TO_TODO':
    //   let { active: todoActiveState } = myPersonalToDo[2];
    //   return {
    //     ...state,
    //     myPersonalToDo: [].concat(
    //       state.myPersonalToDo[0],
    //       state.myPersonalToDo[1],
    //       [{
    //         title: 'To-Do',
    //         active: todoActiveState,
    //         todoListId: 2,
    //         sortOrder: '',
    //         currentDate: 1531572460943,
    //         tasksIds: action.tasks
    //       }]
    //     )
    //   };
    // case 'ADD_TASK_TO_MY_TODO':
    //   let {
    //     currentDate: myTodosTimestamp,
    //     active: myTodoActiveState
    //   } = myPersonalToDo[0];
    //   return {
    //     ...state,
    //     myPersonalToDo: [].concat(
    //       [{
    //         title: 'My Day',
    //         active: myTodoActiveState,
    //         todoListId: 0,
    //         sortOrder: '',
    //         currentDate: myTodosTimestamp,
    //         tasksIds: action.tasks
    //       }],
    //       state.myPersonalToDo[1],
    //       state.myPersonalToDo[2],
    //     )
    //   };
    case 'DELETE_TODO_LIST':
      return {
        ...state,
        myPersonalToDo: myPersonalToDo.map(todo => {
          if(todo.todoListId === 2) {
            return {
              ...todo,
              active: true
            }
          }
          return todo
        }),
        toDoCategories: toDoCategories.filter(todo => todo.todoListId !== action.todoId)
      };
    case "CHOOSE_LIST":
      let { todosListName, element } = action;
      for (let key in state) {
        state[key].map(element => element.active = false)
      }
      let newTodoList = state[todosListName].map(item => {
        if (item === element) {
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
    default:
      return state;
  }
};

// UUID generates random string of 36 signs long
// this is not the case to tasks
let taskUniqueId = 0;

const tasksReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NEW_TASK_TO_LIST':
      const { list: { todoListId } } = action;
      let id = taskUniqueId.toString();
      taskUniqueId++;
      return [
        ...state,
        {
          id,
          parentId: todoListId,
          done: false,
          active: false,
          myDay: todoListId === 0,
          important: todoListId === 1,
          todoIsParent: todoListId === 0 || todoListId === 1 || todoListId === 2,
          taskText: action.task,
          createdAt: Date.now(),
          note: '',
          dueDate: '',
          remindDate: '',
          repeatDate: '',
        }
      ];
    case 'ADD_TASK_TO_IMPORTANT':
      return state.map(task => {
        if (task.id === action.taskId) {
          return {
            ...task,
            important: !task.important
          }
        }
        return task;
      });
    case 'ADD_TASK_TO_MY_DAY':
      return state.map(task => {
        if (task.id === action.taskId) {
          return {
            ...task,
            myDay: action.addToMyDay
          }
        }
        return task;
      });
    case 'ADD_NOTE_TO_TASK':
      return state.map(task => {
        if(task.id === action.taskId) {
          return {
            ...task,
            note: action.note
          }
        }
        return task;
      });
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.taskId);
    case 'TOGGLE_TASK':
      return state.map(task => {
        if (action.taskId === task.id) {
          return {
            ...task,
            done: !task.done
          }
        }
        return task;
      });
    case 'ACTIVATE_TASK_SETTINGS':
      state = state.map(task => {
        return {
          ...task,
          active: false
        }
      });
      return state.map(task => {
        if (action.taskId === task.id) {
          return {
            ...task,
            active: action.activate
          }
        }
        return task;
      });
    case 'SORT_TASKS':
      const sortTasks = (sortCriteria, tasks) => {
        switch(sortCriteria){
          case 'ABC':
            return tasks = tasks.sort((a,b) => {
              let textA = a.taskText.toUpperCase();
              let textB = b.taskText.toUpperCase();
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
          case 'DUE_DATE':
            return tasks;
          case 'CREATED_AT':
            return tasks = tasks.sort((a, b) => {
              return (b.createdAt - a.createdAt)
            });
          case 'COMPLETED':
            return tasks = tasks.sort((a, b) => {
              return (a.done === b.done) ? 0 : a.done ? 1 : -1
            });
          case 'ADDED_TO_MY_DAY':
            return tasks = tasks.sort((a, b) => {
              return (a.parentId === b.parentId) ? 0 : a.parentId ? 1 : -1
            });
          default:
            return tasks;
        }
      };
      return sortTasks(action.sort, state.filter(task => task.parentId === action.listId));
    case 'SET_REMIND_ME_DATE':
      return state.map(task => {
        if(task.id === action.taskId) {
          return {
            ...task,
            remindDate: action.date
          }
        }
        return task;
      });
    default:
      return state
  }
};

const defaultSearch = {
  activateSearch: false,
  showCompleted: true
};

export function setSearchState(state = defaultSearch, action) {
  switch(action.type) {
    case 'ACTIVATE_SEARCH_PANEL':
      return {
        ...state,
        activateSearch: action.activate
      };
    case 'SET_SHOW_COMPLETED':
      return {
        ...state,
        showCompleted: action.show
      };
    default:
      return state;
  }
}
export function activateNewList(state = false, action) {
  switch(action.type) {
    case 'ACTIVATE_NEW_LIST':
      return action.activateNewList;
    default:
      return state;
  }
}
export function setNewListTitle(state = 'Untitled Task', action) {
  switch(action.type){
    case 'SET_NEW_LIST_TITLE':
      return action.title;
    default:
      return state;
  }
}
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
}
export function setTaskSettings(state = {}, action) {
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
}
const defaultUserSettings = {
  openSettings: false,
  confirmDeletion: true,
  turnOnSound: true,
  setLightTheme: true,
  setDarkTheme: false
};

export function handleUserSettings(state = defaultUserSettings, action) {
  switch(action.type) {
    case 'ACTIVATE_USER_SETTINGS':
      return {
        ...state,
        activateSettings: action.activate
      };
    case 'OPEN_USER_SETTINGS':
      return {
        ...state,
        openSettings: action.open
      };
    case 'CONFIRM_BEFORE_DELETE':
      return {
        ...state,
        confirmDeletion: action.confirmDelete
      };
    case 'TURN_SOUND':
      return {
        ...state,
        turnOnSound: action.turn
      };
    case 'SET_DARK_THEME':
      return {
        ...state,
        setDarkTheme: action.setDarkTheme,
        setLightTheme: !action.setDarkTheme
      };
    case 'SET_LIGHT_THEME':
      return {
        ...state,
        setDarkTheme: !action.setLightTheme,
        setLightTheme: action.setLightTheme
      };
    default:
      return state;
  }
}