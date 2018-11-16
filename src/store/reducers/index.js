import { combineReducers } from 'redux';
import { handleUserSettings, setSearchState, setTaskSettings } from './settingsReducers';
import categoriesReducer from './categoriesReducer';
import tasksReducer from './tasksReducer';
import stepsReducer from './stepsReducer';

export default combineReducers({
  app: combineReducers({
    categories: categoriesReducer,
    tasks: tasksReducer,
    steps: stepsReducer,
  }),
  search: setSearchState,
  taskSettings: setTaskSettings,
  userSettings: handleUserSettings,
});