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
  tasks: [],
  steps: []
};

let todoId = 3;

export function appReducer(state = defaultAppTodosState, action) {
  const { todos, tasks, steps } = state;
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
        todos: todosReducer(todos, action),
        tasks: tasksReducer(tasks, action)
      };
    case "CHOOSE_LIST":
      return {
        ...state,
        todos: todosReducer(todos, action)
      };
    case 'ADD_NEW_TASK_TO_LIST':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
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
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: tasksReducer(tasks, action),
        steps: stepsReducer(steps, action)
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
    case 'REVERT_TASKS':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'SET_REMIND_ME_DATE':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'SET_DUE_DATE':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'SET_REPEAT':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'DO_NOT_SUGGEST_TASK':
      return {
        ...state,
        tasks: tasksReducer(tasks, action)
      };
    case 'ADD_STEP_TO_TASK':
      return {
        ...state,
        steps: stepsReducer(steps, action)
      };
    case 'TOGGLE_STEP':
      return {
        ...state,
        steps: stepsReducer(steps, action)
      };
    case 'DELETE_STEP':
      return {
        ...state,
        steps: stepsReducer(steps, action)
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
          todoIsParent: (todoListId < 3),
          suggestForMyDay: (todoListId >= 3),
          taskText: action.task,
          createdAt: Date.now(),
          note: '',
          dueDate: '',
          remindDate: '',
          repeat: '',
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
            myDay: action.addToMyDay,
            suggestForMyDay: false,
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
    case 'DELETE_TODO_LIST':
      return state.filter(task => task.parentId !== action.todoId);
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
      return state.map(task => {
        if (action.taskId === task.id) {
          return {
            ...task,
            active: action.activate
          }
        }
        return {
          ...task,
          active: false
        };
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
            return tasks = tasks.sort((a, b) => {
              return (b.dueDate - a.dueDate)
            });;
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
          case 'IMPORTANT':
            return tasks = tasks.sort((a, b) => {
              return (a.important === b.important) ? 0 : a.important ? -1 : 1
            });
          default:
            return tasks;
        }
      };
      return sortTasks(action.sort, state.filter(task => task.parentId === action.listId));
    case 'REVERT_TASKS':
      return state = state.reverse();
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
    case 'SET_DUE_DATE':
      return state.map(task => {
        if(task.id === action.taskId) {
          return {
            ...task,
            dueDate: action.date
          }
        }
        return task;
      });
    case 'SET_REPEAT':
      return state.map(task => {
        if(task.id === action.taskId) {
          return {
            ...task,
            repeat: action.repeatType
          }
        }
        return task;
      });
    case 'DO_NOT_SUGGEST_TASK':
      return state.map(task => {
        if(task.id === action.taskId) {
          return {
            ...task,
            suggestForMyDay: action.suggestion
          }
        }
        return task;
      });
    default:
      return state
  }
};

let stepUniqueId = 0;
const stepsReducer = ( state = [], action) => {
  switch(action.type) {
    case 'ADD_STEP_TO_TASK':
      const { taskId, stepText } = action;
      const stepId = stepUniqueId;
      stepUniqueId++;
      return [
        ...state,
        {
          stepId,
          taskId,
          done: false,
          stepText
        }
      ];
    case 'TOGGLE_STEP':
      return state.map(step => {
        if(step.stepId === action.stepId) {
          return {
            ...step,
            done: !step.done
          }
        }
        return step;
      });
    case 'DELETE_STEP':
      return state.filter(step => step.stepId !== action.stepId);
    case 'DELETE_TASK':
      return state.filter(step => step.taskId !== action.taskId);
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

const defaultBannerState = {
  activateBannerSettings: false,
  currentBannerImage: "./assets/retro.jpg",
  backgroundColor: "blue",
  showCompleted: true
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
    case 'SHOW_COMPLETED_FROM_BANNER':
      return {
        ...state,
        showCompleted: action.show
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