export const DEFAULT_TODOS = [
  {
    title: 'My Day',
    category: 'mytodo',
    active: true,
    todoListId: 0,
    sortOrder: '',
    currentDate: Date.now(),
    bgImage: "./assets/retro.jpg",
    bgColor: 'blue'
  },
  {
    title: 'Important',
    category: 'important',
    active: false,
    todoListId: 1,
    sortOrder: '',
    currentDate: 1532863416253,
    bgImage: "./assets/retro.jpg",
    bgColor: 'blue'
  },
  {
    title: 'Tasks',
    category: 'todo',
    active: false,
    todoListId: 2,
    sortOrder: '',
    currentDate: 1531572460943,
    bgImage: "./assets/retro.jpg",
    bgColor: 'blue'
  }
];

export const DEFAULT_SEARCH = {
  activateSearch: false,
  showCompleted: true
};

export const DEFAULT_TASK_SETTINGS = {
  showCompleted: true,
  showGreetingPopup: false,
  greetingTimestamp: ''
};

export const DEFAULT_USER_SETTINGS = {
  collapseApp: false,
  openSettings: false,
  confirmDeletion: true,
  turnOnSound: true,
  setLightTheme: true,
  setDarkTheme: false
};

export const EXPANDED_APP_STYLES = {
  opacity: 1,
  top: 0,
  transition: 'all 0.5s ease'
};

export const COLLAPSED_APP_STYLES = {
  opacity: 0,
  width: 250,
  height: 30,
  margin: 0,
  top: 2000,
  transition: 'all 0.5s ease'
};

export const IMAGE_SCHEME = [
  "./assets/retro.jpg",
  "./assets/museum.jpg",
  "./assets/wi.jpg"
];

export const COLOR_SCHEME = [
  "orange",
  "green",
  "red",
  "blue",
  "blueviolet"
];

export const BANNER_COLOR_SCHEME = {
  "orange": "249, 148, 7",
  "green": "0, 158, 34",
  "red": "255, 0, 0",
  "blue": "0, 0, 255",
  "blueviolet": "204, 7, 249"
};