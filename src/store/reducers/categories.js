import { DEFAULT_TODOS } from '../constants/index';
import { getLatestId } from '../../helpers';

let newTodos = [];

export default function categoriesReducer(state = DEFAULT_TODOS, action) {
  switch (action.type) {
    case 'ADD_NEW_TODO_LIST':
      return [ // eslint-disable-line no-return-assign
        ...state,
        ...[{
          id: (getLatestId(state)+1),
          title: action.title,
          category: 'custom',
          active: false,
          sortOrder: '',
          iconSource: 'fa-list',
          bgImage: './assets/retro.jpg',
          bgColor: 'blue',
        }],
      ];
    case 'CHANGE_TODO_TITLE':
      return state.map((todo) => {
        if (todo.id === action.todoId) {
          return {
            ...todo,
            title: action.title,
          };
        }
        return todo;
      });
    case 'SET_ICON_FOR_TODO':
      return state.map((todo) => {
        if (todo.id === action.todoId) {
          return {
            ...todo,
            iconSource: action.iconSrc,
          };
        }
        return todo;
      });
    case 'DELETE_CATEGORY':
      newTodos = state.map((todo) => {
        if (todo.id === 2) {
          return {
            ...todo,
            active: true,
          };
        }
        return todo;
      });
      return newTodos.filter(todo => todo.id !== action.todoId);
    case 'CHOOSE_LIST':
      return state.map((item) => {
        if (item.id === action.todoId) {
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
        if (todo.id === action.todoId) {
          return {
            ...todo,
            bgColor: action.color,
          };
        }
        return todo;
      });
    case 'CHANGE_BANNER_BG_IMAGE':
      return state.map((todo) => {
        if (todo.id === action.todoId) {
          return {
            ...todo,
            bgImage: action.image,
          };
        }
        return todo;
      });
    case 'SORT_TASKS':
      return state.map((todo) => {
        if (todo.id === action.listId) {
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
