import { combineReducers } from 'redux';
import {
  DEFAULT_TODOS,
  DEFAULT_SEARCH,
  DEFAULT_TASK_SETTINGS,
  DEFAULT_USER_SETTINGS
} from "./constants";

export const appReducer = combineReducers({
  todos: todosReducer,
  tasks: tasksReducer,
  steps: stepsReducer
});

let todoId = 3;
function todosReducer(state = DEFAULT_TODOS, action) {
  let newTodos = [];
  switch (action.type) {
    case 'ADD_NEW_TODO_LIST':
      return [
        ...state,
        ...[{
          title: action.title,
          category: 'custom',
          active: false,
          todoListId: todoId++,
          sortOrder: '',
          iconSource: "fa-list",
          bgImage: "./assets/retro.jpg",
          bgColor: 'blue'
        }]
      ];
    case 'CHANGE_TODO_TITLE':
      return state.map(todo => {
        if(todo.todoListId === action.todoId) {
          return {
            ...todo,
            title: action.title
          }
        }
        return todo;
      });
    case 'SET_ICON_FOR_TODO':
      return state.map(todo => {
          if(todo.todoListId === action.todoId) {
            return {
              ...todo,
              iconSource: action.iconSrc
            }
          };
          return todo;
      });
    case 'DELETE_TODO_LIST':
      newTodos = state.map(todo => {
        if(todo.todoListId === 2) {
          return {
            ...todo,
            active: true
          }
        }
        return todo
      });
      return newTodos.filter(todo => todo.todoListId !== action.todoId);
    case "CHOOSE_LIST":
      return state.map(item => {
        if (item.todoListId === action.todoId) {
          return {
            ...item,
            active: true
          }
        }
        return {
          ...item,
          active: false
        }
      });
    case 'CHANGE_BANNER_BG_COLOR':
      return state.map(todo => {
        if(todo.todoListId === action.todoId){
          return {
            ...todo,
            bgColor: action.color
          }
        }
        return todo;
      });
    case 'CHANGE_BANNER_BG_IMAGE':
      return state.map(todo => {
        if(todo.todoListId === action.todoId){
          return {
            ...todo,
            bgImage: action.image
          }
        }
        return todo;
      });
    case 'SORT_TASKS':
      return state.map(todo => {
        if(todo.todoListId === action.listId){
          return {
            ...todo,
            sortOrder: action.sort
          }
        }
        return todo;
      });
    default:
      return state;
  }
};

// UUID generates random string of 36 signs long
// this is not the case to tasks
let taskUniqueId = 0;
function tasksReducer(state = [], action) {
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
          showOnGreeting: false
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
            });
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
          if (action.date === '') {
            return {
              ...task,
              dueDate: action.date,
              showOnGreeting: false
            }
          } else if(task.todoIsParent) {
            return {
              ...task,
              dueDate: action.date,
              showOnGreeting: true
            }
          }
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
function stepsReducer( state = [], action) {
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

export function setSearchState(state = DEFAULT_SEARCH, action) {
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

export function setTaskSettings(state = DEFAULT_TASK_SETTINGS, action) {
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
    case 'SHOW_COMPLETED_FROM_BANNER':
      return {
        ...state,
        showCompleted: action.show
      };
    case 'SHOULD_SHOW_GREETINGS':
      return {
        ...state,
        showGreetingPopup: action.showGreeting
      };
    default:
      return state;
  }
}

export function handleUserSettings(state = DEFAULT_USER_SETTINGS, action) {
  switch(action.type) {
    case 'SET_COLLAPSE_APP':
      return {
        ...state,
        collapseApp: action.collapse
      };
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