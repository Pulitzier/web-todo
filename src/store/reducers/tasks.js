import { getLatestId } from '../../helpers';

export default function tasksReducer(state = [], action) {
  const sortTasks = (sortCriteria, tasks) => {
    switch (sortCriteria) {
      case 'ABC':
        return tasks.sort((a, b) => {
          const textA = a.taskText.toUpperCase();
          const textB = b.taskText.toUpperCase();
          if (textA < textB) return -1;
          if (textA > textB) return 1;
          return 0;
        });
      case 'DUE_DATE':
        return tasks.sort((a, b) => (b.dueDate - a.dueDate));
      case 'CREATED_AT':
        return tasks.sort((a, b) => (b.createdAt - a.createdAt));
      case 'COMPLETED':
        return tasks.sort((a, b) => {
          if (a.done === b.done) return 0;
          if (a.done) return 1;
          return -1;
        });
      case 'ADDED_TO_MY_DAY':
        return tasks.sort((a, b) => {
          if (a.parentId === b.parentId) return 0;
          if (a.parentId) return 1;
          return -1;
        });
      case 'IMPORTANT':
        return tasks.sort((a, b) => {
          if (a.important === b.important) return 0;
          if (a.important) return -1;
          return 1;
        });
      default:
        return tasks;
    }
  };
  switch (action.type) {
    case 'ADD_NEW_TASK_TO_LIST':
      return [
        ...state,
        {
          id: (getLatestId(state)+1),
          parentId: action.todoList.id,
          done: false,
          active: false,
          myDay: action.todoList.id === 0,
          important: action.todoList.id === 1,
          todoIsParent: (action.todoList.id < 3),
          suggestForMyDay: (action.todoList.id >= 3),
          taskText: action.task,
          createdAt: Date.now(),
          note: '',
          dueDate: '',
          remindDate: '',
          repeat: '',
          showOnGreeting: false,
        },
      ];
    case 'ADD_TASK_TO_IMPORTANT':
      return state.map((task) => {
        if (task.id === action.taskId) {
          return {
            ...task,
            important: !task.important,
          };
        }
        return task;
      });
    case 'ADD_TASK_TO_MY_DAY':
      return state.map((task) => {
        if (task.id === action.taskId) {
          return {
            ...task,
            myDay: action.addToMyDay,
            suggestForMyDay: false,
          };
        }
        return task;
      });
    case 'ADD_NOTE_TO_TASK':
      return state.map((task) => {
        if (task.id === action.taskId) {
          return {
            ...task,
            note: action.note,
          };
        }
        return task;
      });
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.taskId);
    case 'DELETE_TODO_LIST':
      return state.filter(task => task.parentId !== action.todoId);
    case 'TOGGLE_TASK':
      return state.map((task) => {
        if (action.taskId === task.id) {
          return {
            ...task,
            done: !task.done,
          };
        }
        return task;
      });
    case 'ACTIVATE_TASK_SETTINGS':
      return state.map((task) => {
        if (action.taskId === task.id) {
          return {
            ...task,
            active: action.activate,
          };
        }
        return {
          ...task,
          active: false,
        };
      });
    case 'SORT_TASKS':
      return sortTasks(action.sort, state.filter(task => task.parentId === action.listId));
    case 'REVERT_TASKS':
      return state.reverse();
    case 'SET_REMIND_ME_DATE':
      return state.map((task) => {
        if (task.id === action.taskId) {
          return {
            ...task,
            remindDate: action.date,
          };
        }
        return task;
      });
    case 'SET_DUE_DATE':
      return state.map((task) => {
        if (task.id === action.taskId) {
          return {
            ...task,
            dueDate: action.date,
            showOnGreeting: true,
          };
        }
        return task;
      });
    case 'SET_REPEAT':
      return state.map((task) => {
        if (task.id === action.taskId) {
          return {
            ...task,
            repeat: action.repeatType,
          };
        }
        return task;
      });
    case 'DO_NOT_SUGGEST_TASK':
      return state.map((task) => {
        if (task.id === action.taskId) {
          return {
            ...task,
            suggestForMyDay: action.suggestion,
          };
        }
        return task;
      });
    default:
      return state;
  }
}
