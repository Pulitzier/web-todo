import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleUserSettings, setSearchState, setTaskSettings } from './settings';
import categories from './categories';
import tasks from './tasks';
import steps from './steps';

export default combineReducers({
  app: combineReducers({
    categories,
    tasks,
    steps,
  }),
  search: setSearchState,
  taskSettings: setTaskSettings,
  userSettings: handleUserSettings,
  form: formReducer,
});
