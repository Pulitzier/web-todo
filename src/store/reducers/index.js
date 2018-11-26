import { combineReducers } from 'redux';
import { handleUserSettings, setSearchState, setTaskSettings } from './settingsReducers';
import categories from './categoriesReducer';
import tasks from './tasksReducer';
import steps from './stepsReducer';

export default combineReducers({
  app: combineReducers({
    categories,
    tasks,
    steps,
  }),
  search: setSearchState,
  taskSettings: setTaskSettings,
  userSettings: handleUserSettings,
});
