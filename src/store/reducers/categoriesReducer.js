import { DEFAULT_TODOS } from '../constants/index';

let todoId = 3;
export default function categoriesReducer(state = DEFAULT_TODOS, action) {
  let newTodos = [];
  switch (action.type) {
    case 'ADD_NEW_TODO_LIST':
      return [ // eslint-disable-line no-return-assign
        ...state,
        ...[{
          title: action.title,
          category: 'custom',
          active: false,
          todoListId: todoId += 1,
          sortOrder: '',
          iconSource: 'fa-list',
          bgImage: './assets/retro.jpg',
          bgColor: 'blue',
        }],
      ];
    case 'CHANGE_TODO_TITLE':
      return state.map((todo) => {
        if (todo.todoListId === action.todoId) {
          return {
            ...todo,
            title: action.title,
          };
        }
        return todo;
      });
    case 'SET_ICON_FOR_TODO':
      return state.map((todo) => {
        if (todo.todoListId === action.todoId) {
          return {
            ...todo,
            iconSource: action.iconSrc,
          };
        }
        return todo;
      });
    case 'DELETE_TODO_LIST':
      newTodos = state.map((todo) => {
        if (todo.todoListId === 2) {
          return {
            ...todo,
            active: true,
          };
        }
        return todo;
      });
      return newTodos.filter(todo => todo.todoListId !== action.todoId);
    case 'CHOOSE_LIST':
      return state.map((item) => {
        if (item.todoListId === action.todoId) {
          return {
            ...item,
            active: true,
          };
        }
        return {
          ...item,
          active: false,
        };
      });
    case 'CHANGE_BANNER_BG_COLOR':
      return state.map((todo) => {
        if (todo.todoListId === action.todoId) {
          return {
            ...todo,
            bgColor: action.color,
          };
        }
        return todo;
      });
    case 'CHANGE_BANNER_BG_IMAGE':
      return state.map((todo) => {
        if (todo.todoListId === action.todoId) {
          return {
            ...todo,
            bgImage: action.image,
          };
        }
        return todo;
      });
    case 'SORT_TASKS':
      return state.map((todo) => {
        if (todo.todoListId === action.listId) {
          return {
            ...todo,
            sortOrder: action.sort,
          };
        }
        return todo;
      });
    default:
      return state;
  }
}
